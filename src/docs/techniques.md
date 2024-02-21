---
lang: en-US
title: Techniques behind j2cc
description: What j2cc does to protect your code.
---

J2cc employs a wide range of tactics to keep your code secure. While the main selling point is its transpilation features, other features also contribute.

## General obfuscation
J2cc has several transformers that are also commonly found in other code obfuscation tools, along with some unique to j2cc. 
This pretty much eliminates the need to use any other tool in combination with j2cc, since all the protection features are already there.

### Commonly found in other obfuscators
#### Flow obfuscation
J2cc can protect the control flow of individual methods by either scrambling individual basic blocks, or flattening the control flow entirely.

"Shuffling" basic blocks means reordering the bytecode in a method in a way that preserves the actual execution order,
but shifts around the order in which the instructions are declared. This means that a simple `push 1, push 2, add` may be 
reordered into `(1) go to 5, (2) push 2, (3) add, (4) go to 7, (5) push 1, (6) go to 2, (7) ...`. This makes it significantly harder for static analysis to take place,
without an algorithm to reorder the blocks to a sensible configuration first.

"Flattening" refers to the technique of removing all nested jumps in a method. This means that the resulting control flow is mostly just one level deep, being "flat".
This is being done by replacing all jumps to labels with a jump to a central "dispatcher" block, which jumps to a given label based on some condition.
This condition is being fulfilled by the block who jumped, resulting in the actual code still being the same.
Imagine the following pseudocode:
```
push 3
if == 3 goto lb
return false
lb:
return true
```
It may be transformed into:
```
push 3
if == 3:
	push 1
	goto dispatch
return false
lb:
return true

dispatch:
switch {
	case 1: goto lb
}
```

The jump in this case has been transformed into a jump to a central dispatcher block, as mentioned previously. With a more complex method, the dispatcher block will gain many more possible branch targets, making simple looks at the method impossible.

#### Simple Reference Obfuscation
J2cc can obfuscate outgoing calls from a method to other methods by replacing the call with a generalized method handle call. This makes it significantly harder to gain insight on which methods a program executes.

A simple method like this:
```java
public static void main(String[] args) {
	System.out.println("Hello world");
}
```

May be transformed into a method handle call like this:

```java
import java.lang.invoke.MethodHandle;

private static final MethodHandle[] handles = new MethodHandle[] {
		// Initialize method handles for outgoing calls. A lot of code for a simple example.
};

public static void main(String[] args) {
	Object[] arguments = new Object[2];
	arguments[0] = System.out;
	arguments[1] = "Hello world";
	handles[0].invoke(arguments);
}
```

Combined with other obfuscation techniques like constant obfuscation, this makes estimating outgoing calls significantly harder.

#### Unused Member Removal
J2cc can minimize your program's distribution size by removing all unused classes from it.

A class is considered "unused" if there is no direct way from a used class to it. This does NOT include reflective access.
If you have certain classes that are used with reflection, you can manually mark them as used.

Example:
```java
class Base { /* ... */ } // Base is used, because:
class Child extends Base { /* ... */ } // Direct path: Child class reaches Base. Child is used, because:

public static void main(String[] args) {
	Child c = new Child(); // Direct path: Main class reaches Child
}
```

Removing the `new Child()` declaration and the associated local variable would result in Child being marked as unused. Since there is currently no other direct way to Base, it is also marked unused.

Caution: Using `Class.forName("Child").getConstructor().newInstance()` would still create a new Child instance, but this is not considered a "direct" way. Since reflective references can be dynamic, there is no way for j2cc to accurately figure out links across reflection usage.
You can specify Child being used manually, and this will cause Base to be included as well.

#### String Literal Obfuscation
String literals can also be obfuscated by j2cc, removing possible context that could help reverse engineers determine what a code snippet might do.

Currently, the only technique for string obfuscation employed by j2cc is with XORing individual characters with a key value, determined by one of two algorithms:
1. Static key: The key is a sequence of 16-bit integers generated at compile time, different for each character in the string; or
2. Index based: The key is derived from the index of the character in the string.

XOR is an extremely efficient operation that also manages to easily scramble data into seemingly random bytes. This is why it was chosen for j2cc.

More string obfuscation techniques may be added in the future.


### J2cc Specific Features
#### Verifier Disabler at Runtime
J2cc can inject code that forces the bytecode verifier to be disabled at runtime before the main entrypoint of your application is executed. 
This allows for more advanced obfuscation after j2cc to take place, which can now safely violate the verifier.

#### Method Inlining
J2cc can inline small methods into the bytecode sequences where they are invoked. This means that actual references to the method vanish, which allows the JIT compiler or C++ compiler to do additional optimizations on the code segment.
This has been measured to provide a sizeable performance improvement.

A method `A` may be inlined into its usage in class `B` when:
1. `A` is not a constructor
2. `A` does not exceed the maximum bytecode size configured (Can be bypassed with `@AlwaysInline`)
3. `A` cannot be inherited (is static or final) (Can be bypassed with `@AlwaysInline`)
4. `A` is not recursive (cannot return to itself in the method graph extending from `A`)
5. `A` does not reference any classes, fields or methods not visible to `B`

If all of those conditions are met, the bytecode is extracted from `A` and inlined into `B`'s caller method.
If all usages of `A` were able to be inlined, and `A` has `@AlwaysInline(removeOriginal=true)`, `A` may be deleted.

```java
static void sayHi(String s) {
	System.out.printf("Hi, %s!%n", s);
}

void caller() {
	sayHi("Karl");
}

// caller() may turn into:
void caller() {
	String arg0 = "Karl";
	System.out.printf("Hi, %s!%n", arg0);
}

// Invalid candidate examples:
// 1. Recursive calls: Method graph from recursivePart1 goes to recursivePart2, which goes back to recursivePart1
void recursivePart1() {
	recursivePart2();
}

void recursivePart2() {
	recursivePart1();
}

// 2. Could be inherited
void notFinalNorStatic() {
	System.out.println("I'm not going to be inlined!");
}
```

#### Reference Obfuscation via Native BSM
As a more extreme version of [Simple Reference Obfuscation](#simple-reference-obfuscation), references may also be obfuscated
with an invokedynamic instruction leading to a BSM, which is compiled to native code.

This makes it completely opaque which reference leads to where.

An example of this in action was demonstrated on the homepage, in the example section.

#### Optimizing
Certain optimizations may be done to the java bytecode to shrink code size, and in some cases, even optimize run time.

These optimizations are often not noticeable, and only serve as a way to keep the generated code's size in check.
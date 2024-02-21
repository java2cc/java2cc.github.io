---
lang: en-US
title: Annotation API
description: The annotations API, controlling how j2cc will transform bytecode.
---
The annotation API included in your software download contains annotations, which control certain aspects of j2cc.

Currently, these annotations are included:

## `@Nativeify()`
Can be placed on classes, or on methods (not constructors).

The `Nativeify` annotation controls which members j2cc will transpile.
When placed on a class, all methods (excluding constructors) are transpiled.
When placed on a method, only that method is transpiled.

## `@AlwaysInline(boolean removeOriginal = false)`
Can be placed on methods.

`AlwaysInline` controls the inliner for the annotated method. More specifically, methods annotated with `@AlwaysInline` will skip the code size check and any inheritance checks, and always be inlined (if it doesn't cause invalid code to be generated).

The `removeOriginal` field, if set, will cause j2cc to **remove** the original method definition if all usages were successfully inlined. It's therefore not recommended to use methods like this via reflection, since the method may not exist at runtime.

Special caution is to be used when using `AlwaysInline`. Especially with nonstatic and nonfinal methods, if the method is overridden anywhere, invoking the base method and using polymprhism may generate unexpected results, due to the code of the base implementation replacing the method call. Take this for example:
```java
import j2cc.AlwaysInline;

class Base {
	@AlwaysInline // DO NOT DO THIS!
	public void sayHi() {
		System.out.println("Hi");
	}
}

class Hello extends Base {
	@Override
	public void sayHi() {
		System.out.println("Hello");
	}
}

void main() {
	Base base = new Hello();
	// This generates a call instruction to Base.sayHi().
	// The inliner cannot be smart enough to figure out that the actual value of base is a Hello instance,
	//   and will resolve the method to be on Base.
	// Since the method is annotated with @AlwaysInline, the inliner will assume it can inline the method safely.
	base.sayHi();
	// THIS MEANS: THE FOLLOWING CODE IS GENERATED INSTEAD OF THE ABOVE CODE:
	System.out.println("Hi"); // INCORRECT!
}
```
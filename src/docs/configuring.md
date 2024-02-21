---
lang: en-US
title: Configuring
description: Configuring j2cc for transpiling.
---

Configuring j2cc is done via a TOML file. The schema is provided in the `j2cc-json-schema.json` file.

To create a new configuration file, simply make a new TOML file and call it anything you want (example: `config.toml`).
You should be able to select the schema for the specified file in both IntelliJ IDEs and VSCode. The schema provides configuration key autocompletion and type information, to make writing configs as easy as possible.

After that, your IDE will provide auto completions and descriptions for the configuration properties. Some core configuration properties are described here as well:

### inputFile
The input file or directory to the obfuscator. Can either be a directory, or any kind of jar or zip.

### outputFile
Output file (automatically assumed to be a jar if it has a file extension), or a directory.

### libraries
An array of paths to library jarfiles referenced by the input file. Used to construct the hierarchy tree.
Not ALL libraries have to be present. Libraries whose classes are extended in the input file should be present, and the obfuscator will throw an error if classes are not found.

### libraryMatchers
An array of path matchers in the form of:
```toml
basePath = "path/to/base"
pattern = "all_libraries_that_should_*_match.jar"
```
`basePath` is a path to a directory, in which library files should recursively be searched.
Any file matching the `pattern` glob pattern will be included as library.
This makes including an entire folder, for example, easier.

### paths.zigHome
The parent directory of the zig compiler's executable (`zig`, `zig.exe` or otherwise for your platform) downloaded earlier.
Default path is `zig-compiler`.

### paths.utilPath
Path to the `util` directory provided in the software download. This contains native utils for j2cc's runtime.

### targets
List of zig target triplets (eg `x86_64-linux-gnu`) to compile the native executable to. The platform the transpiler is currently running on is automatically included.

### zigArgs
A list of custom arguments to pass into the zig compiler for each compile step.

### debugSettings
Settings to debug the running program when executed. It is not recommended to distribute the resulting obfuscated jar! It contains debugging information that might allow an attacker to gain more information.

### obfuscationSettings
Settings for obfuscating the jar, along with transpiling it. All available settings can be found in the schema and will be autocompleted by your IDE.


## Preparing the program
To successfully obfuscate a program, it needs to contain annotations to control which methods are transpiled and inlined. To do that, use the [annotations api](/docs/annotations) included in your j2cc download.

Use the `@Nativeify` annotation on any method you want to transpile, or any class to transpile all methods within that class.
For example:

```java
import j2cc.Nativeify;

class Demo {
	// Will be transpiled
	@Nativeify
	void doTranspile() {
	}

	// Will not be transpiled, but obfuscated!
	void doNotTranspile() {
	}
}

@Nativeify
class Demo2 {
	// Will be transpiled
    void doTranspile() {
        Runnable r = () -> { /* in classes with @Nativeify, lambda bodies are also transpiled! */ };
    }
	
	// Will be transpiled
	void alsoDoTranspile() {}
}
```

Please note, constructors cannot be transpiled due to JNI limits. If you have sensitive code in your constructor, move the sensitive code to another method and call it in the constructor.
Then annotate that new method with `@Nativeify`.

To control which methods are inlined, you can use the `@AlwaysInline` annotation.

Normally, only methods that are smaller as the configured limit are considered when inlining happens. However, to bypass this limit, you can annotate a method to be inlined with `@AlwaysInline`.

```java
import j2cc.AlwaysInline;

// Assuming a max inline size of 0, to demonstrate how selection happens.
class Demo {
	// Code size is too big to be inlined, is skipped
    static void willNotBeInlined() { System.out.println("hello"); }	
	
    // While the code size is still too big, the limit is ignored for this method.
    // Note that inlining may still be skipped if the resulting inlined code would result in illegal field, method or class access
    @AlwaysInline
    static void willBeInlined() { System.out.println("world"); }
    
    void inlineTarget() {
        willNotBeInlined();
        willBeInlined();
    }
}
```

## Configuration example
A simple example configuration might look like this:
```toml
logLevel = "DEBUG"  # Log everything
inputFile = "input.jar"
outputFile = "output.jar"
targets = [
	"x86_64-windows-gnu"  # Compile the natives for x86_64 windows
]
parallelJobs = 4

[obfuscate.flow]
enable = true
strategy = "flatten"  # enable flow flattening

[obfuscate.rename]
enable = true  # enable renaming of members
mergePackages = true

[[obfuscate.rename.filterSets]]
filterType = "exclude"
classPatterns = [
    "**"  # 1. exclude everything
]

[[obfuscate.rename.filterSets]]
filterType = "include"
classPatterns = [
    "me.x150.j2cc.**"  # 2. include everything in the me.x150.j2cc package
]

[paths]
utilPath = "util"  # util directory can be found in "util"
zigHome = "zig-compiler"  # zig compiler can be found in "zig-home"
```
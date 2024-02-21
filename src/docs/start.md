---
lang: en-US
title: Getting Started
description: Help about j2cc, how to configure.
---

First of all, before using j2cc, you need to download the prerequisites. 
The only thing you'll need to download (apart from the obfuscator itself) is a release of [the Zig Compiler](https://ziglang.org/) for your system.
This is needed because the transpiler compiles java bytecode to C++ source code. The zig compiler is a good cross-platform drop in C++ compiler.

You can start using j2cc in various different ways:

## Running via command line
You can run j2cc simply over the command line, by invoking the `j2cc-core.jar` file in the software download with `java -jar j2cc-core.jar`.
If you do not specify any more information to j2cc, it will list all available commands. Currently, the following commands are available:

### `obfuscate [configuration.toml]`
Starts the obfuscator, configured with the specified configuration. See [configuring](/docs/configuring) for more information about how to configure j2cc.

### `remap [input.jar] [mappings] [output.jar]`
Remaps the given input jar using the mappings specified in argument 2, and writes the output to the output jar. This renames all references to methods found in the mappings, and remaps all declarations as well.

This is useful if you enabled the renamer pass on a core library, and want to update references to functions and classes of that library in other jars.

See [configuring](/docs/configuring) for information on how to obtain mappings after renaming.

### `activate [license key]`
Activates j2cc with the given license key, writes license information to `$J2CC_HOME/j2ccLicense.bin` if the environment variable `J2CC_HOME` is set, or to the same file in the parent path of the `j2cc-core.jar` file.

Once you have activated j2cc, it will check the license with the same algorithm as described above for everything that requires an activation.

If j2cc cannot find the license information file, you may be required to reactivate j2cc. The same license key will still work, don't worry.

If you've purchased a `Personal (Multiple Developers)` or `Enterprise` license, it may be useful to provide this file on a network share and set the `J2CC_HOME` variable to point to it.
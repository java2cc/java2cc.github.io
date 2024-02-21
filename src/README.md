---
home: true
icon: home
title: Home
heroImage: /logo_512.png
heroText: J2CC
tagline: Protecting code through transpilation
description: Protect your Java / Kotlin / JVM applications with j2cc, to ensure code safety and IP protection, and much more.
actions:
  - text: Get Started
    link: /docs/pricing
    type: primary

  - text: Documentation
    link: /docs/start

features:
  - title: Secure
    icon: lock
    details: Ensure your code stays in your hands with advanced obfuscation techniques.

  - title: Tested
    icon: vials
    details: J2cc has been tested and confirmed to work on a wide range of samples, including itself.

  - title: Extraordinary Support
    icon: envelope
    details: Support is qualified in the field and fast to respond, even for non-enterprise tiers.
  
  - title: Supports multiple languages
    icon: language
    details: All languages compiling to Java Bytecode (running on the JVM) are supported.


  - title: Native Obfuscation
    icon: code-branch
    details: Transform your Java code into C++, completely replacing the original, and making decompiling much harder.

  - title: Reference Obfuscation
    icon: compass
    details: Hide which methods your program uses, to ensure no one knows what the program will do.

  - title: Member Renaming
    icon: arrow-down-a-z
    details: Rename and minify the names of members in your program, removing useful information for reverse engineers.

  - title: Inlining
    icon: code-merge
    details: Inline small methods into their usages, improving performance.

copyright: © 2024 0x150. All rights reserved.
footer: <a href="https://discord.gg/snsvGCa8zJ" target="_blank">Contact via Discord</a>, <a href="mailto:constantin.chris10@gmail.com">Contact via E-Mail</a>
---

#

# What is j2cc?
j2cc is an obfuscator for programs running on the JVM. This includes:

- [Java](https://www.java.com/) programs
- [Kotlin](https://kotlinlang.org/) programs
- [Scala](https://www.scala-lang.org/) programs
- [Clojure](https://clojure.org/) programs

and many more programming languages.

j2cc protects against reverse engineering, IP theft, runtime modifications (e.g. cheating), and much more.

It does this by using a variety of advanced obfuscation techniques, e.g. **renaming members** in your program to minified names, **removing debugging information**, and most importantly,
transpiling important parts of your program to **native code**.

Applying just some of the supported techniques will make your program *significantly harder* to reverse engineer, modify or tamper with,
ensuring your program and IP will **stay secure**.

# Use Cases
J2cc can help secure your IP and protect your program from hackers in all kinds of scenarios. 
Whether you just want to protect code from being reverse engineered (e.g. in a license check),
you want to protect an algorithm from being analyzed, or want to prevent cheating through program modification, j2cc can help.

# Usage
Using j2cc is as simple as it gets. You can either

- integrate j2cc into your build process, using the maven plugin; or
- use j2cc on the command line, using a TOML configuration; or
- call upon the j2cc API to integrate j2cc into a different use case.

More help on this topic can be found in the documentation.

# Highlights
### Exact specification compatibility
j2cc fully adheres to the JVM specification. This means that all valid hypothetical bytecode arrangements are supported, and work exactly like
they would work when ran with Java. Chances are, you can just use j2cc out of the box, without much work fixing bugs.

If your program runs without special JVM verifier hacks, j2cc will be able to handle it.

### Obfuscation compatibility
Since all valid bytecode programs are compatible with j2cc, you can use j2cc in combination with another obfuscator.
Start the obfuscation process with any other obfuscator, and finish it with j2cc to gain native protection on top of standard Java protection.

### j2cc has been tested and confirmed to work on itself
A large part of j2cc has been tested when transpiled by itself, and is currently shipped to lower tiers in this state.
J2cc uses a lot of advanced Java features, making it hard to traditionally obfuscate the program. However, j2cc itself can handle it just fine.
We're putting all of our trust in our program, which demonstrates that you can do the same.


# Features
| Feature Name                           | Traditional Obfuscators | J2cc Community               | J2cc Personal      | J2cc Enterprise    |
|----------------------------------------|-------------------------|------------------------------|--------------------|--------------------|
| Jar Input / Output                     | :white_check_mark:      | :white_check_mark:           | :white_check_mark: | :white_check_mark: |
| Directory Input / Output               | :x:                     | :x:                          | :white_check_mark: | :white_check_mark: |
| Parallel Processing                    | :x:                     | :x:                          | :white_check_mark: | :white_check_mark: |
| Compilation to native code             | :x:                     | :white_check_mark: (limited) | :white_check_mark: | :white_check_mark: |
| Custom Compilation Targets             | N/A                     | One Target                   | Unlimited Targets  | Unlimited Targets  |
| Addon Support                          | :x:                     | :x:                          | :white_check_mark: | :white_check_mark: |
| Advanced Bytecode Optimizations        | :x:                     | :x:                          | :x:                | :white_check_mark: |
| Reference Obfuscation                  | :white_check_mark:      | :white_check_mark:           | :white_check_mark: | :white_check_mark: |
| Method Inlining                        | :x:                     | :x:                          | :x:                | :white_check_mark: |
| Unused Class Removal                   | :white_check_mark:      | :x:                          | :white_check_mark: | :white_check_mark: |
| Verifier Disabling at Runtime          | :x:                     | :x:                          | :white_check_mark: | :white_check_mark: |
| Member Renaming                        | :white_check_mark:      | :x:                          | :white_check_mark: | :white_check_mark: |
| Maven Integration                      | :x:                     | :x:                          | :x:                | :white_check_mark: |
| Skidfuscator Integration (Coming Soon) | :x:                     | :x:                          | :white_check_mark: | :white_check_mark: |

# Example
### Source Code

```java
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

class J2ccSample {
	public static void tryLogIn() {
		// basic method calls
		System.out.println("Hello World!");
		System.out.println("Please enter password: ");
		String userInput = System.console().readLine();

		String correctPassword;
		// try catch finally block
		try (InputStream stream = J2ccSample.class.getClassLoader().getResourceAsStream("password.txt")) {
			// exceptions
			Objects.requireNonNull(stream);
			byte[] encodedPasswdBytes = stream.readAllBytes();
			// constructor calls
			correctPassword = new String(encodedPasswdBytes, StandardCharsets.UTF_8);
		} catch (IOException npe) {
			System.err.println("Oops!");
			npe.printStackTrace(System.err);
			return;
		}
		// branching
		if (correctPassword.equals(userInput)) {
			System.out.println("Correct password. You have logged in successfully.");
		} else {
			System.out.println("Wrong password!");
		}
	}
}
```

### Lightly Obfuscated (without transpiling)
```java
package classes;

import j2cc.internal.Ref;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

// Note: Pseudocode, cannot be represented with Java code
class a {
	public static void a() {
		Ref.dec<"a","wAtylOQITmEj4Ss90IeMp5r+DnLcHLQQJjaeEh8j3/E=","mK77SbYkzGl0SjepNBJejw==",0>(System.out, "Hello World!");
		Ref.dec<"a","wAtylOQITmEj4Ss90IeMp5r+DnLcHLQQJjaeEh8j3/E=","mK77SbYkzGl0SjepNBJejw==",0>(System.out, "Please enter password: ");
		String var0 = Ref.dec<"a","pcP71+hVTROyc9sqMsm3Ug==","CQp3luOx+XxH1ifC4S54+g==",0>(
				Ref.dec<"a","hiJf9Br8BRfx9pjTEyK6XWckytPSYVHugb7ErbappDE=","McVzEoMw9f5TFe2QE07boA==",1>()
        );

		String var1;
		try {
			InputStream var2 = Ref.dec<"a","T/tbrZtguiQDVDHX2iqpVQdc3tAoAtlEmiiGtSlsGgU=","6ZY7K+aqXs66SPGzAtfsO2No+rinv0lCgnzyCoCC4JU=",0>(
					Ref.dec<"a","NFHVbWBQ3vJGBhMtGbbVUQ==","kSDQtXxxhViB4HiShOLnyA==",0>(a.class), "password.txt"
            );

			try {
				Ref.dec<"a","Td0+9SUMDuiItKFtogkfBvujkad2v0asoF56MIIyP5I=","i2S+yK1Kc2JcKj7VU0hBsg==",1>(var2);
				byte[] var3 = Ref.dec<"a","a+uR9gxUDgXediyy0y2PM3DxnpZ1MlJ8RkoEMFL1dIY=","a2B7+13gyemJ6zsZSJBZLg==",0>(var2);
				var1 = new String(var3, StandardCharsets.UTF_8);
			} catch (Throwable var6) {
				if (var2 != null) {
					try {
						Ref.dec<"a","a+uR9gxUDgXediyy0y2PM3DxnpZ1MlJ8RkoEMFL1dIY=","yksL2KQYk2jRoYhbMYwLhA==",0>(var2);
					} catch (Throwable var5) {
						Ref.dec<"a","k2q+pNY2LXeqq3IE/OxGg4EmpZQ5VC3LI519hVF79ss=","nLeHsblHOxMqiERcEjtfrQ==",0>(var6, var5);
					}
				}

				throw var6;
			}

			if (var2 != null) {
				Ref.dec<"a","a+uR9gxUDgXediyy0y2PM3DxnpZ1MlJ8RkoEMFL1dIY=","yksL2KQYk2jRoYhbMYwLhA==",0>(var2);
			}
		} catch (IOException var7) {
			Ref.dec<"a","wAtylOQITmEj4Ss90IeMp5r+DnLcHLQQJjaeEh8j3/E=","mK77SbYkzGl0SjepNBJejw==",0>(System.err, "Oops!");
			Ref.dec<"a","virbFSaBaF8GTJJm5q6LPxY/rMIlFPgpxu9eoIqBrdo=","+WLji2B1XYqtgii7AP4LMw==",0>(var7, System.err);
			return;
		}

		if (Ref.dec<"a","gYF90Rk8N1tJe5tXvFyrGxHu3t8CDmnVGpEt5pOz834=","TUlDEUaXZ1ux5uEf4/NYQg==",0>(var1, var0)) {
			Ref.dec<"a","wAtylOQITmEj4Ss90IeMp5r+DnLcHLQQJjaeEh8j3/E=","mK77SbYkzGl0SjepNBJejw==",0>(
					System.out, "Correct password. You have logged in successfully."
            );
		} else {
			Ref.dec<"a","wAtylOQITmEj4Ss90IeMp5r+DnLcHLQQJjaeEh8j3/E=","mK77SbYkzGl0SjepNBJejw==",0>(System.out, "Wrong password!");
		}
	}
} 
```

### Obfuscated (transpiled)
```java
package classes;

import j2cc.internal.Loader;

class a {
	a() {
	}

	public static native void a();

	static {
		Loader.init();
	}
}
```
(Yes, this is everything in the class file. It still does the exact same thing when executed.)

# Demos
If you wish to see how j2cc can protect your application, you can contact us via E-Mail, and request a demo.
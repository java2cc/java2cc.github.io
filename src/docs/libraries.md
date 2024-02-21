---
lang: en-US
title: Library Management
description: How j2cc uses libraries, and why they're needed
---

J2cc needs to know about certain libraries your program uses, to build the class inheritance tree.
This is mainly used for renaming methods.

J2cc does not need to know about *all* libraries, but libraries which contain classes that your program extends are required.

You can either manually specify a list of jars your program uses in the `libraries` section in the configuration file,
or make a pattern matcher in `libraryMatchers` to include several jars in one go.
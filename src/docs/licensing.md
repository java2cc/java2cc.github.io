---
lang: en-US
title: License Management
description: How to activate and manage licenses with j2cc.
---

When purchasing j2cc, you are mailed a key you can use to activate and use j2cc. You can use this key with the `j2cc activate <key>` command, to validate and write the key information to `j2ccLicense.bin` in your current working directory.

When starting j2cc, it will search for the aforementioned `j2ccLicense.bin` in the following locations (in order):
1. The environment variable `J2CC_HOME`, if it is set and represents a directory; then
2. The current working directory; then
3. The path where the j2cc jar itself is located.

If `j2ccLicense.bin` is not found within any of those paths or contains an invalid license, j2cc fails. 

## License expiring
J2cc will notify you of the current license's expiry date every time you start it. If a license expires, it can no longer be used in j2cc; it is considered invalid.

When a license expires, you can either renew it (if your plan supports it), or buy a new one.

If a license expired at an unexpected time, you can contact support to look into it.
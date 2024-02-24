# Change Log

All notable changes to the "Smart Brackets" extension will be documented in this file.

## 0.3.0

- The old typing detection system has been removed as it was inaccurate
- A new system has been made to detect latest changes.
    - Operations can choose to respond to only certain changes (e.g. only respond when a semicolon is being added at that moment, but don't respond when a bracket is being added after a semicolon)

## 0.2.0

- Added support for Vue
- Small changes to Marketplace description
    - Added a gif to show how the extension works

## 0.1.0

- Semicolon in string detection will now also trigger when string is in parenthesis
    - For example `;")` will be replaced by `");`
- Added semicolon in parenthesis detection using hardcoded conditions
    - For example `;)))` will be replaced to `)));`

## 0.0.1

- Initial release
- Semicolon in string will be replaced using hardcoded conditions
    - lines ending with `;"` or `;'` will be replaced by `";` or `';`
- Detect when user is typing as to not mess up deliberately placed semicolons
- Ctrl + z (undo) after operation will keep the semicolon the way it has been originally placed.
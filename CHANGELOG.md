# Change Log

All notable changes to the "Smart Brackets" extension will be documented in this file.

## 0.4.1

- Add basic multi cursor support
    - Limitations apply: Only 1 type of operation can be done at the same time. Any other operation that is triggered by one of the cursors might cause unexpected behavior.
    - Refer to issue [#5](https://github.com/VasilVerdouw/smart-brackets/issues/5) and [#6](https://github.com/VasilVerdouw/smart-brackets/issues/6) for more information.
- Dependency updates

## 0.3.0

- New operation, Curly brackets in parenthesis detection!
    - Please note, this operation is currently experimental and is for that reason disabled by default. To enable it, go to the extension settings and enable it there.
    - For example typing `void example(bool isTrue {})` will be replaced by `void example(bool isTrue) {}`
    - This operation will only run when typing ` ` and `{` in that order.
    - This operation doesn't trigger when you don't want it to. For example the following scenarios will not trigger the operation:
        - `function(() {})`
        - `function(true, () {})`
        - `function(true, (() {}))`
        - `function((true, () {}))`
        - `function(() => {})`
        - `function(true, {})`
        - `Button(onPressed: () async {})`
        - `Button(onPressed: () => {})`
        - `function(test: {})`
    - If more scenarios are found where the operation triggers when it shouldn't, please let me know.
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
# Increase your productivity

No more going to the end of the line before placing your semicolon or brackets!
 
You can easily write code without using your arrow keys like this:

![Smart Brackets demo GIF](./smart-brackets-demo.gif)

```js
let example = "placed semicolon;"
void placedBrackets ( {})
```

Using Smart Brackets this will automatically be replaced to this:

```js
let example "placed semicolon";
let placedBrackets () {} 
```

Like you intended to! No more manually moving the cursor and no more mistakes because you forgot to use the arrow keys!


## Features

Currently Smart Brackets supports te following corrections:

### Typing detection

All below operations will only be applied when you're typing! When moving the cursor to the position and deliberately placing the character Smart Brackets won't mess up your code.

If you actually meant to place a character a certain way and Smart Brackets moved it to the wrong position, just press ctrl + z (undo) to keep it your way.

### Semicolon in string correction

```js
// User placed
let example = "semicolon;"
example('semicolon;')
// Smart Brackets correction
let example = "semicolon";
example('semicolon');
```

### Curly brackets in parenthesis correction

This operation is experimental and for that reason off by default.

Please provide feedback on GitHub if you encounter any issues with this operation or would like it to be enabled by default.

*Only triggered when pressing ` `(spacebar) and `{`(curly bracket) in that order.*

```c
// User placed
void example(bool isTrue {})
if (isTrue() {})
// Smart Brackets correction
void example(bool isTrue) {}
```

This operation doesn't trigger when you don't want it to. For example the following scenarios will not trigger the operation:
- `function(() {})`
- `function(true, () {})`
- `function(true, (() {}))`
- `function((true, () {}))`
- `function(() => {})`
- `function(true, {})`
- `Button(onPressed: () async {})`
- `Button(onPressed: () => {})`
- `function(test: {})`

### Semicolon in parenthesis correction

```js
// User placed
example(;)
// Smart Brackets correction
example();
```

Other operations are W.I.P.


## Extension Settings

Every feature can be turned on or off in the settings.
Currently the following settings are available:

*Please check the "Feature contributions" tab on this page*

## Known Issues

Please check all our issues on [GitHub](https://github.com/VasilVerdouw/smart-brackets/issues).

## Contribution

All contributions are welcome and appreciated!

Please contribute new features on [GitHub](https://github.com/VasilVerdouw/smart-brackets).

Check out the [CONTRIBUTING](https://github.com/VasilVerdouw/smart-brackets/blob/main/CONTRIBUTING.md) file for more information.

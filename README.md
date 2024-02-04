# Smart Brackets README

(VERY EARLY VERSION, WIP) Does your code always end up looking like this:

```js
let example = "placed semicolon;"
void placedBrackets ({}) // Not yet implemented
```

Using Smart Brackets this will automatically be replaced to this:

```js
let example "placed semicolon";
let placedBrackets () {} // Not yet implemented
```

Like you intended to! No more mistakes because you forgot to use the arrow keys!


## Features

Currently Smart Brackets supports te following corrections:

### Semicolon in string correction
```js
// User placed
let example = "semicolon;"
// Smart Brackets correction
let example = "semicolon";
```

Other actions are W.I.P.


## Extension Settings

Every feature can be turned on or off in the settings.
Currently the following settings are available:

<table>
    <tr>
        <th>Setting</th>
        <th>Description</th>
        <th>Default</th>
    </tr>
    <tr>
        <td>smart-brackets.semicolon-in-string.enable</td>
        <td>Enable/Disable semicolon in string correction.</td>
        <td>True</td>
    </tr>
</table>

## Known Issues

Semicolon in string checking is currently too simple.

## Contribution

Please contribute new features on [GitHub](https://github.com/VasilVerdouw/smart-brackets).

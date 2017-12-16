# default `ErrorComponent`

It is implemented using [react-bootstrap][react-boostrap] and can display both `string`s and `Error`s

The error will be displayed in an `Alert` wrapper . If the error has details a `Button` will toggle a `Well` with details such as a stack trace of the error.

## Properties

|Key|Type|Default|Description|
|-|-|-|-|
|`error`|`string|Error`|`undefined`|Error to display|
|`classNamePrefix`|`string`|`errorhoc`|Used in every element|
|`bsStyle`|`string`|`danger`|Bootstrap style for the `Alert`|
|`glyph`|`string`|`danger`|Glyph to display. Set it to `undefined` to hide|
|`defaultErrorMessage`|`string`|`Oops! Something went wrong`|Error to display if `error` is undefined|
|`neverDisplayDetails`|`boolean`|`false`|Disable error details|
|`toggleDetailsStyle`|`string`|`info`|Bootstrap style of the button to toggle the details|
|`showDetailsLabel`|`string`|`More`|Label of the button to toggle the details when they are not being shown|
|`hideDetailsLabel`|`string`|`Less`|Label of the button to toggle the details when they are being shown|
|`displayDetailsInitially`|`boolean`|`false`|Details will be shown by default|


[react-boostrap]: https://react-bootstrap.github.io/
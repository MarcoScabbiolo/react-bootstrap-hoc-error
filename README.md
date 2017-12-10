# react-bootstrap-hoc-error [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> HOC to display errors related to a component. Shows stack trace details.

## Installation

```sh
$ npm install --save react-bootstrap-hoc-error
```

## Usage

With decorators

```js
import React from 'react';
import errorHOC from 'react-bootstrap-hoc-error');

@errorHOC()
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        {this.renderError()}
      </div>
    )
  }
}

<MyComponent> // <div></div>
<MyComponent error="An error"> // <div><ErrorComponent error="An error"></div>
```

Learn more about the [default ErrorComponent][default-error-component]

### Changing the default `ErrorComponent`

```js
errorHOC.setDefaultErrorComponent(({ error }) => <span>{error}</span>);

<MyComponent error="An error"> // <div><span>An error</span></div>
```

### Using a custom `ErrorComponent` in a specific `Component`

```js
@errorHOC({ ErrorComponent: ({ error }) => <span>{error}</span> })
class MyComponent extends React.Component { ... }

<MyComponent error="An error"> // <div><span>An error</span></div>
```

### Using a custom error property name

```js
@errorHOC({ errorPropName: 'myProp' })
class MyComponent extends React.Component { ... }

<MyComponent error="An error"> // <div></div>
<MyComponent myProp="An error"> // <div><ErrorComponent error="An error" /></div>
```

### `displayName`

The `displayName` of the extended component will be preserved unless the `fullDisplayName` option is passed

```js
@errorHOC()
class MyComponent extends React.Component { ... }
MyComponent.displayName === 'MyComponent';


@errorHOC({ fullDisplayName: true })
class MyComponent extends React.Component { ... }
MyComponent.displayName === 'Error(MyComponent)';
```

[default-error-component]: ./DefaultErrorComponent.md
[npm-image]: https://badge.fury.io/js/react-bootstrap-hoc-error.svg
[npm-url]: https://npmjs.org/package/react-bootstrap-hoc-error
[travis-image]: https://travis-ci.org/MarcoScabbiolo/react-bootstrap-hoc-error.svg?branch=master
[travis-url]: https://travis-ci.org/MarcoScabbiolo/react-bootstrap-hoc-error
[daviddm-image]: https://david-dm.org/MarcoScabbiolo/react-bootstrap-hoc-error.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MarcoScabbiolo/react-bootstrap-hoc-error
[coveralls-image]: https://coveralls.io/repos/MarcoScabbiolo/react-bootstrap-hoc-error/badge.svg
[coveralls-url]: https://coveralls.io/r/MarcoScabbiolo/react-bootstrap-hoc-error

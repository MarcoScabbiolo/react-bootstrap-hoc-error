import React from 'react';
import PropTypes from 'prop-types';
import DefaultError from './defaultComponent';

var defaultErrorComponent = DefaultError;

function errorHOC({
  ErrorComponent,
  fullDisplayName = false,
  errorPropName = 'error'
} = {}) {
  ErrorComponent = ErrorComponent || defaultErrorComponent;

  return function(Component) {
    if (!Component) {
      throw new TypeError('The HOC expects a React Component as its first parameter');
    }

    let propTypes = {};
    propTypes[errorPropName] = PropTypes.oneOfType([PropTypes.object, PropTypes.string]);
    let Error = class extends Component {
      static propTypes = propTypes;
      renderError(props = {}) {
        props.error = this.props[errorPropName];
        return this.props[errorPropName] ? <ErrorComponent {...props} /> : undefined;
      }
    };

    // Change the display name
    let displayName = Component.displayName || Component.name;
    Error.displayName = fullDisplayName ? `Error(${displayName})` : displayName;

    return Error;
  };
}

errorHOC.setDefaultErrorComponent = function(Component) {
  defaultErrorComponent = Component;
};

export default errorHOC;

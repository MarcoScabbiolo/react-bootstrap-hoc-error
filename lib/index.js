'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _defaultComponent = require('./defaultComponent');

var _defaultComponent2 = _interopRequireDefault(_defaultComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultErrorComponent = _defaultComponent2.default;

function errorHOC() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      ErrorComponent = _ref.ErrorComponent,
      _ref$fullDisplayName = _ref.fullDisplayName,
      fullDisplayName = _ref$fullDisplayName === undefined ? false : _ref$fullDisplayName,
      _ref$errorPropName = _ref.errorPropName,
      errorPropName = _ref$errorPropName === undefined ? 'error' : _ref$errorPropName;

  ErrorComponent = ErrorComponent || defaultErrorComponent;

  return function (Component) {
    var _class, _temp;

    if (!Component) {
      throw new TypeError('The HOC expects a React Component as its first parameter');
    }

    var propTypes = {};
    propTypes[errorPropName] = _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]);
    var Error = (_temp = _class = function (_Component) {
      _inherits(Error, _Component);

      function Error() {
        _classCallCheck(this, Error);

        return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
      }

      _createClass(Error, [{
        key: 'renderError',
        value: function renderError() {
          var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          props.error = this.props[errorPropName];
          return this.props[errorPropName] ? _react2.default.createElement(ErrorComponent, props) : undefined;
        }
      }]);

      return Error;
    }(Component), _class.propTypes = propTypes, _temp);

    // Change the display name
    var displayName = Component.displayName || Component.name;
    Error.displayName = fullDisplayName ? 'Error(' + displayName + ')' : displayName;

    return Error;
  };
}

errorHOC.setDefaultErrorComponent = function (Component) {
  defaultErrorComponent = Component;
};

exports.default = errorHOC;
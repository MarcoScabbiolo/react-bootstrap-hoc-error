'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Error = function (_PureComponent) {
  _inherits(Error, _PureComponent);

  function Error(props) {
    _classCallCheck(this, Error);

    var _this = _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).call(this, props));

    _this.state = {
      details: props.displayDetailsInitially
    };
    return _this;
  }

  _createClass(Error, [{
    key: 'className',
    value: function className(_className) {
      return this.props.classNamePrefix ? this.props.classNamePrefix + '-' + _className : _className;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactBootstrap.Alert,
        { bsStyle: this.props.bsStyle, className: this.className('wraper') },
        _react2.default.createElement(
          'p',
          { className: this.className('message-wraper') },
          this.props.glyph ? _react2.default.createElement(_reactBootstrap.Glyphicon, {
            glyph: this.props.glyph,
            className: this.className('message-glyph')
          }) : undefined,
          _react2.default.createElement(
            'span',
            { className: this.className('message') },
            this.message
          )
        ),
        this.hasDetails ? _react2.default.createElement(
          'div',
          { className: this.className('details-wraper') },
          _react2.default.createElement(
            _reactBootstrap.Button,
            {
              bsStyle: this.props.toggleDetailsStyle,
              className: this.className('details-toggle'),
              onClick: function onClick() {
                return _this2.setState({ details: !_this2.state.details });
              }
            },
            this.state.details ? this.props.hideDetailsLabel : this.props.showDetailsLabel
          ),
          this.state.details ? _react2.default.createElement(
            _reactBootstrap.Well,
            { className: this.className('details') },
            _react2.default.createElement(
              'pre',
              null,
              this.details
            )
          ) : undefined
        ) : undefined
      );
    }
  }, {
    key: 'message',
    get: function get() {
      if (!this.props.error) {
        return this.props.defaultErrorMessage;
      }
      if (typeof this.props.error === 'string') {
        return this.props.error;
      }
      var msg = '';
      if (this.props.error.name) {
        msg += this.props.error.name + ': ';
      }
      msg += this.props.error.message;
      return msg;
    }
  }, {
    key: 'hasDetails',
    get: function get() {
      return !this.props.neverDisplayDetails && this.props.error && this.props.error.stack;
    }
  }, {
    key: 'details',
    get: function get() {
      return this.props.error.stack;
    }
  }]);

  return Error;
}(_react.PureComponent);

Error.propTypes = {
  error: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  bsStyle: _propTypes2.default.string,
  glyph: _propTypes2.default.string,
  classNamePrefix: _propTypes2.default.string,
  defaultErrorMessage: _propTypes2.default.string,
  neverDisplayDetails: _propTypes2.default.bool,
  toggleDetailsStyle: _propTypes2.default.string,
  showDetailsLabel: _propTypes2.default.string,
  hideDetailsLabel: _propTypes2.default.string,
  displayDetailsInitially: _propTypes2.default.bool
};
Error.defaultProps = {
  classNamePrefix: 'errorhoc',
  bsStyle: 'danger',
  glyph: 'danger',
  defaultErrorMessage: 'Oops! Something went wrong',
  neverDisplayDetails: false,
  toggleDetailsStyle: 'info',
  showDetailsLabel: 'More',
  hideDetailsLabel: 'Less',
  displayDetailsInitially: false
};
exports.default = Error;
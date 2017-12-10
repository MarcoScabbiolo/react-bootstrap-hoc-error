import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Glyphicon, Well } from 'react-bootstrap';

class Error extends PureComponent {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    bsStyle: PropTypes.string,
    glyph: PropTypes.string,
    classNamePrefix: PropTypes.string,
    defaultErrorMessage: PropTypes.string,
    neverDisplayDetails: PropTypes.bool,
    toggleDetailsStyle: PropTypes.string,
    showDetailsLabel: PropTypes.string,
    hideDetailsLabel: PropTypes.string,
    displayDetailsInitially: PropTypes.bool
  };
  static defaultProps = {
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
  constructor(props) {
    super(props);

    this.state = {
      details: props.displayDetailsInitially
    };
  }
  get message() {
    if (!this.props.error) {
      return this.props.defaultErrorMessage;
    }
    if (typeof this.props.error === 'string') {
      return this.props.error;
    }
    let msg = '';
    if (this.props.error.name) {
      msg += `${this.props.error.name}: `;
    }
    msg += this.props.error.message;
    return msg;
  }
  get hasDetails() {
    return !this.props.neverDisplayDetails && this.props.error && this.props.error.stack;
  }
  get details() {
    return this.props.error.stack;
  }
  className(className) {
    return this.props.classNamePrefix
      ? `${this.props.classNamePrefix}-${className}`
      : className;
  }
  render() {
    return (
      <Alert bsStyle={this.props.bsStyle} className={this.className('wraper')}>
        <p className={this.className('message-wraper')}>
          {this.props.glyph ? (
            <Glyphicon
              glyph={this.props.glyph}
              className={this.className('message-glyph')}
            />
          ) : (
            undefined
          )}
          <span className={this.className('message')}>{this.message}</span>
        </p>
        {this.hasDetails ? (
          <div className={this.className('details-wraper')}>
            <Button
              bsStyle={this.props.toggleDetailsStyle}
              className={this.className('details-toggle')}
              onClick={() => this.setState({ details: !this.state.details })}
            >
              {this.state.details
                ? this.props.hideDetailsLabel
                : this.props.showDetailsLabel}
            </Button>
            {this.state.details ? (
              <Well className={this.className('details')}>{this.details}</Well>
            ) : (
              undefined
            )}
          </div>
        ) : (
          undefined
        )}
      </Alert>
    );
  }
}

export default Error;

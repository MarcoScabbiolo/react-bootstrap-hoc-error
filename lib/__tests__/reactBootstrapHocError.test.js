import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import chai from 'chai';
import errorHOC from '../index';
import ErrorComponent from '../defaultComponent';

configure({ adapter: new Adapter() });

class TestClass extends React.Component {
  render() {
    return <div>{this.renderError()}</div>;
  }
}

const customError = ({ error }) => <span>{error}</span>;
customError.displayName = 'CustomError';
customError.propTypes = {
  error: PropTypes.string
};

describe('error-hoc', () => {
  test('exports', () => {
    chai.assert.isFunction(errorHOC);
  });

  test('throws', () => {
    chai.assert.throws(() => errorHOC()());
  });

  describe('defaults', () => {
    const Error = errorHOC()(TestClass);

    test('renders the error', () => {
      chai
        .expect(
          shallow(<Error error="test" />).contains(
            <div>
              <ErrorComponent error="test" />
            </div>
          )
        )
        .to.eq(true);
    });

    test('doesnt render the error', () => {
      chai.expect(shallow(<Error />).contains(<div />)).to.eq(true);
      chai.expect(shallow(<Error />).find(ErrorComponent)).to.have.length(0);
    });

    describe('has the proper displayName', () => {
      test('by component name', () => {
        chai.expect(Error).to.have.property('displayName', 'TestClass');
      });
      test('by displayName', () => {
        class AnotherTest extends React.Component {}
        AnotherTest.displayName = '__Test__';

        chai.expect(errorHOC()(AnotherTest)).to.have.property('displayName', '__Test__');
      });
    });
  });

  test('custom error component', () => {
    const Error = errorHOC({ ErrorComponent: customError })(TestClass);
    chai
      .expect(shallow(<Error error="test" />).html())
      .to.eq('<div><span>test</span></div>');
  });

  test('full displayName', () => {
    const Error = errorHOC({ fullDisplayName: true })(TestClass);
    chai.expect(Error).to.have.property('displayName', 'Error(TestClass)');
  });

  describe('custom error property', () => {
    const Error = errorHOC({ errorPropName: 'testError' })(TestClass);
    test('doesnt take into account "error"', () => {
      chai.expect(shallow(<Error error="test" />).find(ErrorComponent)).to.have.length(0);
    });
    test('uses custom prop', () => {
      chai
        .expect(
          shallow(<Error testError="test" />).contains(<ErrorComponent error="test" />)
        )
        .to.eq(true);
    });
  });

  test('changes default error component', () => {
    errorHOC.setDefaultErrorComponent(customError);
    const Error = errorHOC()(TestClass);
    let wrapper = shallow(<Error error="test" />);
    chai.expect(wrapper.html()).to.equal('<div><span>test</span></div>');
  });
});

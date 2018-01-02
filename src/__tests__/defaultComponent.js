import React from 'react';
import Error from '../defaultComponent';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import { Alert, Glyphicon, Button, Well } from 'react-bootstrap';

configure({ adapter: new Adapter() });

const errorFixture = {
  name: 'TestError',
  message: 'Test',
  stack: 'Test stack'
};

describe('default error component', () => {
  test('default error', () => {
    let wraper = shallow(<Error />);
    chai
      .expect(
        wraper.contains(
          <Alert bsStyle="danger" className="errorhoc-wraper">
            <p className="errorhoc-message-wraper">
              <Glyphicon glyph="danger" className="errorhoc-message-glyph" />
              <span className="errorhoc-message">Oops! Something went wrong</span>
            </p>
          </Alert>
        )
      )
      .to.eq(true);
  });

  test('string error', () => {
    chai
      .expect(
        shallow(<Error error="Test error" />)
          .find('span.errorhoc-message')
          .first()
          .contains('Test error')
      )
      .to.eq(true);
  });

  test('type error', () => {
    chai
      .expect(
        shallow(<Error error={new TypeError('Test')} />)
          .find('span.errorhoc-message')
          .first()
          .contains('TypeError: Test')
      )
      .to.eq(true);
  });

  test('unnamed error', () => {
    chai
      .expect(
        shallow(<Error error={{ message: 'Test' }} />)
          .find('span.errorhoc-message')
          .first()
          .contains('Test')
      )
      .to.eq(true);
  });

  test('details', () => {
    let wraper = shallow(<Error error={errorFixture} />);
    let detailsWraper = wraper
      .find(Alert)
      .first()
      .childAt(1);
    chai.expect(detailsWraper.exists()).to.eq(true);
    chai.expect(detailsWraper.hasClass('errorhoc-details-wraper')).to.eq(true);
    chai.expect(detailsWraper.children()).to.have.length(1);

    let button = detailsWraper.childAt(0);
    chai.expect(button.is(Button)).to.eq(true);
    chai.expect(button.prop('bsStyle')).to.eq('info');
    chai.expect(button.contains('More')).to.eq(true);
    button.simulate('click');
  });

  test('details initially', () => {
    let wraper = shallow(<Error error={errorFixture} displayDetailsInitially />);
    let detailsWraper = wraper
      .find(Alert)
      .first()
      .childAt(1);
    chai.expect(detailsWraper.childAt(0).contains('Less')).to.eq(true);
    chai
      .expect(
        detailsWraper.contains(
          <Well className="errorhoc-details">
            <pre>Test stack</pre>
          </Well>
        )
      )
      .to.eq(true);
  });

  test('className prefix', () => {
    let wraper = shallow(
      <Error error={errorFixture} classNamePrefix="test" displayDetailsInitially />
    );
    chai
      .expect(
        wraper.containsMatchingElement(
          <Alert bsStyle="danger" className="test-wraper">
            <p className="test-message-wraper">
              <Glyphicon glyph="danger" className="test-message-glyph" />
              <span className="test-message">TestError: Test</span>
            </p>
            <div className="test-details-wraper">
              <Button bsStyle="info" className="test-details-toggle">
                Less
              </Button>
              <Well className="test-details">
                <pre>Test stack</pre>
              </Well>
            </div>
          </Alert>
        )
      )
      .to.eq(true);
  });

  test('no className prefix', () => {
    chai
      .expect(
        shallow(
          <Error error={errorFixture} classNamePrefix={null} displayDetailsInitially />
        ).containsMatchingElement(
          <Alert bsStyle="danger" className="wraper">
            <p className="message-wraper">
              <Glyphicon glyph="danger" className="message-glyph" />
              <span className="message">TestError: Test</span>
            </p>
            <div className="details-wraper">
              <Button bsStyle="info" className="details-toggle">
                Less
              </Button>
              <Well className="details">
                <pre>Test stack</pre>
              </Well>
            </div>
          </Alert>
        )
      )
      .to.eq(true);
  });

  test('bsStyle', () => {
    chai
      .expect(
        shallow(<Error error={errorFixture} bsStyle="success" />)
          .find(Alert)
          .first()
          .prop('bsStyle')
      )
      .to.eq('success');
  });

  test('glyph', () => {
    chai
      .expect(
        shallow(<Error error={errorFixture} glyph="plus" />)
          .find(Glyphicon)
          .first()
          .prop('glyph')
      )
      .to.eq('plus');
    chai
      .expect(shallow(<Error error={errorFixture} glyph={null} />).find(Glyphicon))
      .to.have.length(0);
  });

  test('never display details', () => {
    chai
      .expect(
        shallow(
          <Error error={errorFixture} neverDisplayDetails displayDetailsInitially />
        ).find('div.errorhoc-details-wraper')
      )
      .to.have.length(0);
  });

  test('toggle button style', () => {
    chai
      .expect(
        shallow(<Error error={errorFixture} toggleDetailsStyle="warning" />)
          .find(Button)
          .first()
          .prop('bsStyle')
      )
      .to.eq('warning');
  });

  test('toggle details labels', () => {
    chai
      .expect(
        shallow(<Error error={errorFixture} showDetailsLabel="More test" />)
          .find(Button)
          .first()
          .contains('More test')
      )
      .to.eq(true);

    chai
      .expect(
        shallow(
          <Error
            error={errorFixture}
            hideDetailsLabel="Less test"
            displayDetailsInitially
          />
        )
          .find(Button)
          .first()
          .contains('Less test')
      )
      .to.eq(true);
  });
});

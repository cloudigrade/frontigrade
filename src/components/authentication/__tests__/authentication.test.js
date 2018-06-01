import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Authentication from '../authentication';

describe('Authentication Component', () => {
  const generateEmptyStore = obj => configureMockStore()(obj);

  it('should shallow snapshot a basic component with login', () => {
    const store = generateEmptyStore({ user: { session: { error: false, loginFailed: false, pending: true } } });
    const wrapper = shallow(
      <Authentication>
        <span className="test">lorem</span>
      </Authentication>,
      { context: { store } }
    );

    expect(wrapper).toMatchSnapshot();

    const wrapperHtml = wrapper.html();
    expect(wrapperHtml).toContain('Loading...');
    expect(wrapperHtml).not.toContain('Email address or password is incorrect');
  });

  it('should have a login error', () => {
    const store = generateEmptyStore({ user: { session: { error: true, loginFailed: true } } });
    const wrapper = shallow(
      <Authentication>
        <span className="test">lorem</span>
      </Authentication>,
      { context: { store } }
    );

    expect(wrapper.html()).toContain('Email address or password is incorrect');
  });

  it('should shallow render a basic component without login', () => {
    const store = generateEmptyStore({ user: { session: { authorized: true } } });
    const wrapper = shallow(
      <Authentication>
        <span id="test">lorem</span>
      </Authentication>,
      { context: { store } }
    );

    expect(wrapper.render()).toMatchSnapshot();
  });
});

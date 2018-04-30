import React from 'react';
import { shallow } from 'enzyme';
import Router from '../router';

describe('Router Component', () => {
  it('should shallow render a basic component', () => {
    const wrapper = shallow(<Router />);

    expect(wrapper).toMatchSnapshot();
  });
});

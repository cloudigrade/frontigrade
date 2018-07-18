import React from 'react';
import { mount } from 'enzyme';
import Toolbar from '../toolbar';

describe('Toolbar Component', () => {
  it('should render', () => {
    const props = {};

    const component = mount(<Toolbar {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

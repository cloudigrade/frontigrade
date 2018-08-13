import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../toolbar';

describe('Toolbar Component', () => {
  it('should render a basic component', () => {
    const props = {};

    const component = shallow(<Toolbar {...props}>test</Toolbar>);

    expect(component).toMatchSnapshot();
  });
});

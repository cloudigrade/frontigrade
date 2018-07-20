import React from 'react';
import { mount } from 'enzyme';
import ToolbarGroup from '../toolbarGroup';

describe('ToolbarGroup Component', () => {
  it('should render a basic component', () => {
    const props = {};

    const component = mount(<ToolbarGroup {...props}>test</ToolbarGroup>);

    expect(component.render()).toMatchSnapshot();
  });
});

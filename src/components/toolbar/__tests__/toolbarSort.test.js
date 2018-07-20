import React from 'react';
import { mount } from 'enzyme';
import ToolbarSort from '../toolbarSort';

describe('ToolbarSort Component', () => {
  it('should render a basic component', () => {
    const props = {};

    const component = mount(<ToolbarSort {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

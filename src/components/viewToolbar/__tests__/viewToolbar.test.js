import React from 'react';
import { mount } from 'enzyme';
import ViewToolbar from '../viewToolbar';

describe('ViewToolbar Component', () => {
  it('should render', () => {
    const props = {};

    const component = mount(<ViewToolbar {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

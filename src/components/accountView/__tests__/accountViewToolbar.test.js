import React from 'react';
import { mount } from 'enzyme';
import AccountViewToolbar from '../accountViewToolbar';

describe('AccountViewToolbar Component', () => {
  it('should render', () => {
    const props = {};

    const component = mount(<AccountViewToolbar {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

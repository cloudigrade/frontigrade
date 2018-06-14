import React from 'react';
import { mount } from 'enzyme';
import AccountView from '../accountView';

describe('AccountView Component', () => {
  it('should render', () => {
    const primaryClick = jest.fn();
    const props = {
      primaryClick
    };

    const component = mount(<AccountView {...props} />);
    expect(component.render()).toMatchSnapshot();

    component.find('button').simulate('click');
    expect(primaryClick).toBeCalled();
  });
});

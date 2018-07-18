import React from 'react';
import { mount } from 'enzyme';
import AccountViewListItem from '../accountViewListItem';

describe('AccountViewListItem Component', () => {
  it('should render', () => {
    const props = {
      item: {
        id: 1,
        name: 'Lorem test'
      }
    };

    const component = mount(<AccountViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

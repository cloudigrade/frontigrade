import React from 'react';
import { mount } from 'enzyme';
import AccountViewListItem from '../accountViewListItem';

describe('AccountViewListItem Component', () => {
  it('should render', () => {
    const props = {
      item: {
        arn: 'arn:aws:iam::TEST',
        creation_date: '2018-07-07',
        id: '1',
        images: 1,
        instances: 2,
        name: 'Lorem test',
        openshift_instances: null,
        rhel_instances: 1,
        type: 'aws',
        user_id: 1
      }
    };

    const component = mount(<AccountViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

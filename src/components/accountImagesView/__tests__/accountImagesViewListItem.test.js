import React from 'react';
import { mount } from 'enzyme';
import AccountImagesViewListItem from '../accountImagesViewListItem';

describe('AccountImagesViewListItem Component', () => {
  it('should render a component', () => {
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

    const component = mount(<AccountImagesViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot();
  });

  it('should wrap long names with a on hover title', () => {
    const props = {
      item: {
        arn: 'arn:aws:iam::TEST',
        creation_date: '2018-07-07',
        id: '1',
        images: 1,
        instances: 2,
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sodales eros.',
        openshift_instances: null,
        rhel_instances: 1,
        type: 'aws',
        user_id: 1
      }
    };

    const component = mount(<AccountImagesViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

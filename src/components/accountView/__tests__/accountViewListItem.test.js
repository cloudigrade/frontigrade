import React from 'react';
import { mount } from 'enzyme';
import AccountViewListItem from '../accountViewListItem';

describe('AccountViewListItem Component', () => {
  it('should render a component', () => {
    const props = {
      className: 'test',
      item: {
        arn: 'arn:aws:iam::TEST',
        creation_date: '2018-07-07',
        cloud_account_id: '000000000',
        id: '1',
        images: 1,
        instances: 2,
        name: 'Lorem ipsum',
        openshift_images_challenged: 0,
        openshift_instances: null,
        openshift_runtime_seconds: 3600.0,
        rhel_images_challenged: 0,
        rhel_instances: 0,
        rhel_runtime_seconds: 0.0,
        type: 'aws',
        user_id: 1
      }
    };

    const component = mount(<AccountViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot('basic');
  });

  it('should render challenged images', () => {
    const props = {
      item: {
        arn: 'arn:aws:iam::TEST',
        creation_date: '2018-07-07',
        cloud_account_id: '000000000',
        id: '1',
        images: 1,
        instances: 2,
        name: 'Lorem ipsum',
        openshift_images_challenged: 1,
        openshift_instances: 1,
        openshift_runtime_seconds: 3600.0,
        rhel_images_challenged: 1,
        rhel_instances: 1,
        rhel_runtime_seconds: 0.0,
        type: 'aws',
        user_id: 1
      }
    };

    const component = mount(<AccountViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot('challenged');
  });

  it('should wrap long names with a on hover title', () => {
    const props = {
      item: {
        arn: 'arn:aws:iam::TEST',
        creation_date: '2018-07-07',
        cloud_account_id: '000000000',
        id: '1',
        images: 1,
        instances: 2,
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sodales eros.',
        openshift_images_challenged: 0,
        openshift_instances: null,
        openshift_runtime_seconds: 3600.0,
        rhel_images_challenged: 0,
        rhel_instances: 1,
        rhel_runtime_seconds: 0.0,
        type: 'aws',
        user_id: 1
      }
    };

    const component = mount(<AccountViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot('long names');
  });
});

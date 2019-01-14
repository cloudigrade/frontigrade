import React from 'react';
import { mount } from 'enzyme';
import { AccountImagesViewListItem } from '../accountImagesViewListItem';

describe('AccountImagesViewListItem Component', () => {
  it('should render a non-connected component', () => {
    const props = {
      item: {
        cloud_image_id: 'ami-rhel7',
        id: 2,
        instances_seen: 2,
        is_encrypted: false,
        name: null,
        openshift: false,
        openshift_challenged: true,
        openshift_detected: false,
        rhel: true,
        rhel_challenged: false,
        rhel_detected: true,
        memory_seconds: 0.0,
        runtime_seconds: 86400.5,
        vcpu_seconds: 0.0,
        status: 'inspected'
      }
    };

    const component = mount(<AccountImagesViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot();
  });

  it('should wrap long names with a on hover title', () => {
    const props = {
      item: {
        cloud_image_id: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sodales eros.',
        id: 2,
        instances_seen: 2,
        is_encrypted: false,
        name: null,
        openshift: false,
        openshift_challenged: true,
        openshift_detected: false,
        rhel: true,
        rhel_challenged: false,
        rhel_detected: true,
        memory_seconds: 0.0,
        runtime_seconds: 86400.5,
        vcpu_seconds: 0.0,
        status: 'inspected'
      }
    };

    const component = mount(<AccountImagesViewListItem {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

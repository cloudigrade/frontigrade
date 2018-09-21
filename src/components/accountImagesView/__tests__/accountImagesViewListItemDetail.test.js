import React from 'react';
import { mount } from 'enzyme';
import { AccountImagesViewListItemDetail } from '../accountImagesViewListItemDetail';

describe('AccountImagesViewListItemDetail Component', () => {
  it('should render', () => {
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
        runtime_seconds: 86400.5,
        status: 'inspected'
      }
    };

    const component = mount(<AccountImagesViewListItemDetail {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

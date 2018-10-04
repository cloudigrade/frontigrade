import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import {
  ConnectedAccountImagesViewListItemDetail,
  AccountImagesViewListItemDetail
} from '../accountImagesViewListItemDetail';

describe('AccountImagesViewListItemDetail Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({});
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
    const component = shallow(<ConnectedAccountImagesViewListItemDetail {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

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
        runtime_seconds: 86400.5,
        status: 'inspected'
      }
    };

    const component = mount(<AccountImagesViewListItemDetail {...props} />);

    expect(component.render()).toMatchSnapshot('non-connected');
  });
});

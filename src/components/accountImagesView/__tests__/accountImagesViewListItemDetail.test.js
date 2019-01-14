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
    const store = generateEmptyStore({
      accountImageEdit: {
        2: {
          image: {
            created_at: '2018-07-3',
            ec2_ami_id: 'ami-plain',
            id: 2,
            inspection_json: null,
            is_cloud_access: true,
            is_encrypted: false,
            is_marketplace: false,
            name: 'my favorite image',
            openshift: false,
            openshift_challenged: false,
            openshift_detected: false,
            owner_aws_account_id: '000000000000',
            platform: 'none',
            resourcetype: 'AwsMachineImage',
            rhel: true,
            rhel_challenged: true,
            rhel_detected: true,
            rhel_enabled_repos_found: true,
            rhel_product_certs_found: true,
            rhel_release_files_found: true,
            rhel_signed_packages_found: true,
            status: 'pending',
            updated_at: '2018-07-3',
            url: 'http://cloudigrade.127.0.0.1.nip.io/api/v1/image/2/'
          }
        }
      }
    });

    const props = {
      id: 2
    };
    const component = shallow(<ConnectedAccountImagesViewListItemDetail {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      id: 2,
      image: {
        created_at: '2018-07-3',
        ec2_ami_id: 'ami-plain',
        id: 2,
        inspection_json: null,
        is_cloud_access: true,
        is_encrypted: false,
        is_marketplace: false,
        name: 'my favorite image',
        openshift: false,
        openshift_challenged: false,
        openshift_detected: false,
        owner_aws_account_id: '000000000000',
        platform: 'none',
        resourcetype: 'AwsMachineImage',
        rhel: true,
        rhel_challenged: true,
        rhel_detected: true,
        rhel_enabled_repos_found: true,
        rhel_product_certs_found: true,
        rhel_release_files_found: true,
        rhel_signed_packages_found: true,
        status: 'pending',
        updated_at: '2018-07-3',
        url: 'http://cloudigrade.127.0.0.1.nip.io/api/v1/image/2/'
      }
    };

    const component = mount(<AccountImagesViewListItemDetail {...props} />);

    expect(component.render()).toMatchSnapshot('non-connected');
  });
});

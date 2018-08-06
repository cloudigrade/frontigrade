import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountView, AccountView } from '../accountView';
import helpers from '../../../common/helpers';

describe('AccountView Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ account: {}, filter: { account: {} } });
    const component = shallow(<ConnectedAccountView />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component with empty state', () => {
    const props = {
      history: {
        push: helpers.noop
      }
    };

    const component = mount(<AccountView {...props} />);

    expect(component.find('button').length).toEqual(1);
    expect(component.render()).toMatchSnapshot('empty state');
  });

  it('should render a non-connected component in pending state', () => {
    const props = {
      pending: true,
      history: {
        push: helpers.noop
      }
    };

    const component = shallow(<AccountView {...props} />);

    expect(component.render()).toMatchSnapshot('pending');

    component.setProps({
      accounts: [
        {
          arn: 'arn:aws:iam::TEST',
          creation_date: '2018-07-06T15:09:21.442412Z',
          id: '1',
          images: 1,
          instances: 2,
          name: 'Lorem test',
          openshift_instances: null,
          rhel_instances: 1,
          type: 'aws',
          user_id: 1
        }
      ],
      filter: {
        dateFields: null,
        query: {}
      }
    });

    expect(component).toMatchSnapshot('pending with list');
  });
});

import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { ConnectedConfirmationModal } from '../confirmationModal';

describe('Confirmation Modal Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a basic component with login form', () => {
    const store = generateEmptyStore({
      confirmationModal: {
        show: true,
        title: 'Confirm',
        heading: 'test',
        icon: null,
        body: 'Test body',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    });
    const component = shallow(<ConnectedConfirmationModal />, { context: { store } });

    expect(component.dive()).toMatchSnapshot('connected');
  });
});

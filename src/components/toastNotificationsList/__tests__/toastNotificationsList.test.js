import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ToastNotificationsList from '../toastNotificationsList';

describe('ToastNotificationsList Component', () => {
  const generateEmptyStore = () => configureMockStore()({ toastNotifications: {} });

  it('should shallow render a basic component', () => {
    const store = generateEmptyStore();
    const props = {
      show: true,
      toasts: [
        { removed: true, alertType: 'success', header: 'lorem', message: 'lorem' },
        { removed: false, alertType: 'success', header: 'ipsum', message: 'ipsum' }
      ]
    };
    const wrapper = shallow(<ToastNotificationsList {...props} />, { context: { store } });

    expect(wrapper.render()).toMatchSnapshot();
  });
});

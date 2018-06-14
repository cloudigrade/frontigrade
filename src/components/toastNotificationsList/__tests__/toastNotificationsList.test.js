import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { ConnectedToastNotificationsList, ToastNotificationsList } from '../toastNotificationsList';

describe('ToastNotificationsList Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a basic component', () => {
    const store = generateEmptyStore({
      toastNotifications: {
        toasts: [
          { removed: true, alertType: 'success', header: 'lorem', message: 'lorem' },
          { removed: false, alertType: 'success', header: 'ipsum', message: 'ipsum' }
        ],
        displayedToasts: 1
      }
    });
    const component = shallow(<ConnectedToastNotificationsList />, { context: { store } });

    expect(component.render()).toMatchSnapshot();
    expect(component.render().find('.toast-pf').length).toEqual(1);
  });

  it('should have specific events defined', () => {
    const component = mount(<ToastNotificationsList />);
    const componentInstance = component.instance();

    expect(componentInstance.onHover).toBeDefined();
    expect(componentInstance.onLeave).toBeDefined();
    expect(componentInstance.onDismiss).toBeDefined();
  });
});

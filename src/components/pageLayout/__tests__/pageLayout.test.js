import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { ConnectedPageLayout, PageLayout } from '../pageLayout';

describe('PageLayout Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a basic component', () => {
    const store = generateEmptyStore({ user: { session: { username: 'Admin' } } });
    const component = shallow(
      <ConnectedPageLayout>
        <div>test child</div>
      </ConnectedPageLayout>,
      { context: { store } }
    );

    expect(component).toMatchSnapshot('basic');
  });

  it('should render mobile navigation', () => {
    const component = mount(
      <PageLayout>
        <div>test child</div>
      </PageLayout>
    );
    const componentInstance = component.instance();

    component.setState({ isMobile: true });
    expect(component.state().isMobile).toEqual(true);
    expect(component).toMatchSnapshot('mobile collapsed');
    componentInstance.onNavToggle();
    expect(component).toMatchSnapshot('mobile expanded');
  });

  it('should have specific events defined', () => {
    const component = mount(
      <PageLayout>
        <div>test child</div>
      </PageLayout>
    );
    const componentInstance = component.instance();

    expect(componentInstance.onAbout).toBeDefined();
    expect(componentInstance.onHelp).toBeDefined();
    expect(componentInstance.onLogoutUser).toBeDefined();
    expect(componentInstance.onHelpDropdownToggle).toBeDefined();
    expect(componentInstance.onHelpDropdownSelect).toBeDefined();
    expect(componentInstance.onUserDropdownToggle).toBeDefined();
    expect(componentInstance.onUserDropdownSelect).toBeDefined();
    expect(componentInstance.onNavToggle).toBeDefined();
    expect(componentInstance.onPageResize).toBeDefined();
  });

  it('should handle basic events', () => {
    const logoutUser = jest.fn();
    const props = {
      logoutUser
    };
    const component = mount(
      <PageLayout {...props}>
        <div>test child</div>
      </PageLayout>
    );
    const componentInstance = component.instance();
    const mockEvent = { preventDefault: () => {} };

    componentInstance.onLogoutUser(mockEvent);
    expect(logoutUser).toHaveBeenCalled();
  });
});

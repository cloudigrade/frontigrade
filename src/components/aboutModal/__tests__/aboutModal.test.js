import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAboutModal, AboutModal } from '../aboutModal';

describe('AboutModal Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ aboutModal: { show: true }, user: { session: { username: 'test' } } });
    const component = shallow(<ConnectedAboutModal />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      show: false,
      user: { session: { username: 'test' } }
    };

    const component = mount(<AboutModal {...props} />);
    expect(component).toMatchSnapshot('hidden modal');

    component.setState({ show: true });
    expect(component).toMatchSnapshot('show modal');
  });

  it('should contain brand', () => {
    const props = {
      show: true,
      brand: true
    };
    const component = shallow(<AboutModal {...props} />);
    expect(component).toMatchSnapshot('brand');
  });

  it('should close on click', () => {
    const props = {
      show: true,
      user: { session: { username: 'test' } },
      onClose: jest.fn()
    };

    const component = mount(<AboutModal {...props} />);

    component.find('button[aria-label="Close Dialog"]').simulate('click');
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});

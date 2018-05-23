import React from 'react';
import { shallow } from 'enzyme';
import MastheadOptions from '../mastheadOptions';

describe('MastheadOptions Component', () => {
  it('should render', () => {
    const props = {
      user: { username: 'Admin' },
      logoutUser: () => {},
      showAboutModal: () => {}
    };

    const component = shallow(<MastheadOptions {...props} />);

    expect(component).toMatchSnapshot();
  });
});

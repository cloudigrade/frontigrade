import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { ConnectedAccountViewInstanceGraphs } from '../accountViewInstanceGraphs';

describe('AccountImagesViewInstanceGraphs Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ account: { instances: {} } });
    const props = {
      filter: { query: {} }
    };
    const component = shallow(<ConnectedAccountViewInstanceGraphs {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });
});

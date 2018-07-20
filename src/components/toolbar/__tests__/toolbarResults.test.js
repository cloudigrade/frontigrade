import React from 'react';
import { mount } from 'enzyme';
import ToolbarResults from '../toolbarResults';

describe('ToolbarResults Component', () => {
  it('should render a basic component', () => {
    const props = {};

    // ToDo: research issue enzyme and fragments, workaround wrap it with another element
    const component = mount(
      <div>
        <ToolbarResults {...props} />
      </div>
    );

    expect(component.render()).toMatchSnapshot('basic');
  });

  it('should apply active filters', () => {
    const props = {
      activeFilters: [
        {
          field: 'lorem',
          label: 'ipsum',
          value: 'dolor'
        }
      ]
    };

    const component = mount(
      <div>
        <ToolbarResults {...props} />
      </div>
    );

    expect(component.render()).toMatchSnapshot('active filters');
  });
});

import React from 'react';
import { mount } from 'enzyme';
import ToolbarFilter from '../toolbarFilter';

describe('ToolbarFilter Component', () => {
  it('should render a basic component', () => {
    const filterFields = [];

    const props = {
      filterFields,
      filterField: undefined
    };

    const component = mount(<ToolbarFilter {...props} />);
    expect(component).toMatchSnapshot('basic, no fields');

    component.setProps({
      filterFields: [
        {
          id: 'lorem',
          title: 'Lorem',
          placeholder: 'Filter by lorem type',
          filterType: 'text'
        }
      ],
      filterField: filterFields[0]
    });
    expect(component).toMatchSnapshot('basic, one field');
  });

  it('should render multiple filter fields', () => {
    const filterFields = [
      {
        id: 'lorem',
        title: 'Lorem',
        placeholder: 'Filter by lorem type',
        filterType: 'text'
      },
      {
        id: 'ipsum',
        title: 'Ipsum',
        placeholder: 'Filter by ipsum type',
        filterType: 'select',
        filterValues: [{ title: 'dolor', id: 'dolor' }, { title: 'sit', id: 'sit' }]
      }
    ];

    const props = {
      filterFields,
      filterField: filterFields[0]
    };

    const component = mount(<ToolbarFilter {...props} />);
    expect(component.render()).toMatchSnapshot('multiple filters, text');

    component.setProps({ filterField: filterFields[1] });
    expect(component.render()).toMatchSnapshot('multiple filters, select');
  });
});

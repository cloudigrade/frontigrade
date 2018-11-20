import React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from 'patternfly-react';
import DropdownSelect from '../dropdownSelect';

describe('DropdownSelect Component', () => {
  it('should render', () => {
    const props = {
      id: 'test',
      options: [{ title: 'lorem', value: 'ipsum' }, { title: 'hello', value: 'world' }]
    };

    const component = mount(
      <DropdownSelect {...props}>
        <MenuItem eventKey="ipsum">Lorem ipsum</MenuItem>
      </DropdownSelect>
    );

    expect(component.render()).toMatchSnapshot('basic dropdown');

    component.setProps({
      selectValue: ['world', 'ipsum'],
      multiselect: true
    });

    expect(component.render()).toMatchSnapshot('multiselect dropdown');
  });
});

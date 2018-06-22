import React from 'react';
import { mount } from 'enzyme';
import { AccountWizardStepThree } from '../accountWizardStepThree';

describe('AccountWizardStepThree Component', () => {
  it('should render', () => {
    const props = {};
    const component = mount(<AccountWizardStepThree {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

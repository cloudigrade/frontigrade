import React from 'react';
import { mount } from 'enzyme';
import { AccountWizardStepTwo } from '../accountWizardStepTwo';

describe('AccountWizardStepTwo Component', () => {
  it('should render', () => {
    const props = {};
    const component = mount(<AccountWizardStepTwo {...props} />);

    expect(component.render()).toMatchSnapshot();
  });
});

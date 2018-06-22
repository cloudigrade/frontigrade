import React from 'react';
import { mount } from 'enzyme';
import { AccountWizardStepRole } from '../accountWizardStepRole';

describe('AccountWizardStepRole Component', () => {
  it('should render a wizard policy step', () => {
    const props = {
      configuration: {
        aws_account_id: '123'
      }
    };
    const component = mount(<AccountWizardStepRole {...props} />);

    expect(component.render()).toMatchSnapshot('unconnected');
  });
});

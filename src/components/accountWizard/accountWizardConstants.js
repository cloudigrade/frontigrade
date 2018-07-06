import React from 'react';
import AccountWizardStepPolicy from './accountWizardStepPolicy';
import AccountWizardStepRole from './accountWizardStepRole';
import AccountWizardStepArn from './accountWizardStepArn';
import AccountWizardStepResults from './accountWizardStepResults';

const addAccountWizardSteps = [
  {
    step: 1,
    label: '1',
    title: 'Policy',
    page: <AccountWizardStepPolicy />,
    subSteps: []
  },
  {
    step: 2,
    label: '2',
    title: 'Role',
    page: <AccountWizardStepRole />,
    subSteps: []
  },
  {
    step: 3,
    label: '3',
    title: 'ARN',
    page: <AccountWizardStepArn />,
    subSteps: []
  },
  {
    step: 4,
    label: '4',
    title: 'Results',
    page: <AccountWizardStepResults />,
    subSteps: []
  }
];

const editAccountWizardSteps = [];

export { addAccountWizardSteps, editAccountWizardSteps };

import React from 'react';
import AccountWizardStepPolicy from './accountWizardStepPolicy';
import AccountWizardStepRole from './accountWizardStepRole';
import AccountWizardStepThree from './accountWizardStepThree';

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
    page: <AccountWizardStepThree />,
    subSteps: []
  }
];

const editAccountWizardSteps = [];

export { addAccountWizardSteps, editAccountWizardSteps };
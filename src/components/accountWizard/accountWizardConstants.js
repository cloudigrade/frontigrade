import React from 'react';
import AccountWizardStepOne from './accountWizardStepOne';
import AccountWizardStepTwo from './accountWizardStepTwo';
import AccountWizardStepThree from './accountWizardStepThree';

const awsIdentity = `{
  "Version": "2012-10-07",
  "Statement": [
    {
      "lorem": "ipsum"
    },
    {
      "dolar": "dolar"
    }
  ]
}`;

const addAccountWizardSteps = [
  {
    step: 1,
    label: '1',
    title: 'Policy',
    page: <AccountWizardStepOne identity={awsIdentity} />,
    subSteps: []
  },
  {
    step: 2,
    label: '2',
    title: 'Role',
    page: <AccountWizardStepTwo />,
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

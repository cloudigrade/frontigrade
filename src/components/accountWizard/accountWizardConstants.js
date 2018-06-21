import React from 'react';
import { awsPolicySetup } from '../../common/configuration.json';
import helpers from '../../common/helpers';
import AccountWizardStepOne from './accountWizardStepOne';
import AccountWizardStepTwo from './accountWizardStepTwo';
import AccountWizardStepThree from './accountWizardStepThree';

const addAccountWizardSteps = [
  {
    step: 1,
    label: '1',
    title: 'Policy',
    page: <AccountWizardStepOne policySetupConfig={helpers.prettyPrintJson(awsPolicySetup)} />,
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

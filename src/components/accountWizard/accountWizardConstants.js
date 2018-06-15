import React from 'react';

const addAccountWizardSteps = [
  {
    step: 1,
    label: '1',
    title: 'Policy',
    page: <span>Policy</span>,
    subSteps: []
  },
  {
    step: 2,
    label: '2',
    title: 'Role',
    page: <span>Role</span>,
    subSteps: []
  },
  {
    step: 3,
    label: '3',
    title: 'ARN',
    page: <span>ARN</span>,
    subSteps: []
  },
  {
    step: 4,
    label: '4',
    title: 'Connect',
    page: <span>Connect</span>,
    subSteps: []
  }
];

const editAccountWizardSteps = [];

export { addAccountWizardSteps, editAccountWizardSteps };

import React from 'react';
import PropTypes from 'prop-types';
import CopyField from '../copyField/copyField';

const AccountWizardStepOne = ({ identity }) => (
  <ul>
    <li>
      Create a new policy in the AWS <a href="#test">Identity and Access Management</a>
    </li>
    <li>
      <p>In the JSON editor replace the contents with:</p>
      <CopyField multiline value={identity} />
    </li>
    <li>
      Click <strong>Review policy</strong>.
    </li>
    <li>
      Name the policy <strong>Red-Hat-Cloud-Meter-policy</strong> and click <strong>Create policy</strong>.
    </li>
  </ul>
);

AccountWizardStepOne.propTypes = {
  identity: PropTypes.string.isRequired
};

export { AccountWizardStepOne as default, AccountWizardStepOne };

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';
import helpers from '../../common/helpers';

const FormField = ({ children, colLabel, colField, error, errorMessage, id, label, ...props }) => {
  const setId = id || helpers.generateId();

  return (
    <Form.FormGroup controlId={setId} validationState={error ? 'error' : null} {...props}>
      <Grid.Col componentClass={Form.ControlLabel} sm={colLabel}>
        {label}
      </Grid.Col>
      <Grid.Col sm={colField}>
        {children}
        {error && <Form.HelpBlock>{errorMessage}</Form.HelpBlock>}
      </Grid.Col>
    </Form.FormGroup>
  );
};

const isEmpty = value => !value || value === '';

const fieldValidation = {
  isEmpty
};

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  colLabel: PropTypes.number,
  colField: PropTypes.number,
  error: PropTypes.string,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node
};

FormField.defaultProps = {
  colLabel: 3,
  colField: 9,
  error: null,
  errorMessage: null,
  id: null,
  label: null
};

export { FormField as default, FormField, fieldValidation };

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Wizard } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux/';
import { addAccountWizardSteps, editAccountWizardSteps } from './accountWizardConstants';

class AccountWizard extends React.Component {
  state = {
    activeStepIndex: 0
  };

  onCancel = () => {
    const { fulfilled, error } = this.props;

    const closeWizard = () =>
      this.setState({ activeStepIndex: 0 }, () => {
        store.dispatch({
          type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
        });

        store.dispatch({
          type: reduxTypes.account.UPDATE_ACCOUNT_HIDE
        });
      });

    if (fulfilled || error) {
      closeWizard();
    } else {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
        title: 'Cancel Add Account',
        heading: 'Are you sure you want to exit this wizard?',
        body: 'Exiting this wizard will cancel adding an account.',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        onConfirm: closeWizard
      });
    }
  };

  onNext = () => {
    const { activeStepIndex } = this.state;
    const { edit, editSteps, addSteps } = this.props;
    const wizardStepsLength = edit ? editSteps.length : addSteps.length;

    if (activeStepIndex < wizardStepsLength - 1) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  };

  onBack = () => {
    const { activeStepIndex } = this.state;

    if (activeStepIndex >= 1) {
      this.setState({ activeStepIndex: activeStepIndex - 1 });
    }
  };

  onSubmit = () => {};

  onStep = () => {
    // ToDo: wizard step map/breadcrumb/trail click, or leave disabled
  };

  renderWizardSteps() {
    const { edit, addSteps, editSteps } = this.props;
    const { activeStepIndex } = this.state;
    const wizardSteps = edit ? editSteps : addSteps;
    const activeStep = wizardSteps[activeStepIndex];

    return wizardSteps.map((step, stepIndex) => (
      <Wizard.Step
        key={step.title}
        stepIndex={stepIndex}
        step={step.step}
        label={step.label}
        title={step.title}
        activeStep={activeStep && activeStep.step}
      />
    ));
  }

  render() {
    const { show, edit, addSteps, editSteps, stepPolicyValid, stepRoleValid, stepThreeValid } = this.props;
    const { activeStepIndex } = this.state;
    const wizardSteps = edit ? editSteps : addSteps;

    return (
      <Wizard show={show}>
        <Wizard.Header onClose={this.onCancel} title={edit ? 'Edit Account' : 'Add Account'} />
        <Wizard.Body>
          <Wizard.Steps steps={this.renderWizardSteps()} />
          <Wizard.Row>
            <Wizard.Main>
              {wizardSteps.map((step, stepIndex) => (
                <Wizard.Contents key={step.title} stepIndex={stepIndex} activeStepIndex={activeStepIndex}>
                  {wizardSteps[stepIndex].page}
                </Wizard.Contents>
              ))}
            </Wizard.Main>
          </Wizard.Row>
        </Wizard.Body>
        <Wizard.Footer>
          <Button bsStyle="default" className="btn-cancel" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle="default" disabled={activeStepIndex === 0} onClick={this.onBack}>
            <Icon type="fa" name="angle-left" />Back
          </Button>
          {activeStepIndex < wizardSteps.length - 1 && (
            <Button
              bsStyle="primary"
              disabled={(activeStepIndex === 0 && !stepPolicyValid) || (activeStepIndex === 1 && !stepRoleValid)}
              onClick={this.onNext}
            >
              Next<Icon type="fa" name="angle-right" />
            </Button>
          )}
          {activeStepIndex === wizardSteps.length - 1 && (
            <Button bsStyle="primary" disabled={!stepThreeValid} onClick={this.onSubmit}>
              Add
            </Button>
          )}
        </Wizard.Footer>
      </Wizard>
    );
  }
}

AccountWizard.propTypes = {
  show: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  error: PropTypes.bool,
  fulfilled: PropTypes.bool,
  stepPolicyValid: PropTypes.bool,
  stepRoleValid: PropTypes.bool,
  stepThreeValid: PropTypes.bool,
  addSteps: PropTypes.array,
  editSteps: PropTypes.array
};

AccountWizard.defaultProps = {
  edit: false,
  error: false,
  fulfilled: false,
  stepPolicyValid: false,
  stepRoleValid: false,
  stepThreeValid: false,
  addSteps: addAccountWizardSteps,
  editSteps: editAccountWizardSteps
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizard = connect(mapStateToProps)(AccountWizard);

export { ConnectedAccountWizard as default, ConnectedAccountWizard, AccountWizard };

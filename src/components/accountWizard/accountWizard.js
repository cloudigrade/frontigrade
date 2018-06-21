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

    const closeWizard = () => {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
      });

      store.dispatch({
        type: reduxTypes.account.UPDATE_ACCOUNT_HIDE
      });
    };

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

  onNext = () => {};

  onBack = () => {};

  onSubmit = () => {};

  onStep = () => {
    // ToDo: wizard step map/breadcrumb/trail click, or leave disabled
  };

  renderWizardSteps() {
    const { edit } = this.props;
    const { activeStepIndex } = this.state;
    const wizardSteps = edit ? editAccountWizardSteps : addAccountWizardSteps;
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
    const { show, edit, stepOneValid, stepTwoValid } = this.props;
    const { activeStepIndex } = this.state;
    const wizardSteps = edit ? editAccountWizardSteps : addAccountWizardSteps;

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
          <Button
            bsStyle="default"
            className="btn-cancel"
            disabled={activeStepIndex === wizardSteps.length - 1}
            onClick={this.onCancel}
          >
            Cancel
          </Button>
          <Button
            bsStyle="default"
            disabled={activeStepIndex === 0 || activeStepIndex === wizardSteps.length - 1}
            onClick={this.onBack}
          >
            <Icon type="fa" name="angle-left" />Back
          </Button>
          {activeStepIndex < wizardSteps.length - 2 && (
            <Button bsStyle="primary" disabled={!stepOneValid} onClick={this.onNext}>
              Next<Icon type="fa" name="angle-right" />
            </Button>
          )}
          {activeStepIndex === wizardSteps.length - 2 && (
            <Button bsStyle="primary" disabled={!stepTwoValid} onClick={this.onSubmit}>
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
  stepOneValid: PropTypes.bool,
  stepTwoValid: PropTypes.bool,
  stepThreeValid: PropTypes.bool
};

AccountWizard.defaultProps = {
  edit: false,
  error: false,
  fulfilled: false,
  stepOneValid: false,
  stepTwoValid: false,
  stepThreeValid: false
};

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizard = connect(mapStateToProps)(AccountWizard);

export { ConnectedAccountWizard as default, ConnectedAccountWizard, AccountWizard };

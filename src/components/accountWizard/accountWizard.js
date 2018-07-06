import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Wizard } from 'patternfly-react';
import helpers from '../../common/helpers';
import { connect, reduxActions, reduxTypes, store } from '../../redux/';
import { addAccountWizardSteps, editAccountWizardSteps } from './accountWizardConstants';
import apiTypes from '../../constants/apiConstants';

class AccountWizard extends React.Component {
  state = {
    activeStepIndex: 0
  };

  // ToDo: if onCancel allowed to fire in "pending" state, need to query if its supposed to cancel the request or continue. Currently it continues
  onCancel = () => {
    const { edit, fulfilled, pending } = this.props;

    const closeWizard = () =>
      this.setState({ activeStepIndex: 0 }, () => {
        store.dispatch({
          type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
        });

        store.dispatch({
          type: reduxTypes.account.UPDATE_ACCOUNT_HIDE
        });
      });

    if (fulfilled) {
      closeWizard();
    } else if (pending) {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
        title: `Exit Wizard`,
        heading: 'Are you sure you want to exit this wizard?',
        body: `The wizard is in a pending state and will continue ${edit ? 'updating' : 'adding'} an account.`,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
        onConfirm: closeWizard
      });
    } else {
      store.dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
        title: `Cancel ${edit ? 'Update' : 'Add'} Account`,
        heading: 'Are you sure you want to exit this wizard?',
        body: `Exiting this wizard will cancel ${edit ? 'updating' : 'adding'} an account.`,
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

  onSubmit = () => {
    const { account, addAccount, stepPolicyValid, stepRoleValid, stepArnValid } = this.props;
    const { activeStepIndex } = this.state;

    if (stepPolicyValid && stepRoleValid && stepArnValid) {
      this.setState({ activeStepIndex: activeStepIndex + 1 }, () =>
        addAccount({ ...account }).then(
          () => {
            if (!this.props.show) {
              store.dispatch({
                type: reduxTypes.toastNotifications.TOAST_ADD,
                alertType: 'success',
                message: (
                  <span>
                    Account <strong>{account[apiTypes.API_ACCOUNT_NAME]}</strong> was{' '}
                    {this.props.edit ? 'updated' : 'created'}
                  </span>
                )
              });
            }
          },
          () => {
            if (!this.props.show) {
              store.dispatch({
                type: reduxTypes.toastNotifications.TOAST_ADD,
                alertType: 'error',
                header: `Error ${this.props.edit ? 'Updating' : 'Creating'} Account`,
                message: `${this.props.errorMessage}`
              });
            }
          }
        )
      );
    }
  };

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
    const {
      error,
      pending,
      fulfilled,
      show,
      edit,
      addSteps,
      editSteps,
      stepPolicyValid,
      stepRoleValid,
      stepArnValid
    } = this.props;
    const { activeStepIndex } = this.state;
    const wizardSteps = edit ? editSteps : addSteps;

    if (!show) {
      return null;
    }

    // ToDo: Open PF-React PR for passing a namespaced className onto the Wizard parent element for sizing, currently using "wizard-pf" the default
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
          <Button bsStyle="default" disabled={fulfilled} className="btn-cancel" onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle="default" disabled={activeStepIndex === 0 || pending || fulfilled} onClick={this.onBack}>
            <Icon type="fa" name="angle-left" />Back
          </Button>
          {activeStepIndex < wizardSteps.length - 2 && (
            <Button
              bsStyle="primary"
              disabled={(activeStepIndex === 0 && !stepPolicyValid) || (activeStepIndex === 1 && !stepRoleValid)}
              onClick={this.onNext}
            >
              Next<Icon type="fa" name="angle-right" />
            </Button>
          )}
          {activeStepIndex === wizardSteps.length - 2 && (
            <Button bsStyle="primary" disabled={!stepArnValid || pending} onClick={this.onSubmit}>
              {edit ? 'Update' : 'Add'}
            </Button>
          )}
          {activeStepIndex === wizardSteps.length - 1 && (
            <Button bsStyle="primary" disabled={error || pending} onClick={this.onCancel}>
              Close
            </Button>
          )}
        </Wizard.Footer>
      </Wizard>
    );
  }
}

AccountWizard.propTypes = {
  account: PropTypes.object,
  addAccount: PropTypes.func,
  addSteps: PropTypes.array,
  edit: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fulfilled: PropTypes.bool,
  pending: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  stepPolicyValid: PropTypes.bool,
  stepRoleValid: PropTypes.bool,
  stepArnValid: PropTypes.bool,
  editSteps: PropTypes.array
};

AccountWizard.defaultProps = {
  account: {},
  addAccount: helpers.noop,
  addSteps: addAccountWizardSteps,
  edit: false,
  error: false,
  errorMessage: null,
  fulfilled: false,
  pending: false,
  stepPolicyValid: false,
  stepRoleValid: false,
  stepArnValid: false,
  editSteps: editAccountWizardSteps
};

const mapDispatchToProps = dispatch => ({
  addAccount: data => dispatch(reduxActions.account.addAccount(data))
});

const mapStateToProps = state => ({ ...state.accountWizard });

const ConnectedAccountWizard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWizard);

export { ConnectedAccountWizard as default, ConnectedAccountWizard, AccountWizard };

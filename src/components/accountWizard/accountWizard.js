import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Spinner, Wizard } from 'patternfly-react';
import helpers from '../../common/helpers';
import { connect, reduxActions, reduxTypes, store } from '../../redux/';
import { addAccountWizardSteps, editAccountWizardSteps } from './accountWizardConstants';

class AccountWizard extends React.Component {
  state = {
    activeStepIndex: 0
  };

  // ToDo: if onCancel allowed to fire in "pending" state for "adding an account" need to add in a new action.
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

  onSubmit = () => {
    const { account, addAccount, stepPolicyValid, stepRoleValid, stepArnValid } = this.props;

    if (stepPolicyValid && stepRoleValid && stepArnValid) {
      addAccount(account)
        .then(
          () => {
            // ToDo: submit account: add API response success
          },
          () => {
            // ToDo: submit account: add API response error handling
          }
        )
        .finally(() => {
          // ToDo: submit account: add final wizard resets
        });
    }
  };

  onStep = () => {
    // ToDo: wizard step map/breadcrumb/trail click, or leave disabled
  };

  renderError() {
    const { edit, errorMessage } = this.props;

    return (
      <div className="wizard-pf-complete blank-slate-pf">
        <div className="wizard-pf-success-icon">
          <span className="pficon pficon-error-circle-o" />
        </div>
        <h3 className="blank-slate-pf-main-action">Error {edit ? 'Updating' : 'Creating'} Account</h3>
        <p className="blank-slate-pf-secondary-action">{errorMessage}</p>
      </div>
    );
  }

  renderFulfilled() {
    const { account, edit } = this.props;

    return (
      <div className="wizard-pf-complete blank-slate-pf">
        <div className="wizard-pf-success-icon">
          <span className="glyphicon glyphicon-ok-circle" />
        </div>
        <h3 className="blank-slate-pf-main-action">
          <strong>{account.accountName}</strong> was {edit ? 'updated' : 'created'}.
        </h3>
      </div>
    );
  }

  renderPending() {
    const { edit } = this.props;

    return (
      <div className="wizard-pf-process blank-slate-pf">
        <Spinner loading size="lg" className="blank-slate-pf-icon" />
        <h3 className="blank-slate-pf-main-action">{edit ? 'Updating' : 'Creating'} Account...</h3>
        <p className="blank-slate-pf-secondary-action">
          Please wait while account is being {edit ? 'updated' : 'created'}.
        </p>
      </div>
    );
  }

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

    // ToDo: Open PF-React PR for passing a namespaced className onto the Wizard parent element for sizing, currently using "wizard-pf" the default
    return (
      <Wizard show={show}>
        <Wizard.Header onClose={this.onCancel} title={edit ? 'Edit Account' : 'Add Account'} />
        <Wizard.Body>
          <Wizard.Steps steps={this.renderWizardSteps()} />
          <Wizard.Row>
            <Wizard.Main>
              {!error &&
                !pending &&
                !fulfilled &&
                wizardSteps.map((step, stepIndex) => (
                  <Wizard.Contents key={step.title} stepIndex={stepIndex} activeStepIndex={activeStepIndex}>
                    {wizardSteps[stepIndex].page}
                  </Wizard.Contents>
                ))}
              {error && this.renderError()}
              {fulfilled && this.renderFulfilled()}
              {pending && this.renderPending()}
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
          {!error &&
            !pending &&
            !fulfilled &&
            activeStepIndex < wizardSteps.length - 1 && (
              <Button
                bsStyle="primary"
                disabled={(activeStepIndex === 0 && !stepPolicyValid) || (activeStepIndex === 1 && !stepRoleValid)}
                onClick={this.onNext}
              >
                Next<Icon type="fa" name="angle-right" />
              </Button>
            )}
          {!error &&
            !fulfilled &&
            activeStepIndex === wizardSteps.length - 1 && (
              <Button bsStyle="primary" disabled={!stepArnValid || pending} onClick={this.onSubmit}>
                {edit ? 'Update' : 'Add'}
              </Button>
            )}
          {(error || fulfilled) && (
            <Button bsStyle="primary" disabled={pending} onClick={this.onCancel}>
              Close
            </Button>
          )}
        </Wizard.Footer>
      </Wizard>
    );
  }
}

AccountWizard.propTypes = {
  account: PropTypes.shape({
    accountName: PropTypes.string,
    arn: PropTypes.string
  }),
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

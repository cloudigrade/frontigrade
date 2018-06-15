import React from 'react';
import { Button, EmptyState, Grid, Row } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux';

class AccountView extends React.Component {
  showAccountWizard = () => {
    store.dispatch({
      type: reduxTypes.account.ADD_ACCOUNT_SHOW
    });
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <EmptyState className="full-page-blank-slate">
            <EmptyState.Icon />
            <EmptyState.Title>Welcome to Cloud Meter</EmptyState.Title>
            <EmptyState.Info>Add an AWS account to monitor usage.</EmptyState.Info>
            <EmptyState.Action>
              <Button bsStyle="primary" bsSize="large" onClick={this.showAccountWizard}>
                Add Account
              </Button>
            </EmptyState.Action>
          </EmptyState>
        </Row>
      </Grid>
    );
  }
}

AccountView.propTypes = {};

AccountView.defaultProps = {};

const mapStateToProps = state => ({ account: state.account });

const ConnectedAccountView = connect(mapStateToProps)(AccountView);

export { ConnectedAccountView as default, ConnectedAccountView, AccountView };

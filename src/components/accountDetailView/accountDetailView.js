import React from 'react';
import { Button, EmptyState, Grid, Row } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux';

class AccountDetailView extends React.Component {
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
            <EmptyState.Title>No Images Available</EmptyState.Title>
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

AccountDetailView.propTypes = {};

AccountDetailView.defaultProps = {};

const mapStateToProps = state => ({ detail: state.detail });

const ConnectedAccountDetailView = connect(mapStateToProps)(AccountDetailView);

export { ConnectedAccountDetailView as default, ConnectedAccountDetailView, AccountDetailView };

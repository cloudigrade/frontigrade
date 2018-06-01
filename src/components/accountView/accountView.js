import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState, Grid, Row } from 'patternfly-react';
import { reduxTypes, store } from '../../redux';

const AccountView = ({ primaryClick }) => {
  const handleClick = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'success',
      message: <span>Success dolor sit amet.</span>
    });
  };

  return (
    <Grid fluid>
      <Row>
        <EmptyState className="full-page-blank-slate">
          <EmptyState.Icon />
          <EmptyState.Title>Lorem Ipsum</EmptyState.Title>
          <EmptyState.Info>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo purus a sem ornare ullamcorper. Duis
            sed mi mi. Aenean risus ante, hendrerit sed cursus nec, pharetra eu nisi. Nulla in dui id leo dapibus
            malesuada eu placerat lacus. Phasellus pulvinar magna vel mattis commodo.
          </EmptyState.Info>
          <EmptyState.Action>
            <Button bsStyle="primary" bsSize="large" onClick={primaryClick || handleClick}>
              Dolor sit amet
            </Button>
          </EmptyState.Action>
        </EmptyState>
      </Row>
    </Grid>
  );
};

AccountView.propTypes = {
  primaryClick: PropTypes.func
};

AccountView.defaultProps = {
  primaryClick: null
};

export default AccountView;

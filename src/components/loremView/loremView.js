import React from 'react';
import { Button, EmptyState, Grid, Row } from 'patternfly-react';
import { reduxTypes, store } from '../../redux';

class LoremView extends React.Component {
  handleClick = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'success',
      message: <span>Success dolor sit amet.</span>
    });
  };

  render() {
    return (
      <Grid fluid>
        <Row>
          <EmptyState className="full-page-blank-slate">
            <EmptyState.Icon />
            <EmptyState.Title>Lorem Ipsum</EmptyState.Title>
            <EmptyState.Info>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo purus a sem ornare ullamcorper.
              Duis sed mi mi. Aenean risus ante, hendrerit sed cursus nec, pharetra eu nisi. Nulla in dui id leo dapibus
              malesuada eu placerat lacus. Phasellus pulvinar magna vel mattis commodo.
            </EmptyState.Info>
            <EmptyState.Action>
              <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>
                Dolor sit amet
              </Button>
            </EmptyState.Action>
          </EmptyState>
        </Row>
      </Grid>
    );
  }
}

export default LoremView;

import * as accountActions from './accountActions';
import * as userActions from './userActions';

const actions = {
  account: accountActions,
  user: userActions
};

const reduxActions = { ...actions };

export { reduxActions as default, reduxActions, accountActions, userActions };

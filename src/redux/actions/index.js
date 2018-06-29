import * as accountActions from './accountActions';
import * as systemConfigActions from './systemConfigActions';
import * as userActions from './userActions';

const actions = {
  account: accountActions,
  systemConfig: systemConfigActions,
  user: userActions
};

const reduxActions = { ...actions };

export { reduxActions as default, reduxActions, accountActions, systemConfigActions, userActions };

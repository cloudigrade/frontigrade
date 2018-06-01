import AccountView from '../accountView/accountView';

/**
 * Return the application base directory.
 * @type {string}
 */
const baseName = '/';

/**
 * Return array of objects that describe navigation and views.
 * @return {array}
 */
const routes = () => [
  {
    iconClass: 'pficon pficon-orders',
    title: 'Accounts',
    to: '/accounts',
    redirect: true,
    component: AccountView
  }
];

export { routes as default, baseName, routes };

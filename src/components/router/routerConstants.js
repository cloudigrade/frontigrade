import AccountView from '../accountView/accountView';
import AccountImagesView from '../accountImagesView/accountImagesView';

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
    component: AccountView,
    exact: true
  },
  {
    iconClass: 'pficon pficon-cluster',
    title: 'Images Detail',
    to: '/accounts/:accountId',
    component: AccountImagesView,
    displayHidden: true
  }
];

export { routes as default, baseName, routes };

import LoremView from '../loremView/loremView';

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
    iconClass: 'fa fa-crosshairs',
    title: 'Usage',
    to: '/usage',
    redirect: true,
    component: LoremView
  },
  {
    iconClass: 'pficon pficon-orders',
    title: 'Accounts',
    to: '/accounts',
    component: LoremView
  },
  {
    iconClass: 'fa fa-id-card',
    title: 'Users',
    to: '/users',
    component: LoremView
  }
];

export { routes as default, baseName, routes };

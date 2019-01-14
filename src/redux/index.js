import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import store from './store';
import reduxActions from './actions';
import reduxMiddleware from './middleware';
import reduxReducers from './reducers';
import reduxSelectors from './selectors';
import reduxTypes from './constants';

const connectTranslate = (mapStateToProps, mapDispatchToProps) => component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate()(component));

const connectRouterTranslate = (mapStateToProps, mapDispatchToProps) => component =>
  withRouter(connectTranslate(mapStateToProps, mapDispatchToProps)(component));

const connectRouter = (mapStateToProps, mapDispatchToProps) => component =>
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(component)
  );

export {
  connect,
  connectTranslate,
  connectRouter,
  connectRouterTranslate,
  reduxActions,
  reduxMiddleware,
  reduxReducers,
  reduxSelectors,
  reduxTypes,
  store
};

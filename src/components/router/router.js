import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from './routerConstants';

class Router extends React.Component {
  static renderRoutes() {
    let redirectRoot = null;

    return {
      renderRoutes: routes().map(item => {
        if (item.redirect === true) {
          redirectRoot = <Redirect from="/" to={item.to} />;
        }

        return <Route key={item.to} path={item.to} component={item.component} />;
      }),
      redirectRoot
    };
  }

  render() {
    const { renderRoutes, redirectRoot } = Router.renderRoutes();

    return (
      <div className="cloudmeter-content">
        <Switch>
          {renderRoutes}
          {redirectRoot}
        </Switch>
      </div>
    );
  }
}

export { Router, routes };

export default Router;

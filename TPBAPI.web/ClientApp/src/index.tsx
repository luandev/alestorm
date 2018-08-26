import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as RoutesModule from 'src/routes';

import { createBrowserHistory } from 'history';
import { IApplicationState } from 'src/store';
import { WebSocketMiddleware } from 'src/store/socket-create-middleware';
import configureStore from 'src/store/configure-store';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

/* Global CSS imports */
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css/normalize.css';


// Create browser history to use in the Redux store
const baseUrl       = (document.getElementsByTagName('base')[0] || {} as HTMLBaseElement).href;
const history       = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState  = (window as any).initialReduxState as IApplicationState;
const store         = configureStore(history, initialState);
let routes          = RoutesModule.routes;

function renderApp() {
    WebSocketMiddleware.getInstance().CreateMiddleware(store, () => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <ConnectedRouter history={history} children={routes} />
                </Provider>
            </AppContainer>,
            document.getElementById('root') as HTMLElement
        );
    });
}

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}

renderApp();
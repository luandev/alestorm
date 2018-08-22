import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import * as RoutesModule from './routes';
import configureStore from './Store/ConfigureStore';
import { WebSocketMiddleware } from './Store/SocketCreateMiddleware';
import { IApplicationState }  from './Store/Store';

/* Global CSS imports */
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';

let routes = RoutesModule.routes;

// Create browser history to use in the Redux store
const baseUrl = (document.getElementsByTagName('base')[0]|| {} as HTMLBaseElement).href;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as IApplicationState;
const store = configureStore(history, initialState);

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
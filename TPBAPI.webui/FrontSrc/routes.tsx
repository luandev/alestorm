import * as React from 'react';
import { Route } from 'react-router-dom';

import * as MovieView from 'FrontSrc/Components/MovieView/MovieView';
import * as Landing from 'FrontSrc/Components/Landing/Landing';

import { Layout } from './Components/Layout/Layout';
import App from './Routes/App/App';


export const routes = (
    <Layout>
        <App />
        <Route path="/Home" component={Landing.default} />
        <Route path="/Movie/:MovieID?" component={MovieView.default} />
    </Layout>
);

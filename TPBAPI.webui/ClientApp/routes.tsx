import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import * as Movie from './components/Movie';
import * as Landing from './components/Landing';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Home' component={ Landing.default } />
    <Route path='/Movie/ID?' component={ Movie.default } />
</Layout>;

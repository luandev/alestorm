import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'src/components/layout';
import Header from 'src/components/header';
import * as Movies from 'src/components/movies'
import * as Movie from 'src/components/movie'


export const routes = (
	<Layout>
		<Header/>
		<Route exact={true} path="/" component={Movies.default} />
		<Route path="/Movie/:id" component={Movie.default}  />
	</Layout>
);
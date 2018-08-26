import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from 'src/store';
import { RouteComponentProps } from 'react-router-dom';
// import {  Button } from '@blueprintjs/core';
import * as MovieStore from 'src/store/movie';
import { actionCreators } from 'src/store/movie/';

import './movies.css';


type MoviesProps = MovieStore.IMovieStore
    & typeof actionCreators
    & RouteComponentProps<{ gamePK: string }>;

class Movies extends React.Component<MoviesProps, {}> {

    constructor(props: MoviesProps) {
        super(props);
        this.props.Load("");
    }

    public render() {
        

        return <ul>
            {"movies"}
        </ul>;
    }
}

const MoviesComponent = connect((state: IApplicationState) => state.movieStore, MovieStore.actionCreators)(Movies);
export default MoviesComponent;
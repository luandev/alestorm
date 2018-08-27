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

        this.props.Load(this.props.searchQuery);
    }

    public render() {

        return <div className="movies">
            <div className="movies-list">
                {this.props.movies && this.props.movies.map((x, i) =>
                    <div key={i}
                    onClick={(ev:any) => this.props.history.push(`/Movie/${x.id}`)}
                    style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w500/${x.poster_path})` }} 
                    className={`thumb ${this.props.searchIsOpen ? "searching" : ""}`}>
                        <div className="title">{x.title}</div>
                    </div>)}
            </div>
        </div>
    }
}

const MoviesComponent = connect((state: IApplicationState) => state.movieStore, MovieStore.actionCreators)(Movies);
export default MoviesComponent;
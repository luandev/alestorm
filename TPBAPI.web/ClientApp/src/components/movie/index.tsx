
import * as React from 'react';
import { connect } from 'react-redux';
import * as EventView from 'src/store/movie';
import { IApplicationState } from 'src/store';
import { RouteComponentProps } from 'react-router-dom';

import './movie.css';
import { NonIdealState } from '@blueprintjs/core';



type MovieProps =
    & EventView.IMovieStore
    & typeof EventView.actionCreators
    & RouteComponentProps<{ id: string }>;

export class MovieView extends React.Component<MovieProps, {}> {

    constructor(props: MovieProps) {
        super(props);
    }

    public render() {
        this.props.Load();
        const movie = this.props.movies.find(x => x.id === this.param_id())
        if (movie === undefined) {
            return this.renderNotFound(this.props.match.params.id);
        }
        return <h1 className="movie-tab" id="Tab">
            {movie.id}
            {this.props.movie}
        </h1>;
    }
    private param_id(): any {
        const id = parseFloat(this.props.match.params.id);

        if(isNaN(id)){
            return -1;
        }
        else{
            return id;
        }
    }
    private renderNotFound(id: string): JSX.Element {
        return <NonIdealState
            icon={"mobile-video"}
            title="Not Found"
            description={`id ${id} not found`}
        />
    }
}

const MovieViewComp = connect((state: IApplicationState) => state.movieStore, EventView.actionCreators)(MovieView);
export default MovieViewComp;
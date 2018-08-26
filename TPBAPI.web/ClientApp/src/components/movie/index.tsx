
import * as React from 'react';
import { connect } from 'react-redux';
import * as EventView from 'src/store/movie';
import { IApplicationState } from 'src/store';
import { RouteComponentProps } from 'react-router-dom';
import * as moment from 'moment'

import './movie.css';
// import 'flexboxgrid/css/flexboxgrid.css'

import { NonIdealState, Icon, ProgressBar, Intent, Button, ButtonGroup, Popover, Menu, MenuItem } from '@blueprintjs/core';



type MovieProps =
    & EventView.IMovieStore
    & typeof EventView.actionCreators
    & RouteComponentProps<{ id: string }>;

export class MovieView extends React.Component<MovieProps, {}> {

    constructor(props: MovieProps) {
        super(props);
        this.props.Load("");
    }

    public render() {
        const movie = this.props.movies.find(x => x.id === this.param_id())
        const menu = <Menu >
            <MenuItem text="480p" />
            <MenuItem text="720p" />
            <MenuItem text="1080p" />
            <MenuItem text="4k" />
        </Menu>

        if (movie === undefined) {
            return this.renderNotFound(this.props.match.params.id);
        }
        const pirate = movie.isDownloading ? <div>
            <p><ProgressBar animate={true} intent={Intent.PRIMARY} value={movie.downloadProgress} /></p>
            <p><Button intent={Intent.WARNING} text={"Cancel"} /></p>
        </div> : <ButtonGroup >
                <Button intent={Intent.PRIMARY} text={"Dowload"} />
                <Popover content={menu}>
                    <Button rightIcon="arrow-down" icon="layers" text="1080" />
                </Popover>
            </ButtonGroup>

        return <article className="movie" >
            <div style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w500/${movie.backdrop_path})` }} className="movie-bg" />
            <div className="movie-main">
                <div className="poster">
                    <img src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
                    <div className="row">
                        <div><Icon iconSize={20} icon="chat" /> {movie.original_language}</div>
                        <div><Icon iconSize={20} icon="star" />{movie.vote_average}</div>
                        <div><Icon iconSize={20} icon="inbox" />{movie.genres.map(x => x.name).join(", ")}</div>
                        <div><Icon iconSize={20} icon="user" />{movie.popularity}</div>
                    </div>
                </div>
                <div className="desc">
                    <h1 title={moment(movie.release_date).fromNow()} >{movie.title}</h1>
                    <p>{moment(movie.release_date).format('YYYY')} - {movie.runtime} - {movie.status}</p>
                    <p>{movie.overview}</p>
                    {pirate}
                </div>
            </div>

        </article>
    }
    private param_id(): any {
        const id = parseFloat(this.props.match.params.id);

        if (isNaN(id)) {
            return -1;
        }
        else {
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
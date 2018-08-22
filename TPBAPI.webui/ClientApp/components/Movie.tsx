import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState }  from '../store';
import * as MovieStoreState from '../store/MovieStore';

// At runtime, Redux will merge together...
type WeatherForecastProps =  MovieStoreState.MovieStoreState & typeof MovieStoreState.actionCreators & RouteComponentProps<{ MovieID: string }>;
class Movie extends React.Component<WeatherForecastProps, {}> {

    componentWillMount() {
        let MovieQuery = this.props.match.params.MovieID;
        this.props.getMovie(MovieQuery);
    }

    componentWillReceiveProps(nextProps: WeatherForecastProps) {
        let MovieQuery = this.props.match.params.MovieID;
        this.props.getMovie(MovieQuery);
    }

    public render() {
        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        </div>;
    }
}

const BetLinePropsComponent = connect((state: IApplicationState) => state.movieStore, MovieStoreState.actionCreators)(Movie);
export default BetLinePropsComponent;

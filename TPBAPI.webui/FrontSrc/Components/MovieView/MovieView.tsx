import * as React from 'react';
import { connect } from 'react-redux';
import * as EventStore from 'FrontSrc/Store/MovieStore'
import { IApplicationState } from 'FrontSrc/Store/Store';
import { RouteComponentProps } from 'react-router';

export interface IMovieViewProps {
	Id: string;
}

type MovieViewProps = IMovieViewProps & EventStore.IMovieStore & typeof EventStore.actionCreators & RouteComponentProps<{ MovieID: string }>;

class MovieView extends React.Component<MovieViewProps, {}> {
	constructor(props: MovieViewProps) {
		super(props);
	}

	public render() {
		return (
			<div className="row oga-event-default">
				{"Hi!"}
			</div>
		)
	}

	
}

const BetLinePropsComponent = connect((state: IApplicationState) => state.Events, EventStore.actionCreators)(MovieView);
export default BetLinePropsComponent;

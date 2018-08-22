import * as React from 'react';
import { connect } from 'react-redux';
import * as EventStore from 'FrontSrc/Store/MovieStore'
import { IApplicationState } from 'FrontSrc/Store/Store';

export interface ILandingProps {
	Id: string;
}

type LandingProps = ILandingProps & EventStore.IMovieStore & typeof EventStore.actionCreators;

class Landing extends React.Component<LandingProps, {}> {
	constructor(props: LandingProps) {
		super(props);
	}

	public render() {
		return (
			<div className="row oga-event-default">
				{"Hi! a"}
			</div>
		)
	}

	
}

const BetLinePropsComponent = connect((state: IApplicationState) => state.Events, EventStore.actionCreators)(Landing);
export default BetLinePropsComponent;

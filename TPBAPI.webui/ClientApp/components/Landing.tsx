import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState }  from '../store/';
import * as LandingStore from '../store/Landing';

type LandingProps =
    LandingStore.LandingStates
    & typeof LandingStore.actionCreators
    & RouteComponentProps<{}>;

class Landing extends React.Component<LandingProps, {}> {
    public render() {
        return <div>
            <h1>Landing </h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{ this.props.count }</strong></p>

            <button onClick={ () => { this.props.increment() } }>Increment</button>
        </div>;
    }
}

const store = connect((state: IApplicationState) => state.landingStore,  LandingStore.actionCreators )(Landing)
export default store;
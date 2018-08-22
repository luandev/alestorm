
import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import { Navbar, Alignment, Button, InputGroup, Spinner } from '@blueprintjs/core';
import { FormEvent } from 'react';
import { History } from 'history';

// import logo from './logo.svg';
export interface IAppState {
	filter:string
}

export default class App extends React.Component<{},IAppState> {
	/**
	 *
	 */
	constructor(props: any) {
		super(props);

		this.state = { filter: ""};
		
	}
	
	public render() {
		const spinner = <Spinner small={true} />;
		const value = this.state.filter;
		return (

			<div className="App">
				<Navbar>

					<Navbar.Group align={Alignment.LEFT}>
						<Navbar.Heading>qbserver | alestorm</Navbar.Heading>
						<Navbar.Divider />
					</Navbar.Group>
					<Navbar.Group align={Alignment.RIGHT}>

						
						<Link to="/Home">
							<Button minimal={true} icon="home" text="Home" />
						</Link>
						<Navbar.Divider />
						<Route render={({ history}) => (
						<InputGroup
							onFocus={(ev:FormEvent<HTMLElement>) => this.navigate(history, ev)}
							onChange={(ev:FormEvent<HTMLElement>) => this.navigate(history, ev)}
							leftIcon="filter"
							placeholder="Open event..."
							value={value}
							rightElement={spinner} />

						)} />

					</Navbar.Group>
				</Navbar>
			</div>
		);
	}

	private navigate(history:History, ev:FormEvent<HTMLElement>) {
		const val =  (ev.target as HTMLInputElement).value;
		this.setState({filter:val})
		history.push(`/Movie/${val}`);
	}

}

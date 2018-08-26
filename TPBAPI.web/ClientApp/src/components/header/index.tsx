
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

import { Emoji } from 'emoji-mart'

import './header.css';



// import logo from './logo.svg';
export interface IHeaderState {
	filter?: number
}

export default class Header extends React.Component<{}, IHeaderState> {

	constructor(props: any) {
		super(props);

		this.state = { filter: null };
	}

	public render() {

		return (
			<div className="Header">
				<Navbar>
					<Navbar.Group align={Alignment.LEFT}>
						<Navbar.Heading><Emoji emoji="beer" set='emojione' size={16} /> <b>Alestorm</b></Navbar.Heading>
						<Navbar.Divider />
						<Navbar.Heading>"Fuck you, you're a fucking wanker"</Navbar.Heading>
					</Navbar.Group>
					<Navbar.Group align={Alignment.RIGHT}>
						<Navbar.Divider />
						<Link to="/">
							<Button minimal={true} icon="home" text="Home" />
						</Link>
						<Link to="/about">
							<Button minimal={true} icon="info-sign" text="about" />
						</Link>
						
					</Navbar.Group>
				</Navbar>
			</div>
		);
	}
}

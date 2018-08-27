
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
// import * as MovieStore from 'src/store/movie';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
// import { IApplicationState } from 'src/store';
// import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart'

import './header.css';


type HeadProps = RouteComponentProps<{ id: string }>;

export class Header extends React.Component<HeadProps, {}> {

	constructor(props: HeadProps) {
		super(props);
	}

	public render() {

		return (
			<React.Fragment>
				<header>
					<Navbar>
						<Navbar.Group align={Alignment.LEFT}>
							<Navbar.Heading><Emoji emoji="beer" set='emojione' size={16} /> <b>Alestorm</b></Navbar.Heading>
							<Navbar.Divider />
							<Link style={{ marginRight: 5 }} to="/">
								<Button icon="home" />
							</Link>
							<Button style={{ marginRight: 5 }} icon="arrow-left" onClick={(x: any) => this.props.history.goBack()} />
							<Button style={{ marginRight: 5 }} icon="arrow-right" onClick={(x: any) => this.props.history.goForward()} />
						</Navbar.Group>
						<Navbar.Group align={Alignment.RIGHT}>
							<Navbar.Divider />
							{"by XuxuSelvagem"}

						</Navbar.Group>
					</Navbar>
				</header>
				
			</React.Fragment>
		);
	}
}

// const HeaderComp = connect((state: IApplicationState) => state.movieStore, MovieStore.actionCreators)(Header);
// export default HeaderComp;
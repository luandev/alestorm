
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Alignment, Button, MenuItem } from '@blueprintjs/core';
import { Select } from "@blueprintjs/select";
import * as Films from "src/models/films"

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

		const FilmSelect = Select.ofType<Films.IFilm>();
		return (
			<div className="Header">
				<Navbar>
					<Navbar.Group align={Alignment.LEFT}>
						<Navbar.Heading>Movies</Navbar.Heading>
						<Navbar.Divider />
					</Navbar.Group>
					<Navbar.Group align={Alignment.RIGHT}>
						<Navbar.Divider />
						<Link to="/">
							<Button minimal={true} icon="home" text="Home" />
						</Link>
						<FilmSelect
							items={Films.TOP_100_FILMS}
							itemPredicate={Films.filterFilm}
							itemRenderer={Films.renderFilm}
							noResults={<MenuItem disabled={true} text="No results." />}
							onItemSelect={(ev) => console.log(ev)}>
							{/* children become the popover target; render value here */}
							<Button text={Films.TOP_100_FILMS[0].title} rightIcon="double-caret-vertical" />
						</FilmSelect>
					</Navbar.Group>
				</Navbar>
			</div>
		);
	}
}

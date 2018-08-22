import * as React from 'react';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';
import "~@blueprintjs/core/lib/css/blueprint.css";
// import "~@blueprintjs/icons/lib/css/blueprint-icons.css";

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>qbserver | alestorm</Navbar.Heading>
                        <Navbar.Divider />
                        <NavLink exact to={'/'} activeClassName='active'>
                            <Button minimal={true} icon="home" text="Home" />
                        </NavLink>

                        <NavLink to={'/counter'} activeClassName='active'>
                            <Button minimal={true} icon="document" text="Movie" />
                        </NavLink>


                    </Navbar.Group>
                </Navbar>
            </div>
            <div className='row'>
                {this.props.children}
            </div>
        </div>;
    }
}


import * as React from 'react';

export interface ILayoutProps {
	children?: React.ReactNode;
}

export class Layout extends React.Component<ILayoutProps, {}> {
	public render() {
		return (
			<div className="bp3-dark">
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}
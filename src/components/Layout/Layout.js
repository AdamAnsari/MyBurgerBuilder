// import React, { Fragment } from 'react';
import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

	state = {
		showSideDrawer: true,
	}

	sideDraweClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	}

	sideDraweToggleHandler = () => {
		// If you try to add STATE in SETSTATE function it will not work properly
		// this.setState({ showSideDrawer: !this.state.showSideDrawer })

		//Alternately just create a function in setState function
		this.setState((prevState) => {
			return {
				showSideDrawer: !prevState.showSideDrawer
			}
		});
	}

	render() {
		return(
			<Auxiliary>
				<Toolbar drawerToggleClicked={this.sideDraweToggleHandler} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDraweClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxiliary>
		)
	}
}

export default Layout;
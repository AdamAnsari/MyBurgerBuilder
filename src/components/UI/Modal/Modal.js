import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {
	render() {
		return(
			<Auxiliary>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div 
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opcaity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</Auxiliary>
		);
	}
}

// const modal = (props) => {
// 	return(
// 		<Auxiliary>
// 			<Backdrop show={props.show} clicked={props.modalClosed} />
// 			<div 
// 				className={classes.Modal}
// 				style={{
// 					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
// 					opcaity: props.show ? '1' : '0'
// 				}}>
// 				{props.children}
// 			</div>
// 		</Auxiliary>
// 	);
// }

export default modal;
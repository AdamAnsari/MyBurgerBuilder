import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
	render() {
		let ingredient = null;
		switch(this.props.type) {
			case('bread-bottom'): 
				ingredient = <div className={classes.BreadBottom}></div>;
				break;
			case('bread-top'):
				ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.seeds1}></div>
						<div className={classes.seeds1}></div>
					</div>
				)
				break;
			case('meat'): 
				ingredient = <div className={classes.Meat}></div>
				break;
			case("cheese"):
				ingredient = <div className={classes.cheese}></div>
				break;
			case("salad"):
				ingredient = <div className={classes.salad}></div>
				break;
			case("bacon"):
				ingredient = <div className={classes.bacon}></div>
				break;
			default:
				ingredient = null;	
		}
		return ingredient;
	 }
}

BurgerIngredient.proptypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredient;

// const burgerIngredient = (props) => {
	// let ingredient = null;
	// switch(props.type) {
	// 	case('bread-bottom'): 
	// 		ingredient = <div className={classes.BreadBottom}></div>;
	// 		break;
	// 	case('bread-top'):
	// 		ingredient = (
	// 			<div className={classes.BreadTop}>
	// 				<div className={classes.seeds1}></div>
	// 				<div className={classes.seeds1}></div>
	// 			</div>
	// 		)
	// 		break;
	// 	case('meat'): 
	// 		ingredient = <div className={classes.Meat}></div>
	// 		break;
	// 	case("cheese"):
	// 		ingredient = <div className={classes.cheese}></div>
	// 		break;
	// 	case("salad"):
	// 		ingredient = <div className={classes.salad}></div>
	// 		break;
	// 	case("bacon"):
	// 		ingredient = <div className={classes.bacon}></div>
	// 		break;
	// 	default:
	// 		ingredient = null;	
	// }
	// return ingredient;
 // }

 export default burgerIngredient;
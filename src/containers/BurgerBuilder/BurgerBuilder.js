import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	//Older ways to create state
	// constructor(props) {
	// 	super(props);
	// 	this.state = {.........};
	// }

	//Modern way to create states
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0 
		},
		totalPrice: 4,
		puchasable: false,
	}

	updatePurchaseState = (ingredients) => {
		// const ingredients = {
		// 	...this.state.ingredients
		// };
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey]
					})
					.reduce((sum, el) => {
						return sum + el;
					}, 0);

		this.setState({
			purchasable: sum > 0
		});
	} 

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		// console.log(`OldCount: ${oldCount}`);
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		// console.log(updatedIngredients);
		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		// console.log(priceAddition);
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice, 
			ingredients: updatedIngredients
		})

		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		// console.log(`OldCount: ${oldCount}`);
		if(oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1;
		// console.log(updatedCount);
		const updatedIngredients = {
			...this.state.ingredients
		};
		// console.log(updatedIngredients);
		updatedIngredients[type] = updatedCount;

		const priceReduction = INGREDIENT_PRICES[type];
		// console.log(priceReduction);
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceReduction;

		this.setState({
			totalPrice: newPrice, 
			ingredients: updatedIngredients
		})

		this.updatePurchaseState(updatedIngredients);
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return(
			<Auxiliary>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredientHandler} 
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
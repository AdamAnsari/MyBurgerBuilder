import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
		ingredients: null,
		totalPrice: 4,
		puchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		axios.get('/ingredients.json')
			 .then(response => {
			 	this.setState({ ingredients: response.data })
			 })
			 .catch(error => {
			 	this.setState({
			 		error: true
			 	})
			 });
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

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	} 

	purchaseContinueHandler = () => {
		// alert('You Continue!');
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.price,
			customer: {
				name: 'Adam',
				address: {
					street: 'TestStreet 1',
					zipcode: '19198',
					country: 'Test'
				},
				email: 'test@test.test',
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			 .then(response => {
			 	// console.log(response);
			 	this.setState({ loading: false, purchasing: false });
			 })
			 .catch(error => {
			 	// console.log(error);
			 	this.setState({ loading: false, purchasing: false });
			 });
	} 

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		let burger = this.state.error ? <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>Ingredients can't be loaded</p> : <Spinner />; 

		if(this.state.ingredients) {
			burger = (
				<Auxiliary>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						ingredientAdded={this.addIngredientHandler} 
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Auxiliary>
			);
			orderSummary = <OrderSummary 
							ingredients={this.state.ingredients} 
							price={this.state.totalPrice}
							purchaseCanceled={this.purchaseCancelHandler}
							purchaseContinued={this.purchaseContinueHandler} />;
		}

		return(
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
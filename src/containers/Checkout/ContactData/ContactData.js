import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
 
class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault();
		// console.log(this.props.ingredients); 
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
			 	this.setState({ loading: false });
			 	this.props.history.push('/');
			 })
			 .catch(error => {
			 	// console.log(error);
			 	this.setState({ loading: false });
			 });
	}

	render() {
		let form  = (
			<form>
				<input type="text" name="name" placeholder="Your Name" />
				<input type="email" name="email" placeholder="Your Email" />
				<input type="text" name="street" placeholder="Your Street" />
				<input type="text" name="postal" placeholder="Your Postal code" />
				<Button 
				btnType="Success"
				clicked={this.orderHandler}
				>ORDER</Button>
			</form>
		);
		if(this.state.loading) {
			form  = <Spinner />;
		}
		return(
			<div className={classes.ContactData}>
				<h3>Enter Your Contact Data</h3>
				{form}
			</div>
		);
	}
}

export default ContactData
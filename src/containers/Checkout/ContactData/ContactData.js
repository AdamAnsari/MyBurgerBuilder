import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
 
class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		}
	}

	render() {
		return(
			<div className={classes.ContactData}>
				<h3>Enter Your Contact Data</h3>
				<form>
					<input type="text" name="name" placeholder="Your Name" />
					<input type="email" name="email" placeholder="Your Email" />
					<input type="text" name="street" placeholder="Your Street" />
					<input type="text" name="postal" placeholder="Your Postal code" />
					<Button btnType="Success">ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactData
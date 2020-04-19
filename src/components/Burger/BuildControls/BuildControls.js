import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
]

// console.log(controls);

const buildControls = (props) => {
	return(
		<div className={classes.BuildControls}>
			{controls.map(ctrl => (
				<BuildControl 
					key={ctrl.label} 
					label={ctrl.type} 
					added={() => props.ingredientAdded(ctrl.type)}
					removed={() => props.ingredientRemoved(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
		</div>
	);
}

export default buildControls;
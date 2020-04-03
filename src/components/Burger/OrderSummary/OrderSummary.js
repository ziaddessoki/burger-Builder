import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button'


const orderSummary =(props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
    })
    return (
        <Aux>
            <p><strong>Your Order</strong></p>
            <p> U chose the ingredients below:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p> Continue to checkout</p>
            <Button btnType="Danger" clicked={props.orderCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.orderProceed}>Continue</Button>
        </Aux>
    )
};

export default orderSummary
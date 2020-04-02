import React from 'react';
import Aux from '../../../hoc/Aux'


const orderSummary =(props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
    })
    return (
        <Aux>
            <p>Your Order</p>
            <p> U chose the ingredients below:</p>
            <ul>
                {ingredientSummary}
            </ul>
        </Aux>
    )
};

export default orderSummary
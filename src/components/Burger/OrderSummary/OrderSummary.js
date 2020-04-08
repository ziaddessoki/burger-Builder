import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button'

//this can be a functional component doewsmt have to be a class
class OrderSummary extends Component{
    //debugging to make sure the model CMPT dont update till its props changes
    componentWillUpdate(){
        console.log('OS will update')
    }
    render(){

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
        })
        return (
            <Aux>
                <p><strong>Your Order</strong></p>
                <p> U chose the ingredients below:</p>
                <ul>
                    {ingredientSummary}
                </ul>
        <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <p> Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.orderCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.orderProceed}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary
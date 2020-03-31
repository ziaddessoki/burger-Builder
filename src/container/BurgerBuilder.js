import React, { Component } from 'react';

import Aux from '../hoc/Aux'
import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 1,
    cheese: 0.75,
    meat: 2
}

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state= { 
            ingredients:{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },totalPrice: 4
        }
    }

    addIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        const updated = oldCount +1
        const updatedIng ={
            ...this.state.ingredients
        }
        updatedIng[type]= updated
        const priceAdd =INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = priceAdd + oldPrice
        this.setState({totalPrice:newPrice, ingredients:updatedIng})
    }

    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingredient[type];
        const updated = oldCount - 1
    }
    render(){
        return(
            <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
            ingAdd ={this.addIngredientHandler}
            />
            </Aux>
        );
    }

}

export default BurgerBuilder
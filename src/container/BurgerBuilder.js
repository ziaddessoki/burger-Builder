import React, { Component } from 'react';

import Aux from '../hoc/Aux'
import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'

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
            },totalPrice: 4,
            purchasable: false
        }
    }
    updatePurchasable =(ingredients)=>{
        // the parameter is a copy of the update this.state.ingredients
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
        // to turn the arry to single number SUM of all Ingredients
     
        .reduce((sum,el)=>{
            return sum + el;
            // Zero is the starting number
        },0);
        this.setState({purchasable: sum > 0 })
    }

    addIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        const updated = oldCount + 1
        const updatedIng ={
            ...this.state.ingredients
        }
        updatedIng[type]= updated
        const priceAdd =INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = priceAdd + oldPrice
        this.setState({totalPrice:newPrice, ingredients:updatedIng})
        this.updatePurchasable(updatedIng);
    }

    removeIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updated = oldCount - 1
        const updatedIng ={
            ...this.state.ingredients
        }
        updatedIng[type]= updated
        const priceSub =INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice =  oldPrice - priceSub; 
        this.setState({totalPrice:newPrice, ingredients:updatedIng})
        this.updatePurchasable(updatedIng);
    }
    render(){
        const disabledInfo={
            ...this.state.ingredients
        }

        //to disable the less button if type <0
        // {salad:true, bacon:false.....}
        for (let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal />
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingAdd ={this.addIngredientHandler}
                ingRemove={this.removeIngredientHandler}
                disabled ={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}/>
            </Aux>
        );
    }

}

export default BurgerBuilder
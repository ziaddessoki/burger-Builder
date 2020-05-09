import React, { Component } from 'react';

import Aux from '../hoc/Aux'
import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'
import withErrorHandler from '../hoc/withErrorHandler'

import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'


// const INGREDIENT_PRICES ={
//     salad: 0.5,
//     bacon: 1,
//     cheese: 0.75,
//     meat: 2
// }

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state= { 
            // ingredients:null,
            // totalPrice: 4,
            purchasable: false,
            ordered:false,
            loading: false,
            error:false
        }
    }
    componentDidMount () {
        // console.log(this.props)
        // axios.get('https://burgerbuilder-8a307.firebaseio.com/ingredients.json')
        // .then(response => {
            
        //     this.setState({ingredients: response.data})
        // })
        // .catch(error=>{
        //     this.setState({error:true})
        // });
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
        return sum > 0;
    }

    // addIngredientHandler =(type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     const updated = oldCount + 1
    //     const updatedIng ={...this.state.ingredients}
    //     updatedIng[type]= updated
    //     const priceAdd =INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = priceAdd + oldPrice
    //     this.setState({totalPrice:newPrice, ingredients:updatedIng})
    //     this.updatePurchasable(updatedIng);
    // }

    // removeIngredientHandler =(type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0){
    //         return;
    //     }
    //     const updated = oldCount - 1
    //     const updatedIng ={
    //         ...this.state.ingredients
    //     }
    //     updatedIng[type]= updated
    //     const priceSub =INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice =  oldPrice - priceSub; 
    //     this.setState({totalPrice:newPrice, ingredients:updatedIng})
    //     this.updatePurchasable(updatedIng);
    // }

    orderHandler =()=>{
        this.setState({ordered:true})
    }

    orderCancelHandler = ()=>{
        this.setState({ordered:false})
    }

    orderProceedHandler =()=>{
        // looping in this.state.ing to send burger info to check out component
        // const  queryParams = []
        // for (let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.props.ings[i]))
        // }

        // queryParams.push('price='+this.props.price)
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search:'?' + queryString
        // })
        // console.log(queryString)
        this.props.history.push('/checkout')
    }


    render(){
        const disabledInfo={
            ...this.props.ings
        }
        //to disable the less button if type <0
        // {salad:true, bacon:false.....}
        for (let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key] <= 0
        }



        let orderSummary = null;
        
        //show spinner until data(ing) are fetched from DB
        let burger = this.state.error? <p>Ingredients cant be loaded</p> : <Spinner/>
        if (this.props.ings){
        burger = 
            (<Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                ingAdd ={this.props.onIngredientAdded}
                ingRemove={this.props.onIngredientRemoved}
                disabled ={disabledInfo}
                price={this.props.price}
                purchasable={this.updatePurchasable(this.props.ings)}
                ordered={this.orderHandler}/>
            </Aux>);
        orderSummary = <OrderSummary  
        orderCanceled={this.orderCancelHandler}
        orderProceed={this.orderProceedHandler}
        ingredients={this.props.ings}
        totalPrice={this.props.price}/>     
        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.ordered} modalClosed ={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps =state =>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded:(ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved:(ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
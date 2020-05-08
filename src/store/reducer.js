import * as actionTypes from './actions'

const initialState={
    // we gettting it from BD on the old state but lets keep it like ths for now
    ingredients:{
        bacon:0,
        salad:0,
        cheese:0,
        meat:0
    },
    totalPrice: 4,
}

const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 1,
    cheese: 0.75,
    meat: 2
}

const reducer =(state= initialState , action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            } 
            default:
                // return state;  
    };
    return state; 
}       


export default reducer
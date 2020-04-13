import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // switching keys to Array and map it
    // [cheese,meat, bacon]
    let transformedIngredient = Object.keys(props.ingredients).map(igKey => {
        //copy that Array and add another array with of the same Ing
         // [[cheese,cheese],meat, bacon]
        return[...Array(props.ingredients[igKey])].map((_,i)=>{
          return  <BurgerIngredient key={igKey + i} type = {igKey} />
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if (transformedIngredient.length===0){
        transformedIngredient =<p>Please Enter Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
          
        </div>
    );

};

export default burger;
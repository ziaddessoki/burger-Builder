import React from 'react';

import classes from './Order.css'

const order = (props) => {
    // since props is fetched from DB as an object
    //  we want switch  every element to be in a separate object
    //   inside ingredients arrays
    const ingredients = []
    for (let item in props.ingredients){
        ingredients.push(
                {name:item,
                 amount:props.ingredients[item]}
                 )
    }

    const ingredientOutput = ingredients.map(ing =>{
        return <span 
        style={{textTransform:'capitalize',
                display:'inline-block',
                margin:"0 8px",
                padding:'1px'}}
        key={ing.name}>{ing.name}:{ing.amount}</span>
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients:{ingredientOutput}</p>
            <p>Price:<strong>${Number.parseFloat(props.price).toFixed( 2 )}</strong>  </p>
        </div>
    )
    
}


export default order;
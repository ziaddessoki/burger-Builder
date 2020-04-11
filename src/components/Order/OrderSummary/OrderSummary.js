import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button'

import classes from './OrderSummary.css'

const checkoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We Hope u Like it!!</h1>
        <div style={{width:'300px', height: '300px', margin:'auto'}}>
            <Burger  ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked>Cancel</Button>
        <Button btnType="Success" clicked>Continue</Button>
        </div>
    )
}

export default checkoutSummary
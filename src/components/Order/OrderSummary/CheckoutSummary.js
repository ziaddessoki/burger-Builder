import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button'

import classes from './CheckoutSummary.css'

const checkoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We Hope u Like it!!</h1>
        <div className={classes.Burger}>
            <Burger  ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked= {props.checkoutCancelled}>Cancel</Button>
        <Button btnType="Success" clicked= {props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default checkoutSummary
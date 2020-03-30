import React from 'react';
import classes from './BuildControl.css'


const buildControl = (props) =>(
    <div class ={classes.BuildControl}>
        <div class={classes.Label}>{props.label}</div>
        <button class={classes.Less}>Less</button>
        <button class={classes.More}>More</button>
    </div>
);

export default buildControl
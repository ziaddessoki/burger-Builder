import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]

const buildControls = (props)=>(
    <div className={classes.BuildControls}>
        <p> Sandwich Price:<strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.ingAdd(ctrl.type)}
            removed={()=> props.ingRemove(ctrl.type)}
            disabled ={props.disabled[ctrl.type]}/>
        ))}
        <button className={classes.OrderButton}
            disabled={!props.purchasable}>Order Now</button>
    </div>
)

export default buildControls;
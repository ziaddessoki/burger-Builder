import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css';


const navigationItems =(props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
        {!props.isAuthenticated
        ?<NavigationItem link="/auth" >Sign Up/In</NavigationItem>
        :<NavigationItem link="/logout" >logout</NavigationItem>}
    </ul>
)

export default navigationItems
import React from 'react';

import Aux from '../hoc/Aux';
import classes from './Layout.css'
import Toolbar from '../components/Navigation/Toolbar'
import SideDrawer from './Navigation/NavigatioItems/SideDrawer/SideDrawer'

const Layout = (props) => (
    <Aux>
    <Toolbar/>
    <SideDrawer/>
    <main className={classes.Content}>
        {props.children}
    </main>
    </Aux>
)
       
       

export default Layout;

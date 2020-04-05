import React from 'react';
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigatioItems/NavigationItems'
import DrawerToggle from '../../components/Navigation/NavigatioItems/SideDrawer/DrawerToggle/DrawerToggle'

import classes from './Toolbar.css'

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>

    </header>
);

export default toolbar;
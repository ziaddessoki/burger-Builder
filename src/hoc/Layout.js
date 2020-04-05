import React,{Component} from 'react';

import Aux from './Aux';
import classes from './Layout.css'
import Toolbar from '../components/Navigation/Toolbar'
import SideDrawer from '../components/Navigation/NavigatioItems/SideDrawer/SideDrawer'

class Layout extends Component{
    state= {
        showSideDrawer:false
    }

    SideDrawerCloseHandler =()=>{
        this.setState({showSideDrawer:false})
    }

    //the clean new to set new state when it depends on old state
    SideDrawerToggleHandler =()=>{
        console.log('clicked')
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }



    render(){ 
        return(
        <Aux>
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer  open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
         ) }
}
       
       

export default Layout;

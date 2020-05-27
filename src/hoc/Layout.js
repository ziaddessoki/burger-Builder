import React,{Component} from 'react';
import {connect} from 'react-redux'

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
            <Toolbar 
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer  open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}
            isAuth={this.props.isAuthenticated}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
         ) }
}
       
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}       

export default connect(mapStateToProps)(Layout);

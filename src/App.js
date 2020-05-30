import React, { Component } from 'react';
import {Route,Switch,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout';
import BurgerBuilder from './container/BurgerBuilder';
import Logout from './container/Auth/logout';

import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
         {routes}
        </Layout>
      </div>
    );
    // return React.createElement("div",{className:'App'},React.createElement('h1',null, 'Hey now'))
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null;
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

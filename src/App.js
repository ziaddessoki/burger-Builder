import React, { Component } from 'react';
import {Route,withRouter} from 'react-router-dom';
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

    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={Orders}/>
        </Layout>
      </div>
    );
    // return React.createElement("div",{className:'App'},React.createElement('h1',null, 'Hey now'))
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(null,mapDispatchToProps)(App));

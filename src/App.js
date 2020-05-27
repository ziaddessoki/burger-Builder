import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import Layout from './hoc/Layout'
import BurgerBuilder from './container/BurgerBuilder'
import Logout from './container/Auth/logout'

import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders'
import Auth from './container/Auth/Auth'

class App extends Component {


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

export default App;

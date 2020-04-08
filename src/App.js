import React, { Component } from 'react';

import Layout from './hoc/Layout'
import BurgerBuilder from './container/BurgerBuilder'

class App extends Component {


  render() {

    return (
      <div >
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
    // return React.createElement("div",{className:'App'},React.createElement('h1',null, 'Hey now'))
  }
}

export default App;

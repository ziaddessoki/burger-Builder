import React ,{Component} from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/OrderSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state ={
        ingredients:null,
        totalPrice: 0,
    }

    componentWillMount () {
        // gettin the ingredients from the URL
        const query = new URLSearchParams(this.props.location.search);
        let ingredients ={}
        let price = 0;
            for (let param of query.entries()){
                // ['salad', '1']
                if(param[0]==='price'){
                    price = param[1]
                }else{
                    // to turn it into an object
                ingredients[param[0]] =  +param[1]
                }
                
            }
       this.setState({ingredients:ingredients, totalPrice: price})
    }

    checkoutCancelled =()=>{
        this.props.history.goBack()
    }
    checkoutContinued =()=>{
        this.props.history.replace('/checkout/contact-data') 
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                checkoutCancelled ={this.checkoutCancelled }

                checkoutContinued ={this.checkoutContinued}

                ingredients={this.state.ingredients}/>
                {/* for route we used render instead of component so we can pass props in ContactData */}
                {/* we also passing props to have the history available so we can redirect on the contactdate component */}
                <Route path={this.props.match.path+ "/contact-data"} 
                render={(props) =>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}{...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;

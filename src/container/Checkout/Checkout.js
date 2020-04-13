import React ,{Component} from 'react';

import CheckoutSummary from '../../components/Order/OrderSummary/CheckoutSummary'

class Checkout extends Component {
    state ={
        ingredients:{
            salad:1,
            bacon: 1,
            meat:1,
            cheese:1,
        }
    }

    componentDidMount () {
        // gettin the ingredients from the URL
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={}
            for (let param of query.entries()){
                // ['salad', '1']
                // to turn it into an object
                ingredients[param[0]] =  +param[1]
            }
       this.setState({ingredients:ingredients})
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
            </div>
        )
    }
}

export default Checkout;

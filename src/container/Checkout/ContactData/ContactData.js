import React, {Component} from 'react';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'

class ContactData extends Component{
 
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
        },
        loading:false,
    }

    orderHandler =(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients)
         this.setState({loading:true})
        // alert("Proceed")
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name:'Zee',
                email: 'Z@mail.com',
                address:{
                    street:'blvd',
                    zip:'4404',
                    Country: 'USA',
                },
                deliveryMethod:'fsloww'
            }

        }
        // .json is added for FB
        axios.post('/orders.json',order)
        .then(response =>{
            this.setState({loading:false});
            this.props.history.push('/')
        })
        .catch(err =>{ this.setState({loading:false})})
    }
    

    render(){
        let form =(
            <form>
                <input className={classes.Input} type="text" name="name" placeholder='Full Name'/>
                <input className={classes.Input} type="email" name="email" placeholder='email'/>
                <input className={classes.Input} type="text" name="street" placeholder='street'/>
                <input className={classes.Input} type="text" name="postal" placeholder='Zip code'/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData
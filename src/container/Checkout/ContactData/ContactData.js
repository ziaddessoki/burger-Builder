import React, {Component} from 'react';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
 
    state={
        orderForm :{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false
            },
            zip:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                },
                valid: false
            },
            Country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'',
                
            }
        },
        loading:false,
    }

    orderHandler =(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients)
         this.setState({loading:true})
         const formData = {};
         for(let formElementIdentifier in this.state.orderForm){
             formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
         }
        // alert("Proceed")
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
            

        }
        // .json is added for FB
        axios.post('/orders.json',order)
        .then(response =>{
            this.setState({loading:false});
            this.props.history.push('/')
        })
        .catch(err =>{ this.setState({loading:false})})
    }

    // here where we check that all rules are meet
    checkValidity(value,rules){
        let isValid = false;
        // if the input is required, change isValid to Ture if it's not equal to an empty string
        if(rules.required){
            isValid = value.trim() !=='';    
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength
        }
        return isValid;
    }



    // to set the state with the new form values
    inputChangeHandler = (event, inputIdentifier) =>{
        // this will only copy the key like Name,email
        const updateOrderForm ={...this.state.orderForm}
        //this will copy the value/{}
       const updatedFormElement = {...updateOrderForm[inputIdentifier]}
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
       updateOrderForm[inputIdentifier]=updatedFormElement
       console.log(updatedFormElement)
       this.setState({orderForm:updateOrderForm})

    }
    

    render(){
        const formElementsArray=[]
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
           
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                
                {formElementsArray.map(formElement=>(
                    <Input key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.value}
                    changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
                ))}
                
                <Button btnType="Success" >Order</Button>
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
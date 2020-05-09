import React, {Component} from 'react';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'

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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                validation:'',
                valid: true,
            }
        },
        loading:false,
        formIsValid:false
    }

    orderHandler =(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients)
         this.setState({loading:true})
         const formData = {};
         for(let formElementIdentifier in this.state.orderForm){
             formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
         }
       
        const order ={
            ingredients: this.props.ings,
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
        let isValid = true;
        // for elements w/o validation
        if(!rules){
            return true;
        }
        // if the input is required, change isValid to Ture if it's not equal to an empty string
        if(rules.required){
            isValid = value.trim() !=='' && isValid    
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid  
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid  
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
       updatedFormElement.touched = true
       updateOrderForm[inputIdentifier]=updatedFormElement
       console.log(updatedFormElement)

       let formIsValid =true;
       for(let i in updateOrderForm){
           formIsValid= updateOrderForm[i].valid && formIsValid;
       }
       console.log(formIsValid)
       this.setState({orderForm:updateOrderForm, formIsValid:formIsValid})

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
                    valueType={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.value}
                    invalid ={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
                ))}
                
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
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


const mapStateToProps = state =>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData);
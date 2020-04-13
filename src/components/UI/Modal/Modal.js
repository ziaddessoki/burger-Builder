import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{
    // to update this component only if the props show changed
    shouldComponentUpdate(nextProps,nextState){
       if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
           return true
       } 
    } 

    // componentWillUpdate(){
    //     console.log('Model will update')
    //     return true
    // }
    render(){
        return(<Aux>
            <Backdrop show={this.props.show} clicked ={this.props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' :'0'
                    }}>
                {this.props.children}
            </div>
        </Aux>)
    }
}

export default Modal;
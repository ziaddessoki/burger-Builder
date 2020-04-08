import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal'
import Aux from './Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state ={
            error : null
        }
        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res =>res,error =>{
                this.setState({error:error})
            })
        }


        // to stop/remove the interceptors, so we can re-use this component 
        componentWillUnmount(){
            console.log('will unmount',this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
            
        }


        errorConfirmed=()=>{
            this.setState({error:null})
        }
        // when you want the unuse or clean up a comp
        

        render (){
            return(
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed ={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default withErrorHandler
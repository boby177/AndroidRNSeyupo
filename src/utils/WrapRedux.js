import React, { Component } from 'react'
import { Login } from '../store/action';
import { connect } from 'react-redux'


const ReduxWrap = Component => {
    return (
        class AuthWrapped extends React.Component {
            constructor(props) {
              super(props)
            
              this.state = {
                 
              };
            };
            
            render() {
                return(
                    <Component {... this.props}/>
                )
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxWrap)


const mapStateToProps = (state) => {
    return {
        user: {...state.user}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (payload) => {
            console.log(payload)
            return dispatch(Login(payload))
        }
    }
}
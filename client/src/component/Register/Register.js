import React from 'react'
import axios from '../../config/axios'
export default class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const formData = {
            username: this.state.username, 
            email: this.state.email,
            password: this.state.password, 
            // id: this.props.customer._id 
        }
        axios.post('/users/register',formData)
            .then(response=>{
                if(response.data.errors){
                    window.alert(response.data.message)
                    console.log("validation error",response.data.errors)
                }
                else{
                    console.log("Success",response.data)
                    // this.props.history.push('/')
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    render(){
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>UserName
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/>
                    </label>
                    <br/>
                    <label>emial
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                    </label>
                    <br/>
                    <label>Password
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                    </label>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
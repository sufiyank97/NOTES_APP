import React from 'react'
import axios from '../../config/axios'
export default class CategoryList extends React.Component{
    constructor(){
        super()
        this.state={
            categories:[]
        }
    }
    componentDidMount(){
        axios.get('/categories')
            .then(response=>{
                const categories=response.data
                this.setState({categories})
            })
            .catch(err=>{
                console.log(err)
            })
    }
    render(){
        return (
            <div>
                <h1>listing the categories {this.state.categories.length}</h1>
            </div>
        )
    }
}
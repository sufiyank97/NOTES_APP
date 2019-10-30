import axios from '../config/axios'
export const setUser=(user)=>{
    return {
        type:'SET_USER',
        payload:user
    }
}

export const startSetUser=(formData)=>{
    return (dispatch)=>{
        axios.post('/users/login',formData)
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.errors)
                }else{
                    localStorage.setItem('authToken',response.data.token)
                    dispatch(setUser(response.data.user))
                }
            })
        
    }
}
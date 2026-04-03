import { User, UserPlus} from 'lucide-react'
import React,{useState} from 'react'
import axios from 'axios'
import { BUTTONCLASSES, data, Inputwrapper, MESSAGE_ERROR, MESSAGE_SUCCESS } from '../assets/dummy'
const API_URL='http://localhost:8000'

const INITIAL_FORM = {
  name: "",
  email: "",
  password: ""
};
const SignUP = ({onSwitchMode}) => {
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    setMessage({text:"",type:""})
    try{
      const {data} = await axios.post(`${API_URL}/api/user/register`,formData)
      setMessage({text:"Registration successful! you can now log in.",type:"success"})
      setFormData(INITIAL_FORM)
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    catch (error){
     setMessage({text:error.response?.data?.message
     ||"Error occoured. Please try again",type:"error"})
    }
    finally {
      setLoading(false)
    }
  }
    const [formData,setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] =useState(false)
    const [message,setMessage]= useState({text:"",type:""})
      return (
    <div className="max-w-md w-full bg-white shadow-lg border-purple-100 rounded-xl p-8">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-b from-fuchsia-500 to-purple-500 rounded-full
          mx-auto flex items-center justify-center mb-4">
            <UserPlus className='w-8 h-8 text-white'/>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
              Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join TaskFlow to manage your tasks
          </p>
        </div>
        {message.text && (
          <div className={message.type ==='success' ? MESSAGE_SUCCESS :MESSAGE_ERROR}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {data.map(({name,type,placeholder,icon:Icon})=>(
            <div key={name} className={Inputwrapper}>
             <Icon className='text-purple-500 w-5 h-5 mr-2'/>
              <input type={type} placeholder={placeholder} value={formData[name]}
              onChange={(e)=>setFormData({...formData,[name]:e.target.value})}
              className='w-full focus:outline-none text-sm text-gray-700' required/>
            </div>
          ))}
          <button type='submit' className={BUTTONCLASSES} disabled={loading}>
            {loading ? "Signing Up...":<><UserPlus className='w-4 h-4'/>Sign Up</>}
          </button> 
          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{' '}
            <button onClick={onSwitchMode} 
           className="cursor-pointer text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors">
               Login
            </button>
          </p>
        </form>
    </div>
  )
}

export default SignUP
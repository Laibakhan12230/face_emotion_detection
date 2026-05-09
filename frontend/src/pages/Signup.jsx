import { useState } from 'react'

import API from '../api'

import {
  useNavigate,
  Link
} from 'react-router-dom'

export default function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleSignup = async () => {

    const response = await API.post(
      '/signup',
      {
        email,
        password
      }
    )

    alert(response.data.message)

    navigate('/login')
  }

  return (

    <div className='min-h-screen flex items-center justify-center bg-[#050816]'>

      <div className='bg-[#0b1220] p-10 rounded-3xl border border-cyan-500/20 w-[400px]'>

        <h1 className='text-4xl text-cyan-400 font-bold mb-8 text-center'>

          Sign Up

        </h1>

        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='w-full p-4 rounded-xl bg-black/30 border border-cyan-500/20 text-white mb-5'
        />

        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className='w-full p-4 rounded-xl bg-black/30 border border-cyan-500/20 text-white mb-5'
        />

        <button
          onClick={handleSignup}
          className='w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl'
        >

          Create Account

        </button>

        <p className='text-gray-400 mt-5 text-center'>

          Already have account?

          <Link
            to='/login'
            className='text-cyan-400 ml-2'
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  )
}
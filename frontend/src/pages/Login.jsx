import { useState } from 'react'

import API from '../api'

import {
  useNavigate,
  Link
} from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleLogin = async () => {

    const response = await API.post(
      '/login',
      {
        email,
        password
      }
    )

    if (response.data.message === 'success') {

      alert('Login Successful')

      navigate('/')

    }

    else {

      alert('Invalid Credentials')

    }
  }

  return (

    <div className='min-h-screen flex items-center justify-center bg-[#050816]'>

      <div className='bg-[#0b1220] p-10 rounded-3xl border border-cyan-500/20 w-[400px]'>

        <h1 className='text-4xl text-cyan-400 font-bold mb-8 text-center'>

          Sign In

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
          onClick={handleLogin}
          className='w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl'
        >

          Login

        </button>

        <p className='text-gray-400 mt-5 text-center'>

          Don't have account?

          <Link
            to='/signup'
            className='text-cyan-400 ml-2'
          >

            Signup

          </Link>

        </p>

      </div>

    </div>
  )
}
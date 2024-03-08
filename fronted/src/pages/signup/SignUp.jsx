import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          SignUp <span className='text-blue-500'> chatX</span>
        </h1>
        <form>
          <div>
            <label className='label p-2' htmlFor=''>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Ram Kumar'
              className='w-full input input-bordered h-10'
            />
          </div>
          <div>
            <label className='label p-2' htmlFor=''>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='ramkumar@123'
              className='w-full input input-bordered h-10'
            />
          </div>
          <div>
            <label className='label p-2' htmlFor=''>
              <span className='text-base label-text'>password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
            />
          </div>
          <div>
            <label className='label p-2' htmlFor=''>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
            />
          </div>
          <GenderCheckbox />
          <a
            href='http#'
            className='text-sm hover:text-blue-600 mt-2 inline-block'>
            Already have an account
          </a>
          <div>
            <button className='btn btn-black btn-sm mt-2 border border-slate-700 '>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp

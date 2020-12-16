import React, { useState } from 'react';
import api from '../utils/api';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordMatch: '',
    interests: []
  })

  const [foundInterests, setFoundInterests] = useState({})

  const { firstName, lastName, email, username, password, passwordMatch } = formData

  const onChange = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const searchInterests = async (e) => {
    e.preventDefault();
    try {
      const res = api.get(`/interests/${e.target.value}`)
      setFoundInterests({
        ...res.data
      })
    } catch (err) {
      console.log(err.message)
    }
  }
  const addInterest = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      interests: [formData.interests, ...e.target.value]
    })
  }

  const clickThis = (params) => {

  }


  return (
    <div>
      <form className='form' action="/register" method='POST'>
        <p id='register-error'>
        </p>
        <div className="form__group">
          <input className='form__input' type="text" placeholder='First Name' name='firstName' value={firstName} required onChange={onChange} />
          <label htmlFor='firstName' className='form__label'>First Name</label>
        </div>
        <div className="form__group">
          <input className='form__input' type="text" placeholder='Last Name' name='lastName' value={lastName} required onChange={onChange} />
          <label htmlFor='lastName' className='form__label'>Last Name</label>
        </div>
        <div className="form__group">
          <input className='form__input' type="text" placeholder='Username' name="username" minLength="6" value={username} required onChange={onChange} />
          <label htmlFor='username' className='form__label'>Username</label>
        </div>
        <div className="form__group">
          <input className='form__input' type="email" placeholder='Email' name="email" value={email} required onChange={onChange} />
          <label htmlFor='email' className='form__label'>Email</label>
        </div>
        <div className="form__group">
          <input className='form__input' type="password" placeholder='Password' name="password" minLength="6" value={password} required onChange={onChange} />
          <label htmlFor='password' className='form__label'>Password</label>
        </div>
        <div className="form__group">
          <input className='form__input' type="password" placeholder='Retype Password' name="passwordMatch" minLength="6" value={passwordMatch} required onChange={onChange} />
          <label htmlFor='password2' className='form__label'>Retype Password</label>
        </div>
        <div className="modal-footer">
          <button type="submit" onClick={clickThis} className="btn btn-primary">REGISTER</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm

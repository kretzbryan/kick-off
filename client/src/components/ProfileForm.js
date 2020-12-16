import React, { Fragment, useEffect, useState } from 'react';
import api from '../utils/api';
import ChosenInterests from './ChosenInterests';

const ProfileForm = () => {
    const [foundInterests, setFoundInterests] = useState();
    const [searchValue, setSearchValue] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        passwordMatch: '',
        interests: []
    })

    const { firstName, lastName, email, username, password, passwordMatch } = formData

    useEffect(() => {
        async function updateComponent() {
            try {
            const res = await api.get(`/interest/${searchValue}`)
            setFoundInterests(res.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        updateComponent();
    }, [searchValue])

    const onChange = e => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const searchInterests = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }
    // const addInterest = (e, id) => {
    //     e.preventDefault();
    //     console.log(id)
    //     setFormData({
    //         ...formData,
    //         interests: [...formData.interests, id]
    //     })
    // }

    const addInterest = async (e) => {
      try {
        const res1 = await api.get(`/interest/tag/${searchValue}`)
        if(res1.data) {
          console.log('res1 id', res1.data.tag)
          await setFormData({
            ...formData,
            interests: [...formData.interests, res1.data]
        })
        } 

        // else {
        //   const config = {
        //     'Content-Type': 'application/json'
        //   }

        //   const body = JSON.stringify(searchValue);
        //   const res2 = await api.post('/interest', body, config)
        //   console.log(res2.data)
        //   await setFormData({
        //             ...formData,
        //             interests: [...formData.interests, res2.data.interest]
        //         })

         
        // }        
      } catch (err) {
        console.log(err)
      }
    }
    return (
      <Fragment>
        <div className='row'>
          <div className="col avatar-icon"></div>
             <form className='register-form col' action="/register" method='POST'>
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
                
                <div className="">
                  <button type="submit"  className="btn btn-primary">REGISTER</button>
                </div>
            </form>
      </div>
      <div className="row">
          <input list="interests" value={searchValue} onChange={searchInterests}/>
            <datalist id="interests" >
                {foundInterests && foundInterests.map( interest => {
                    return <option id={interest._id} >{interest.tag}</option>
                })}
            </datalist>  <button type='button' onClick={addInterest} >add interest</button>
      </div>
        <div className="row">
            <ChosenInterests interests={formData.interests}/></div>
      </Fragment>
  )
}

export default ProfileForm

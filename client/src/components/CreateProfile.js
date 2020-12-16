import React, { Fragment, useState } from 'react'
import ProfileForm from './ProfileForm'

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        
    })

    return (
        <Fragment>
            <main className="row create-profile">
                <div className="col-sm-4">
                    <div className="row">
                        <ProfileForm />
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </main>
        </Fragment>
    )
}

export default CreateProfile

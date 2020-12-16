import React, { useEffect, useState } from 'react'

const ChosenInterests = ({interests}) => {
    console.log('interests', interests)

    return (
        <div>
            {interests !== [] && interests.map( interest => {
                return <button type='button'> {`#${ interest.tag }`}</button>
            })}
        </div>
    )
}

export default ChosenInterests

import React from 'react'
import AuthForm from './Form/AuthForm'

const Signup = props => {
    return (
        <div>
            <AuthForm {...props}
                signup
                getUser={props.getUser}
                formButton="Sign-up"
                authMessage="Already have an account ?"
                formRedirectLink="/login"
                formRedirectText=" Login" />
        </div>
    )
}

export default Signup

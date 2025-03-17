import React from "react";

const Login = () => {
    return (
        <div className="login-container">
            <h1>Login</h1>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
};

export default Login;   
import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useNavigate } from 'react-router-dom'
import { generatePayload, getCookie } from "../cookieUtils";

export default function Login(props) {

    const navigate = useNavigate()

    const setLoggedIn = props.setLoggedIn;

    const [displayLoginContainer, setDisplayLoginContainer] = React.useState(false)
    const [displayRegisterContainer, setDisplayRegisterContainer] = React.useState(false)
    const [loginFormData, setLoginFormData] = React.useState({
        username:'', password:''
    })
    const [registerFormData, setRegisterFormData] = React.useState({
        username:'', password:'', confirmPassword:''
    })
    const [errorMsg, setErrorMsg] = React.useState('')
    
    const loginContainer = (
        <div className={`login-container ${errorMsg ? 'error' : ''}`}>
            <form onSubmit={captureLoginForm}>
                <h1>Who are you then?</h1>
                <input onChange={handleLoginFormChange} type="text" name="username" id="username" autoComplete="off" placeholder="Username"/>
                <input onChange={handleLoginFormChange} type="password" name="password" id="password" autoComplete="off" placeholder="Password"/>
                {errorMsg && <span className="error">{errorMsg}</span>}
                <button>Let's go</button>
            </form>
        </div>
    )

    const registerContainer = (
        <div className={`login-container ${errorMsg ? 'error' : ''}`}>
            <form onSubmit={captureRegisterForm}>
                <h1>Let's get to know you</h1>
                <input onChange={handleRegisterFormChange} type="text" name="username" id="username" autoComplete="off" placeholder="Username"/>
                <input onChange={handleRegisterFormChange} type="password" name="password" id="password" autoComplete="off" placeholder="Password"/>
                <input onChange={handleRegisterFormChange} type="password" name="confirmPassword" id="password" autoComplete="off" placeholder="Confirm password"/>
                {errorMsg && <span className="error">{errorMsg}</span>}
                <button>Register</button>
            </form>
        </div>
    )

    function handleLoginFormChange(e) {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]:e.target.value
        })
    }
    function handleRegisterFormChange(e) {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]:e.target.value
        })
    }
        
    function displayLogin () {setDisplayLoginContainer(true)}

    function displayRegister () {setDisplayRegisterContainer(true)}

    function captureLoginForm (e) {
        e.preventDefault()
        fetch("http://localhost:8000/api/login", 
            generatePayload(getCookie('csrftoken'), JSON.stringify(loginFormData), 'POST')
        ).then(response => {
            if (!response.ok){
                if (response.status === 401) {
                    throw new Error(`Invalid credentials`)
                } else if (response.status === 403) {
                    throw new Error(`Forbidden`)
                }
            } else {
                return response.json()
            }
        }).then(response => {
            console.log(response)
            sessionStorage.setItem('loggedIn', 'true')
            setLoggedIn(true)
            navigate('/')
        }).catch(error => {
            setErrorMsg(error.message)
        })
    }

    function captureRegisterForm (e) {
        e.preventDefault()
        const { password, confirmPassword} = registerFormData;
        if (password !== confirmPassword) {
            setErrorMsg('Passwords don\'t match')
            return
        }
        return navigate('/register', {state:registerFormData})
    }

    return (
        <div className="login">
            <div>
                <h1>So... You come here often?</h1>
                <SwitchTransition>
                    <CSSTransition key={displayLoginContainer} classNames='login-container' timeout={500}>
                        {!displayLoginContainer ? (<button onClick={displayLogin}>Yes, let me in</button>) : loginContainer}
                    </CSSTransition>
                </SwitchTransition>
                <SwitchTransition>
                    <CSSTransition key={displayRegisterContainer} classNames='login-container' timeout={500}>
                        {!displayRegisterContainer ? (<button onClick={displayRegister}>My first time</button>) : registerContainer}
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    )
}
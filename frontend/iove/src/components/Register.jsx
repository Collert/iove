import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generatePayload, getCookie } from "../cookieUtils";
export default function Register (props) {

    const navigate = useNavigate()

    const {state} = useLocation()
    console.log(state)
    const [showIntro, setShowIntro] = React.useState(true)
    const [formData, setFormData] = React.useState({
        username:state.username,
        password:state.password,
        firstName:"",
        lastName:"",
        email:"",
        age:"",
        orientation:""
    })
    const [errorMsg, setErrorMsg] = React.useState('')

    React.useEffect(() => {
        setTimeout(() => setShowIntro(false), 5000)
    }, [])

    function submitRegister(e) {
        e.preventDefault()
        fetch("http://localhost:8000/api/register", generatePayload(getCookie('csrftoken'), JSON.stringify(formData), 'POST'))
        .then(response => {
        if (!response.ok){
            if (response.status === 403) {
                throw new Error(`Username taken`)
            }
        } else {
            return response.json()
        }
        }).then(() => (
            navigate('/profile')
        )).catch(error => {
            setErrorMsg(error.message)
        })
    }

    function handleChange (e) {
        setFormData( {
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const intro = (
        <div className="center-grid">
            {props.viewport.portrait?
            <div className="intro">
                <span className="intro">S</span>
                <span className="intro">W</span>
                <span className="intro">E</span>
                <span className="intro">E</span>
                <span className="intro">T</span>
            </div>:
            <h1 className="intro">
                SWEET
            </h1>}
            <h3 className="intro-bot">
                We just need a couple more things from you
            </h3>
        </div>
    )

    const registrationForm = (
        <form className={`registration-form center-grid login-container ${errorMsg ? 'error' : ''}`} onSubmit={submitRegister}>
            <input placeholder="Username" type="text" onChange={handleChange} value={formData.username} name="username"/>
            <input placeholder="First Name" type="text" onChange={handleChange} value={formData.firstName} name="firstName"/>
            <input placeholder="Last Name" type="text" onChange={handleChange} value={formData.lastName} name="lastName"/>
            <input placeholder="Email" type="email" onChange={handleChange} value={formData.email} name="email"/>
            <input placeholder="Age" type="number" onChange={handleChange} value={formData.age} name="age"/>
            {errorMsg && <span className="error">{errorMsg}</span>}
            <button>Register</button>
        </form>
    )

    return (
        <div className="register-container">
            {showIntro ? intro : registrationForm}
        </div>
    )
}
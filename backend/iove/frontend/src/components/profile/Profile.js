import React from "react";
import CardStack from "../cards/CardStack";
import './profile.css'

// import {default as passedUser} from "../testUser";
import { generatePayload, getCookie } from "../../cookieUtils";
// import testUser from "../testUser"
import loadingUser from "../loadingUser";

export default function Profile(props) {

    const [user, setUser] = React.useState(loadingUser)
    const [instruction, setInstruction] = React.useState(true)
    
    React.useEffect(() => {
        fetch(`/api/profile`, 
            generatePayload(getCookie('csrftoken'))
        ).then(response => (
            response.json()
        )).then(data => {
            // console.log(data)
            setTimeout(() => {
                setUser(data)
            }, 100);
        })
        // .then(()=>{console.log(user)})
    },[])

    React.useEffect(() => {
        setTimeout(() => {
            setInstruction(false)
        }, 5000);
    },[])

    return (
        <div className="profile-editor">
        {instruction && <h1 className="instruction">Customize your profile here</h1>}
            <CardStack viewport={props.viewport} editUser={setUser} user={user} editable/>
        </div>
    )
}
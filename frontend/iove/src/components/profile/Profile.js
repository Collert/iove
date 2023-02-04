import React from "react";
import CardStack from "../cards/CardStack";
import './profile.css'

// import {default as passedUser} from "../testUser";
import { generatePayload, getCookie } from "../../cookieUtils";
import loadingUser from "../loadingUser";

export default function Profile(props) {

    const [user, setUser] = React.useState(loadingUser)
    
    React.useEffect(() => {
        fetch(`http://localhost:8000/api/profile`, 
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

    return (
        <div className="profile-editor">
            <CardStack viewport={props.viewport} editUser={setUser} user={user} editable/>
        </div>
    )
}
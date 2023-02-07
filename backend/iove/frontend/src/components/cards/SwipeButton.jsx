import React from "react";
import { generatePayload, getCookie } from "../../cookieUtils";

export default function SwipeButton (props) {

    function handleClick(e) {
        props.handleClick(e, e.target.dataset.likes === 'true');
        const fetchBody = {
            subject:props.userId,
            like:props.like
        }
        fetch('/api/decision', generatePayload(getCookie('csrftoken'), fetchBody, 'POST'))
    }

    return(
        <button data-likes={props.like ? 'true' : 'false'} onClick={handleClick} className={`preference ${props.like ? 'like' : 'dislike'}`}>
            <i className={`fa-solid fa-${props.like ? 'heart' : 'x'}`}></i>
        </button>
    )
}
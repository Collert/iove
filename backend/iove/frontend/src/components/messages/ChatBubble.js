import React from "react";

export default function ChatBubble (props) {

    let classdef = (props.own ? 'outgoing' : 'incoming') + ' chat_bubble'
    return (
        <div className="bubble_container">
            <div className={classdef}>
                {props.text}
            </div>
        </div>
    )
}
import React from "react";

export default function Match(props) {

    function handleClick() {
        props.handleClick(props.id)
        props.setSelectedMatch(props.id)
    }

    const loading = (props.id === -1)

    return (
        loading ?
        <div className="match">
            <div className="loading"></div>
        </div>
        :
        <div className={`match grid_center ${props.selectedMatch === props.id ? 'selected' : ''}`} onClick={loading ? undefined : handleClick}>
            <div className="profile_pic grid_center">
                <img src={props.profilePic} alt={`${props.name}'s profile`}/>
            </div>
            <div className="texts grid_center">
                <div className="name">
                    {props.name}
                </div>
                <div className="last_msg">
                    {props.message}
                </div>
            </div>
        </div>
    )
}
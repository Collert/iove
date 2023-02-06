import React from "react";
import Match from "./Match";

export default function MatchesContainer(props) {
    // console.log(props.matches)
    const matches = props.matches.map(match => {
        return <Match 
        key={Math.random()}
        id={match.id}
        handleClick = {props.handleMatchClick}
        profilePic={match.person.pfp}
        name={match.person.name}
        message={match.messages.text}
        selectedMatch={props.selectedMatch}
        setSelectedMatch={props.setSelectedMatch}
        />
    })
    return (<div className="matches_container">
        {matches}
    </div>)
}
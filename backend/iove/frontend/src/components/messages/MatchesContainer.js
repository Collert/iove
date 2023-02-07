import React from "react";
import Match from "./Match";

export default function MatchesContainer(props) {
    // console.log(props.matches)
    // let test = []
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
    return (
        <div className="matches_container">
            {props.matches.length?
            matches :
            <div className="no-matches">
                <div>
                    <h1>No matches yet</h1>
                    <h4>{"Kinda sad ngl :("}</h4>
                </div>
            </div>
            }
        </div>
    )
}
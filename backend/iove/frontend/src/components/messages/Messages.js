import React from "react";
import { generatePayload, getCookie } from "../../cookieUtils";
import ChatContainer from "./ChatContainer";
import MatchesContainer from "./MatchesContainer";
import './messages.css'
import testData from "./testData";
import loadingData from "./loadingData";

export default function Messages(props) {

    function filterLastMessages(data) {
        // console.log(data)
        const newArray = data.map(match => {
            let object = {
                ...match,
                messages:match.messages.reduce((a,b) => (a.timestamp > b.timestamp ? a : b), {})
            }
            return object
        })
        return newArray.sort((a,b) => ((a.messages.timestamp && b.messages.timestamp) ? b.messages.timestamp - a.messages.timestamp : -1))
    }
    
    const [selectedChat, setSelectedChat] = React.useState(undefined)
    const [messages, setMessages] = React.useState(testData)
    const [lastMessages, setLastMessages] = React.useState(() => (filterLastMessages(messages)))
    const [selectedMatch, setSelectedMatch] = React.useState()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => setLastMessages(
        filterLastMessages(messages)
    ), [messages])

    React.useEffect(() => {
        props.setShowChat(false)
        fetch('/api/chats', generatePayload(getCookie('csrftoken')))
        .then(response => response.json())
        .then(data => {
            setMessages(data)
            setLoading(false)
        })
    },[])
        
    function selectConvoLandscape(id){
        // let object = messages.filter(obj => obj.id === id)
        setSelectedChat(id)
    }
    function selectConvoPortrait(id){
        // let object = messages.filter(obj => obj.id === id)
        setSelectedChat(id)
        props.setShowChat(true)
    }

    return (
        props.viewport.portrait ?
            (!props.showChat ?
            <MatchesContainer 
                matches={lastMessages} 
                selectedMatch={selectedMatch} 
                setSelectedMatch={setSelectedMatch} 
                setMessages = {setMessages} 
                handleMatchClick = {selectConvoPortrait}
            />:
            <ChatContainer 
                conversationId = {selectedChat} 
                setMessages = {setMessages} 
                everyMsg={messages}
                loading={loading}
                userID={props.userInfo.id}
            />
            )
        :
            <div className="messages_page grid_center">
                <MatchesContainer 
                    matches={lastMessages} 
                    selectedMatch={selectedMatch} 
                    setSelectedMatch={setSelectedMatch} 
                    setMessages = {setMessages} 
                    handleMatchClick = {selectConvoLandscape}
                />
                <ChatContainer 
                    conversationId = {selectedChat} 
                    setMessages = {setMessages} 
                    everyMsg={messages}
                    loading={loading}
                    userID={props.userInfo.id}
                />
            </div>
    )
}
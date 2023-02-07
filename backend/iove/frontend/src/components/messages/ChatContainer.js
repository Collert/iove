import React from "react";
import useWebSocket from "react-use-websocket";
import { generatePayload, getCookie } from "../../cookieUtils";
import ChatBubble from "./ChatBubble";
import EmptyConversation from "./EmptyConversation";

export default function ChatContainer (props) {

    const loading = (props.conversationId === -1)

    const [message, setMessage] = React.useState('')
    const [socketUrl, setSocketUrl] = React.useState();

    React.useEffect(() => {
        if (props.conversationId) {
            setSocketUrl(`ws://localhost:8000/ws/chat/${props.conversationId}`)
        }
    },[props.conversationId])
  
    const { sendMessage, lastMessage, readyState, lastJsonMessage } = useWebSocket(socketUrl);

    // console.log(props.everyMsg)

    const conversation = React.useMemo(() => props.everyMsg.filter(obj => obj.id === props.conversationId)[0], [props.conversationId, props.everyMsg]);
    // console.log(conversation)

    function postMessage(e) {
        e.preventDefault()
        addMessage(false, message)
    }

    // const {setMessages, everyMsg, conversationId} = props
    const addMessage = React.useCallback((incoming, msg) => {
        let allMsgs = [...props.everyMsg];
        let newMessage = {
            incoming:incoming,
            text:msg,
            timestamp: Date.now()
        }
        // if (conversation.messages.slice(-1)[0].text === newMessage.text) {
        //     // throw new Error('Spam detected')
        //     return
        // }
        let newConversation = {
            ...conversation,
            messages:[newMessage, ...conversation.messages]
        }
        allMsgs[allMsgs.findIndex(convo => convo.id === props.conversationId)] = newConversation;
        setMessage('')
        props.setMessages(allMsgs)
        if (!incoming) {
            // console.log(JSON.stringify({message:msg, from:props.userID}))
            sendMessage(JSON.stringify({message:msg, from:props.userID}))
            const body = {
                text:msg,
                conversation:props.conversationId
            }
            fetch('/api/send_message',generatePayload(getCookie('csrftoken'), JSON.stringify(body), 'POST'))
        }
    },[props.conversationId, props.everyMsg])
    

    React.useEffect(() => {
        if (conversation && lastMessage !== null && lastJsonMessage.sender !== props.userID) {
            addMessage(true, lastJsonMessage.message)
            console.log(lastJsonMessage)
        }
    },[lastMessage])
    
    // React.useEffect(() => {
    //     if (lastMessage !== null) {
    //         console.log(lastMessage.data)
    //     }
    // },[lastMessage])
    
    const connectionStatus = {
      [readyState.CONNECTING]: 'Connecting',
      [readyState.OPEN]: 'Open',
      [readyState.CLOSING]: 'Closing',
      [readyState.CLOSED]: 'Closed',
      [readyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    let messages;

    if (conversation) {
        if (conversation.messages){
            messages = conversation.messages
            messages = messages.map(message => <ChatBubble key={Math.random()} own={!message.incoming} text={message.text} />)
            // messages.reverse()
        }
    }

    const chatWindow = (<div className="chat_box">
                            <div className={`chat_window ${messages && messages.length ? '' : 'empty'}`}>
                                {messages && messages.length ? messages : <EmptyConversation setMessage={setMessage}/>}
                            </div>
                            <form className="chat_input">
                                <input id="input" value={message} onChange={e => setMessage(e.target.value)} autoComplete='off'/>
                                <button onClick={postMessage}>RETURN</button>
                            </form>
                        </div>)

    const pickConvoWindow = (<div className="chat_box empty">
                                <h1>{props.loading ? 'Loading...' : 'Pick a convo'}</h1>
                            </div>)

    return conversation ? chatWindow : pickConvoWindow
}
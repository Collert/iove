import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { generatePayload, getCookie} from "../cookieUtils";
import { checkFetchErrors } from "../HTTPUtils";
import CardStack from "./cards/CardStack";
import SwipeButton from "./cards/SwipeButton";
import './swipe.css';
// import testUser from './testUser'

export default function Swipe (props) {

    // const handleHTTPErrors = useHandleHTTPErrors()

    const stacksToFetch = 3;
    
    const [index, setIndex] = React.useState(0)
    const [swipes, setSwipes] = React.useState(0)

    const [stacksCollection, setStacksCollection] = React.useState([
        // <CardStack order={1} user={testUser}/>,
        // <CardStack order={2} user={testUser}/>,
        // <CardStack order={3} user={testUser}/>,
        // <CardStack order={4} user={testUser}/>,
        // <CardStack order={5} user={testUser}/>
    ])

    const [loading, setLoading] = React.useState(true)

    async function fetchUsers (qty) {
        try {
            const response = await fetch(`/api/serve?n=${qty}`, generatePayload(getCookie('csrftoken')))
            checkFetchErrors(response)
            const data = await response.json()
            // console.log(data)
            setStacksCollection(data.map(item => <CardStack viewport={props.viewport} user={item}/>))
            setLoading(false)
        } catch (error) {
            // redirect('/login')
            // console.log(handleHTTPErrors(error))
        }
    }

    React.useEffect(() => {
        fetchUsers(stacksToFetch + 2)
    },[])

    const [currentStack, setCurrentStack] = React.useState()

    const [decisionLikes, setDecisionLikes] = React.useState()
    const [stop, setStop] = React.useState(false)

    function handleSwipe(e, preference) {
        setDecisionLikes(preference)
        setTimeout(() => {
            setIndex(index + 1)
            setSwipes(swipes + 1)
        }, 10);
    }

    // console.log(currentStack ? currentStack.props.user.id : null)
    console.log(props)
    
    React.useEffect(() => {
        if (index !== 0 && index>=stacksToFetch) {
            setCurrentStack(stacksCollection[index])
            fetch(`/api/serve?n=${stacksToFetch}`, generatePayload(getCookie('csrftoken')))
            .then(response => response.json())
            .then(data => {
                setIndex(0)
                const newStacks = data.map(user => <CardStack viewport={props.viewport} user={user}/>)
                console.log('new '+newStacks)
                const currentSliced = stacksCollection.slice(stacksToFetch)
                let stacks = [];
                if (!stop) {
                    stacks = currentSliced.concat(newStacks)
                    setStop(true)
                }
                setStacksCollection(stacks)
            })
        } else {
            setCurrentStack(stacksCollection[index])
        }
    },[swipes, stacksCollection])

    const noMorePpl = (
        <div className="array-end">
            <div>
                <h1>Looks like you swiped through all users</h1>
                <p>No rizz? Don't worry, maybe you're just ugly</p>
            </div>
        </div>
    )

    return (
    <div className="swipe">
        <div>
            {loading ? <h1>Loading...</h1> :
            <SwitchTransition>
                <CSSTransition key={index} classNames='stack' timeout={300}>
                    <div className={`stacksCollection ${decisionLikes ? 'likes' : 'dislikes'} ${!currentStack ? 'empty' : ''}`}>
                        {currentStack ? currentStack : noMorePpl}
                    </div>
                </CSSTransition>
            </SwitchTransition>}
            {/* {index+1} */}
            {currentStack && <div className="buttons">
                <SwipeButton userId={currentStack ? currentStack.props.user.id : null} handleClick={handleSwipe} dislike/>
                <SwipeButton userId={currentStack ? currentStack.props.user.id : null} handleClick={handleSwipe} like/>
            </div>}
        </div>
    </div>
    )
}
import React from "react";
import pickupLines from "../../pickup_lines";

export default function EmptyConversation (props) {

    const [suggestedLines, setSuggestedLines] = React.useState(['','',''])

    // let suggestedLines = ['','','']

    React.useEffect(() => {
        setSuggestedLines(suggestedLines.map(() => {
            let message = pickupLines[Math.floor(Math.random()*pickupLines.length)]
            return <div key={Math.random()} onClick={() => props.setMessage(message)}>{message}</div>
        }))
    }, [])

    return (
        <div className="empty-convo">
            <h1>So quiet so far...</h1>
            maybe try one of these:
            <div className="openers">
                {suggestedLines}
            </div>
        </div>
    )
}
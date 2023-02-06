import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import CardEditor from "../profile/CardEditor";
import './music_genres.css'

export default function LittleCard (props) {

    const [cardActive, setCardActive] = React.useState(false)

    const editing = props.editable

    function expandCard () {
        setCardActive(() => !cardActive)
    }

    const notes = {
        big:(<svg id="Layer_2" className="big_note" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.75 384.75">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <g>
                            <path d="m174.75,384.75c-27.58-7.55-47.83-33.44-35.46-62.46,10.93-25.65,40.15-33.36,63.96-21.38,0-31.15,0-62.31,0-93.46,0-15.84,0-31.68,0-47.53,0-11.61-.92-18.83,11-22.99,30.09-10.5,61.91-17.53,92.57-26.21,16.1-4.56,32.2-9.11,48.3-13.67,11.77-3.33,22.25-9.07,29.62,3.46v200.25c-5.98,18.17-14.99,33.56-35.26,37.94-16.67,3.61-35.7-2.75-45.79-16.73-11.35-15.72-12.45-38.05-.41-53.61,15.2-19.65,37.17-22.05,58.83-12.72v-92.16c-45.53,12.86-90.85,25.67-136.37,38.53,0,38.17.02,76.34,0,114.51,0,16.02,2,32.74-6.83,46.99-7.73,12.48-19.28,17.66-32.92,21.23h-11.25Z"/>
                        </g>
                    </g>
                </svg>),
      small:(<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.75 384.75">
                <g id="Layer_1-2" data-name="Layer 1">
                    <g>
                        <path d="m82.5.75c11.41,11.24,19.09,25.1,29.2,37.55,11.31,13.93,24.64,25.22,38.6,36.37,11.6,9.27,22.66,18.63,27.67,33.1,4.64,13.39,3.21,28.55-2.3,41.48-4.82,11.33-13.31,20.43-24.24,26.09-9.02,4.67-30.28,13.03-36.86.97-9-16.5,16.59-16.17,24.82-20.1,11.6-5.54,18.43-17.26,18.79-29.98.53-18.56-13.87-27.13-26.77-37.5-14.88-11.97-28.18-25.16-40.66-39.59,0,30.44,0,60.87.01,91.31,0,16.43,0,32.86,0,49.28,0,14.36,1.6,29.84-.57,44.05-3.21,21-20.76,37.13-42.02,38.36-25.79,1.49-40.19-16.74-47.41-38.88,0-4,0-8,0-12,4.51-13.89,9.59-25.72,22.96-33.22,15-8.42,29.03-5.29,44.54-.3,0-32.92.03-65.83.01-98.75,0-17.5-.02-34.99-.06-52.49-.02-10.96-4.24-29.97,8.29-35.75,2,0,4,0,6,0Z"/>
                    </g>
                </g>
            </svg>)
    }

    let card;
    let cardType = {
        type:'littleCard',
        cardProps:props
    }

    const handleUndefined = <h4 className="handleUndefined">Customize further</h4>;

    if (props.theme === 'music') {
        let genre = props.specifics;
        card = (<div onClick={editing? expandCard : undefined} className={`little-card card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''} music ${genre}`}>
                    {props.specifics ? 
                    <><h3>{genre} music</h3>
                    {notes.big}</> 
                    : handleUndefined}
                </div>)
    } else if (props.theme === 'game') {
        card = (<div onClick={editing? expandCard : undefined} className={`little-card card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''} game`}>
                    {props.specifics ? 
                    <img src={`./assets/game_covers/${props.specifics}.jpg`} alt='favorite game'/>
                    : handleUndefined}
                </div>)
    } else if (props.theme === 'paradigm') {
        card = (<div onClick={editing? expandCard : undefined} className={`little-card card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''} paradigm`}>
                    {props.specifics ? 
                    <img src={`./assets/game_covers/${props.specifics}.jpg`} alt='favorite game'/>
                    : handleUndefined}
                </div>)
    } else if (props.theme === 'zodiac') {
        card = (<div onClick={editing? expandCard : undefined} className={`little-card card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''} zodiac`}>
                    {props.specifics ? 
                    <img src={`./assets/zodiac/${props.specifics}.gif`} alt='zodiac sign'/>
                    : handleUndefined}
                </div>)
    } else if (props.theme === 'looking_for') {
        card = (<div onClick={editing? expandCard : undefined} className={`little-card card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''} looking_for`}>
                    {props.specifics ? 
                    <img src={`./assets/looking_for/${props.specifics}.jpg`} alt='what person is looking for'/>
                    : handleUndefined}
                </div>)
    } else if (props.theme === null && props.specifics === 'load') {
        card = (<div className="little-card card"><div className="loading"></div></div>)
    } else {
        card = (<div onClick={editing? expandCard : undefined} className={`little-card card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''} looking_for`}>
                    <h1>Customize card</h1>
                </div>)
    }

    return (
        editing ?
        <SwitchTransition>
            <CSSTransition key={cardActive&&editing} classNames='editor-container' timeout={600}>
            {cardActive&&editing ? (
                <div className="expanded-edit">
                    {card}
                    <CardEditor user={props.user} card={cardType} editUser={props.editUser}/>
                </div>)
            : card}
            </CSSTransition>
        </SwitchTransition>
         : card
        )
}
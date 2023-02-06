import React from "react";
import CardEditor from "../profile/CardEditor";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import CodeBlock from "./CodeBlock";
import { fileExtensions } from "./CodeBlock";

export default function BigCard (props) {

    const [cardActive, setCardActive] = React.useState(false)

    const editing = props.editable

    function expandCard () {
        setCardActive(() => !cardActive)
    }

    function enableSection(section) {
        for (const property in section) {
            try {
                if (section[property] && section[property].list.length !== 0) {
                    return true
                }
            } catch (e) {
                if (section[property] && section[property].length !== 0) {
                    return true
                }
            }
        }
        return false
    }

    let card;
    let cardType = {
        type:props.purpose,
        cardProps:props
    }

    if (props.purpose === 'title') {
        const transformations = {
            transform:`translateX(${props.profilePic.transformX}px) translateY(${props.profilePic.transformY}px) scale(${props.profilePic.transformScale}%)`
        }
        card = (<div onClick={expandCard} className={`big-card card pfp ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''}`}>
                    {props.profilePic.image === 'load' ?
                        <div className="loading"></div> :
                        <img src={props.profilePic.image} style={transformations} alt='Profile'/> 
                    }
                    <div className="gradient"></div>
                    <span>{props.name},{(props.age)}</span>
                </div>)
    } else if (props.purpose === 'bio'){
        let lifestyle = props.lifestyleInfo;
        let background = props.backgroundInfo;
        let ethnicities = background.ethnicity.list.map(ethnicity => <span key={ethnicity}>{ethnicity}</span>)
        let languages = background.languages.list.map(language => <span key={language}>{language}</span>)
        card = (<div onClick={expandCard} className={`big-card bio card ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''}`}>
                    <h1>About Me</h1>
                    {props.bioText &&
                    (<div className="bio-text">
                        {props.bioText}
                    </div>)}
                    {enableSection(background) && 
                    (<div className="background">
                        <h2>Background</h2>
                        {background.ethnicity.list.length !== 0 && (
                            <><h5>Ethnicity</h5>
                            <div>
                                {ethnicities}
                            </div></>
                        )}
                        {background.languages.list.length !== 0 && (
                            <><h5>Languages spoken</h5>
                            <div>
                                {languages}
                            </div></>
                        )}
                        {background.education && (
                            <><h5>Education</h5>
                            <div>
                                <span>{background.education}</span>
                            </div></>
                        )}
                        {background.religion && (
                            <><h5>Religion</h5>
                            <div>
                                <span>{background.religion}</span>
                            </div></>
                        )}
                        {background.occupation && (
                            <><h5>Occupation</h5>
                            <div>
                                <span>{background.occupation}</span>
                            </div></>
                        )}
                    </div>)}
                    {enableSection(lifestyle) && 
                    (<div className="lifestyle">
                        <h2>Lifestyle</h2>
                        {(lifestyle.alcohol !== undefined || lifestyle.weed !== undefined || lifestyle.smoke !== undefined) && 
                        (<div className="ido">
                            <div>
                                <h5>
                                    I do
                                </h5>
                                {(lifestyle.smoke !== undefined && lifestyle.smoke) && (<img src="./assets/smoking.png" alt="Smoking icon"/>)}
                                {(lifestyle.weed !== undefined && lifestyle.weed) && (<img src="./assets/weed.png" alt="Cannabis icon"/>)}
                                {(lifestyle.alcohol !== undefined && lifestyle.alcohol) && (<img src="./assets/alcohol.png" alt="Alcohol icon"/>)}
                            </div>
                            <div>
                                <h5>
                                    I don't do
                                </h5>
                                {(lifestyle.smoke !== undefined && !lifestyle.smoke) && (<img src="./assets/smoking.png" alt="Smoking icon"/>)}
                                {(lifestyle.weed !== undefined && !lifestyle.weed) && (<img src="./assets/weed.png" alt="Cannabis icon"/>)}
                                {(lifestyle.alcohol !== undefined && !lifestyle.alcohol) && (<img src="./assets/alcohol.png" alt="Alcohol icon"/>)}
                            </div>
                        </div>)}
                        {lifestyle.diet && (
                            <div>
                                <h5>Diet</h5>
                                <span>{lifestyle.diet}</span>
                            </div>
                        )}
                    </div>)}
                </div>)
    } else if (props.purpose === 'code'){
        console.log(props)
        card = (<div onClick={expandCard} className={`big-card card code ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''}`}>
                    <div className="top">
                        {!props.viewport.portrait &&
                        <div className="nav">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>}
                        <div className="tab">{`${props.codeObj.filename + fileExtensions[props.codeObj.language]}`}</div>
                    </div>
                        <CodeBlock language={props.codeObj.language} code={props.codeObj.code}/>
                    </div>)
    } else if (props.purpose === 'hobby'){
        card = (<div onClick={expandCard} className={`big-card card hobby ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''}`}>
                    {props.hobby === 'load' ? 
                        <div className="loading"></div> :
                        <><img src={`assets/hobbies/${props.hobby}.gif`} alt='Favorite hobby'/>
                    <div className="gradient"></div>
                    <div className="text">
                        <h1>Favorite hobby</h1>
                        <h2>
                            {props.hobby ? props.hobby.charAt(0).toUpperCase() + props.hobby.slice(1).replace('_', ' ') : 'set hobby'}
                        </h2>
                    </div></>
                    }
                </div>)
    } else {
        card = (<div onClick={expandCard} className={`big-card card hobby ${cardActive ? 'maximized' : ''} ${editing? 'editing' : ''}`}>
                    <h1>Customize card</h1>
                </div>)
    }

    return (
        editing ?
        <SwitchTransition>
            <CSSTransition key={cardActive&&editing} classNames='editor-container' timeout={800}>
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
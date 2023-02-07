import React from "react";
import { generatePayload, getCookie } from "../../cookieUtils";
import { addManyToManyEdit } from "../../dataUtils";
import languages from "./languages";

export default function CardEditor(props) {

    const [applyError, setApplyError] = React.useState(false)

    const editUser = props.editUser;
    const user = props.user;

    let editor;
    let cardProps = props.card.cardProps; 

    function applyUserEdit(e) {
        e.preventDefault()
        if (props.card.type === 'littleCard') {
            if (!user.smallCards[`card_${cardProps.cardNum}`].prop) {
                return setApplyError(true)
            }
        }
        console.log('submitted')
        fetch('/api/profile',
            generatePayload(getCookie('csrftoken'), user, 'POST')
        ).then(response => response.json())
        // .then(newUser => console.log(newUser))
        .then(newUser => editUser(newUser))
        // .then(console.log(user))
    }

    function updateLocalUser(e) {
        editUser(() => {
            let newUser = {...user};
            if (props.card.type === 'littleCard') {
                if (e.target.name === 'themeSelector') {
                    newUser.smallCards[`card_${cardProps.cardNum}`].theme = e.target.value
                    newUser.smallCards[`card_${cardProps.cardNum}`].prop = undefined
                } else {
                    newUser.smallCards[`card_${cardProps.cardNum}`].prop = e.target.value
                }
            } else if (props.card.type === 'title') {
                newUser.bigCards.profilePicture[`${e.target.name}`] = e.target.value
            } else if (props.card.type === 'bio') {
                if (e.target.name === 'bioText') {
                    newUser.bigCards.bio = e.target.value
                } else if (e.target.name === 'ethnicity') {
                    const selectedEth = cardProps.backgroundInfo.ethnicity.list;
                    if (e.target.checked && !selectedEth.includes(e.target.value)) {
                        newUser.bigCards.background.ethnicity.list.push(e.target.value);
                        newUser.bigCards.background.ethnicity.edits.push(addManyToManyEdit(e.target.value, true, 'ethnicity'));
                    } else if (!e.target.checked && selectedEth.includes(e.target.value)) {
                        let index = newUser.bigCards.background.ethnicity.list.indexOf(e.target.value);
                        index>=0 && newUser.bigCards.background.ethnicity.list.splice(index, 1);
                        newUser.bigCards.background.ethnicity.edits.push(addManyToManyEdit(e.target.value, false, 'ethnicity'));
                    }
                } else if (e.target.id === 'newLanguageButton') {
                    e.preventDefault()
                    let value = document.querySelector('#newLanguageInput').value;
                    document.querySelector('#newLanguageInput').value = ''
                    newUser.bigCards.background.languages.list.push(value);
                    newUser.bigCards.background.languages.edits.push(addManyToManyEdit(value, true, 'language'));
                } else if (e.target.name === 'language') {
                    let index = newUser.bigCards.background.languages.list.indexOf(e.target.value);
                    index>=0 && newUser.bigCards.background.languages.list.splice(index, 1);
                    newUser.bigCards.background.languages.edits.push(addManyToManyEdit(e.target.value, false, 'language'));
                } else if (e.target.name === 'religion') {
                    newUser.bigCards.background.religion = e.target.value;
                } else if (e.target.name === 'occupation') {
                    newUser.bigCards.background.occupation = e.target.value;
                } else if (e.target.name === 'smoke' || e.target.name === 'alcohol' || e.target.name === 'weed') {
                    newUser.bigCards.lifestyle[`${e.target.name}`] = e.target.checked
                } else if (e.target.name === 'diet') {
                    newUser.bigCards.lifestyle[`${e.target.name}`] = e.target.value
                }
            } else if (props.card.type === 'code') {
                newUser.bigCards.code[`${e.target.name}`] = e.target.value
            } else if (props.card.type === 'hobby') {
                newUser.bigCards.favoriteHobby = e.target.value
            }
            return newUser
        })
    }


    if (props.card.type === 'littleCard') {
        let themeSpecificSelector;
        switch (cardProps.theme) {
            case 'music':
                themeSpecificSelector = (
                    <div className="dropdown">
                        <label htmlFor="musicGenreSelector">Genre:</label>
                        <select value={cardProps.specifics ? cardProps.specifics : ''} onChange={updateLocalUser} name="musicGenreSelector" id="musicGenreSelector">
                            <option hidden disabled value={''}></option>
                            <option value={'Rock'}>Rock</option>
                            <option value={'African'}>African</option>
                            <option value={'Arabic'}>Arabic</option>
                            <option value={'Blues'}>Blues</option>
                            <option value={'Bollywood'}>Bollywood</option>
                            <option value={'Brazilian'}>Brazilian</option>
                            <option value={'Christian'}>Christian</option>
                            <option value={'Classical'}>Classical</option>
                            <option value={'Country'}>Country</option>
                            <option value={'EDM'}>EDM</option>
                            <option value={'Folk'}>Folk</option>
                            <option value={'Francophone'}>Francophone</option>
                            <option value={'Hip-Hop'}>Hip-Hop</option>
                            <option value={'Indie'}>Indie</option>
                            <option value={'J-Pop'}>J-Pop</option>
                            <option value={'Jazz'}>Jazz</option>
                            <option value={'K-Pop'}>K-Pop</option>
                            <option value={'Latin'}>Latin</option>
                            <option value={'Metal'}>Metal</option>
                            <option value={'Pop'}>Pop</option>
                            <option value={'R&B'}>R&B</option>
                            <option value={'Reggae'}>Reggae</option>
                            <option value={'Musicals'}>Musicals</option>
                        </select>
                    </div>
                )
                break
            case 'game':
                themeSpecificSelector = (
                    <div className="dropdown">
                        <label htmlFor="gameSelector">Game:</label>
                        <select value={cardProps.specifics ? cardProps.specifics : ''} onChange={updateLocalUser} name="gameSelector" id="gameSelector">
                            <option hidden disabled value={''}></option>
                            <option value={'civ'}>Sid Meier's Civilization VI</option>
                            <option value={'csgo'}>Counter-Strike: Global Offensive</option>
                            <option value={'minecraft'}>Minecraft</option>
                            <option value={'mw2'}>Call of Duty: Modern Warfare II</option>
                            <option value={'rocketleague'}>Rocket League</option>
                            <option value={'skyrim'}>The Elder Scrolls V: Skyrim</option>
                            <option value={'smash'}>Super Smash Bros. Ultimate</option>
                            <option value={'valorant'}>Valorant</option>
                        </select>
                    </div>
                )
                break
            case 'paradigm':
                themeSpecificSelector = (
                    <div className="dropdown">
                        <label htmlFor="paradigmSelector">Paradigm:</label>
                        <select value={cardProps.specifics ? cardProps.specifics : ''} onChange={updateLocalUser} disabled name="paradigmSelector" id="paradigmSelector">
                            <option hidden disabled value={''}></option>
                            <option value={'music'}>Favorite music genre</option>
                        </select>
                    </div>
                )
                break
            case 'zodiac':
                themeSpecificSelector = (
                    <div className="dropdown">
                        <label htmlFor="zodiacSelector">Sign:</label>
                        <select value={cardProps.specifics ? cardProps.specifics : ''} onChange={updateLocalUser} name="zodiacSelector" id="zodiacSelector">
                            <option hidden disabled value={''}></option>
                            <option value={'aquarius'}>Aquarius</option>
                            <option value={'aries'}>Aries</option>
                            <option value={'cancer'}>Cancer</option>
                            <option value={'capricorn'}>Capricorn</option>
                            <option value={'gemini'}>Gemini</option>
                            <option value={'leo'}>Leo</option>
                            <option value={'libra'}>Libra</option>
                            <option value={'pisces'}>Pisces</option>
                            <option value={'sagittarius'}>Sagittarius</option>
                            <option value={'scorpio'}>Scorpio</option>
                            <option value={'taurus'}>Taurus</option>
                            <option value={'virgo'}>Virgo</option>
                        </select>
                    </div>
                )
                break
            case 'looking_for':
                themeSpecificSelector = (
                    <div className="dropdown">
                        <label htmlFor="lookingForSelector">Looking for:</label>
                        <select value={cardProps.specifics ? cardProps.specifics : ''} onChange={updateLocalUser} name="lookingForSelector" id="lookingForSelector">
                            <option hidden disabled value={''}></option>
                            <option value={'collab'}>Collaboration</option>
                            <option value={'friends'}>Friends</option>
                            <option value={'idk'}>Don't know yet</option>
                            <option value={'job'}>Job</option>
                            <option value={'love'}>Love</option>
                        </select>
                    </div>
                )
                break
            default:
                themeSpecificSelector = undefined
        }
        editor = (<>
                    <div className="dropdown">
                        <label htmlFor="themeSelector">Card theme:</label>
                        <select value={cardProps.theme} onChange={updateLocalUser} name="themeSelector" id="themeSelector">
                            <option value={undefined} selected={cardProps.theme === null} disabled hidden>SELECT THEME</option>
                            <option value={'music'}>Favorite music genre</option>
                            <option value={'game'}>Favorite video game</option>
                            <option value={'paradigm'} disabled>Your programming paradigm</option>
                            <option value={'zodiac'}>Your zodiac sign</option>
                            <option value={'looking_for'}>Intentions</option>
                        </select>
                    </div>
                    {/* {(user.smallCards[`card_${cardProps.cardNum}`].prop) ? "yes" : "no"} */}
                    {themeSpecificSelector}
                </>)
    } else if (props.card.type === 'title') {
        editor = (<>
                    <div style={{width:'100%'}}>
                        <label htmlFor="pfp-url">Image URL:</label>
                        <input id="pfp-url" onChange={updateLocalUser} value={cardProps.profilePic.image} name='image'/>
                    </div>
                    <h3>Transformations</h3>
                    <div className="transformations">
                        <div>
                            <span>Translate X</span>
                            <input type='range' min={-500} max={500} value={cardProps.profilePic.transformX} name='transformX' onChange={updateLocalUser}/>
                            <input type='number' min={-500} max={500} value={cardProps.profilePic.transformX} name='transformX' onChange={updateLocalUser}/>
                        </div>
                        <div>
                            <span>Translate Y</span>
                            <input type='range' min={-500} max={500} value={cardProps.profilePic.transformY} name='transformY' onChange={updateLocalUser}/>
                            <input type='number' min={-500} max={500} value={cardProps.profilePic.transformY} name='transformY' onChange={updateLocalUser}/>
                        </div>
                        <div>
                            <span>Translate scale</span>
                            <input type='range' min={100} max={500} value={cardProps.profilePic.transformScale} name='transformScale' onChange={updateLocalUser}/>
                            <input type='number' min={100} max={500} value={cardProps.profilePic.transformScale} name='transformScale' onChange={updateLocalUser}/>
                        </div>
                    </div>
                </>)
    } else if (props.card.type === 'bio') {
        console.log(user)
        const selectedEth = cardProps.backgroundInfo.ethnicity.list;

        const langList = languages.map(language => <option value={language}/>)
        let curLanguages = user.bigCards.background.languages.list;
        curLanguages = curLanguages.map(language => <label className="toggle-button"><input name="language" onChange={updateLocalUser} value={language} checked type='checkbox'/>{language}</label>)

        editor = (
                    <div className="about-card">
                        <h2>Bio:</h2>
                        <textarea name="bioText" value={cardProps.bioText} onChange={updateLocalUser}></textarea>
                        <h2>Ethnicity:</h2>
                        <div className="ethnicity-container">
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('Black')} value='Black' onChange={updateLocalUser} type='checkbox'/>Black</label>
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('Caucasian')} value='Caucasian' onChange={updateLocalUser} type='checkbox'/>Caucasian</label>
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('East Asian')} value='East Asian' onChange={updateLocalUser} type='checkbox'/>East Asian</label>
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('South Asian')} value='South Asian' onChange={updateLocalUser} type='checkbox'/>South Asian</label>
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('Southeast Asian')} value='Southeast Asian' onChange={updateLocalUser} type='checkbox'/>Southeast Asian</label>
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('Middle Eastern')} value='Middle Eastern' onChange={updateLocalUser} type='checkbox'/>Middle Eastern</label>
                            <label className="toggle-button"><input name="ethnicity" checked={selectedEth.includes('Latin American')} value='Latin American' onChange={updateLocalUser} type='checkbox'/>Latin American</label>
                        </div>
                        <h2>Languages spoken:</h2>
                        <div className="languages">
                            <input list="languages" id="newLanguageInput" name="new_language" placeholder="New"/>
                            <button id="newLanguageButton" onClick={updateLocalUser}>Add</button>
                            <div className="selected-languages">
                                {curLanguages}
                            </div>

                            <datalist id="languages">
                                {langList}
                            </datalist>
                        </div>
                        <h2>Religion:</h2>
                        <div className="religion">
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Catholicism')} value='Catholicism' onChange={updateLocalUser} type='radio'/>Catholicism</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Eastern Orthodoxy')} value='Eastern Orthodoxy' onChange={updateLocalUser} type='radio'/>Eastern Orthodoxy</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Islam')} value='Islam' onChange={updateLocalUser} type='radio'/>Islam</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Buddhism')} value='Buddhism' onChange={updateLocalUser} type='radio'/>Buddhism</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Hinduism')} value='Hinduism' onChange={updateLocalUser} type='radio'/>Hinduism</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Sikh')} value='Sikh' onChange={updateLocalUser} type='radio'/>Sikh</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Atheism')} value='Atheism' onChange={updateLocalUser} type='radio'/>Atheism</label>
                            <label className="toggle-button"><input name="religion" checked={cardProps.backgroundInfo.religion === ('Agnosticism')} value='Agnosticism' onChange={updateLocalUser} type='radio'/>Agnosticism</label>
                        </div>
                        <h2>Occupation:</h2>
                        <div className="occupation">
                            <input value={cardProps.backgroundInfo.occupation} onChange={updateLocalUser} name='occupation'/>
                        </div>
                        <h2>Lifestyle:</h2>
                        <div className="habits">
                            <label className="toggle-button"><input name="alcohol" checked={cardProps.lifestyleInfo.alcohol} onChange={updateLocalUser} type='checkbox'/>I drink</label>
                            <label className="toggle-button"><input name="smoke" checked={cardProps.lifestyleInfo.smoke} onChange={updateLocalUser} type='checkbox'/>I smoke</label>
                            <label className="toggle-button"><input name="weed" checked={cardProps.lifestyleInfo.weed} onChange={updateLocalUser} type='checkbox'/>I use cannabis</label>
                        </div>
                        <h2>Diet:</h2>
                        <div className="diet">
                            <label className="toggle-button"><input name="diet" checked={cardProps.lifestyleInfo.diet === ('Omnivore')} value='Omnivore' onChange={updateLocalUser} type='radio'/>Omnivore</label>
                            <label className="toggle-button"><input name="diet" checked={cardProps.lifestyleInfo.diet === ('Pescetarian')} value='Pescetarian' onChange={updateLocalUser} type='radio'/>Pescetarian</label>
                            <label className="toggle-button"><input name="diet" checked={cardProps.lifestyleInfo.diet === ('Vegetarian')} value='Vegetarian' onChange={updateLocalUser} type='radio'/>Vegetarian</label>
                            <label className="toggle-button"><input name="diet" checked={cardProps.lifestyleInfo.diet === ('Vegan')} value='Vegan' onChange={updateLocalUser} type='radio'/>Vegan</label>
                        </div>
                    </div>
                )
    } else if (props.card.type === 'code') {
        editor = (
            <div>
                <h2>Filename:</h2>
                <input type="text" name="filename" value={cardProps.codeObj.filename} onChange={updateLocalUser}/>
                <h2>Language:</h2>
                <div className="dropdown">
                    <select value={cardProps.codeObj.language} onChange={updateLocalUser} name="language" id="languageSelector">
                        <option hidden disabled value={''}></option>
                        <option value={'Python'}>Python</option>
                        <option value={'C'}>C</option>
                        <option value={'C++'}>C++</option>
                        <option value={'Java'}>Java</option>
                        <option value={'TypeScript'}>TypeScript</option>
                        <option value={'CSS'}>CSS</option>
                        <option value={'JavaScript'}>JavaScript</option>
                    </select>
                </div>
                <h2>Code:</h2>
                <textarea name="code" value={cardProps.codeObj.code} onChange={updateLocalUser}></textarea>
            </div>
        )
    } else if (props.card.type === 'hobby') {
        editor = (
            <>
            <h2>Favorite hobby:</h2>
            <div className="dropdown">
                <select value={cardProps.hobby === null ? undefined : cardProps.hobby} onChange={updateLocalUser} name="favoriteHobby" id="hobbySelector">
                    <option hidden disabled value={undefined}></option>
                    <option value={'winter_sports'}>Winter Sports</option>
                    <option value={'gaming'}>Gaming</option>
                </select>
            </div>
            </>
        )
    }

    return (
        <form className="editor">
            {editor}
            {applyError && 'Something is wrong'}
            <button className={applyError ? 'error' : undefined} onClick={applyUserEdit}>Apply</button>
        </form>
    )
}
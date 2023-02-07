import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function Header(props) {
    const chatOpen = props.inChat
    return (
        <header>
            {!chatOpen? 
            <i id="settings" className="fa-solid fa-gear"></i>
            :
            <Link to='/messages'>
                <i onClick={props.hideArrow} class="fa-solid fa-arrow-left"></i>
            </Link>}
            <h1 id="title">I/O ve</h1>
            <Link to='/profile'>
                <i onClick={props.hideArrow} id="pfp" className="fa-solid fa-user"></i>
            </Link>
        </header>
    )
}
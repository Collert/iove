import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function Header() {
    return (
        <header>
            <i id="settings" className="fa-solid fa-gear"></i>
            <h1 id="title">I/O ve</h1>
            <Link to='/profile'>
                <i id="pfp" className="fa-solid fa-user"></i>
            </Link>
        </header>
    )
}
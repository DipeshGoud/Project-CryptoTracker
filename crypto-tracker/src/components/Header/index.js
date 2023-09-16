import React from "react";
import "./styles.css"
import Button from "../Common/Button";
import TemporaryDrawer from "./drawer";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div className="navbar">
            <Link to={'/'} className="logo">
                CryptoTracker<span style={{ color: "var(--primary)" }}>.</span>
            </Link>
            <div className="links">
                <NavLink to="/">
                    <p className="link">Home</p>
                </NavLink>
                <NavLink to="/compare">
                    <p className="link">Compare</p>
                </NavLink>
                <NavLink to="/watchlist">
                    <p className="link">Watchlist</p>
                </NavLink>
                <NavLink to="/dashboard">
                    <Button text={"Dashboard"} onClick={() => console.log('hii')} outline={true}/>
                </NavLink>
            </div>
            <div className="mobile-drawer">
                <TemporaryDrawer />
            </div>
        </div>
    )
}
import React from "react"
import { useRef, useState } from "react"

import css from "@styles/navbar.module"
import logo from "@images/logo"

export default function NavBar() {

    const [toggled, setToggled] = useState("false")

    const toggleMenu = () => {
        setToggled("true")
    }

    const closeMenu = () => {
        setToggled("false")
    }

    const navMap = [
        { title: "Moex Options", path: "/" },
        { title: "Home", path: "/home" },
        { title: "Blog", path: "/blog" },
        { title: "News", path: "/news" },
    ]

    const navItems = navMap.map((nav, index) => {
        return <li className={css.nav_item} key={index}>
            <a className={css.nav_link} href={nav.path}>{nav.title}</a>
        </li>
    })

    return (
        //  NavBar component definition
        <nav className={css.nav_container} menu-toggled={toggled}>
            <div className={css.logo_container}>
                <img src={logo} alt="website-logo" />
            </div>
            <ul className={css.nav_list} menu-toggled={toggled}>
                {navItems}
            </ul>
            <div className={css.burger_container} onClick={toggleMenu}>
                <div className={css.burger_line}></div>
                <div className={css.burger_line}></div>
                <div className={css.burger_line}></div>
            </div>
            <button className={css.nav_close_btn} onClick={closeMenu} menu-toggled={toggled}></button>
        </nav>
    );
}
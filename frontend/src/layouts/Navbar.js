import React from "react"
import { useRef, useState } from "react"
import axios from "axios"

import css from "@styles/navbar.module"
import logo from "@images/logo"
import userIcon from "@images/usericon"
import pwdIcon from "@images/pwdicon"


export default function NavBar() {

    const [toggled, setToggled] = useState("false")
    const modalRef = useRef()
    const [emailRef, pwdRef] = [useRef(), useRef()]
    const [isError, setError] = useState(false)
    const [isAuthed, setAuthed] = useState(false)

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

    let navItems = navMap.map((nav, index) => {
        return <li className={css.nav_item} key={index}>
            <a className={css.nav_link} href={nav.path}>{nav.title}</a>
        </li>
    })

    async function sendData() {
        try {
            const resp = await axios.post(
                "/api/auth-user", {
                email: emailRef.current.value,
                password: pwdRef.current.value
            })
            modalRef.current.close()
            setAuthed(true)
        } catch (err) {
            setError(true)
        }
    }

    return (
        //  NavBar component definition
        <>
            <nav className={css.nav_container} menu-toggled={toggled}>
                <div className={css.nav_left}>
                    <div className={css.logo_container}>
                        <img src={logo} alt="website-logo" />
                    </div>
                    <ul className={css.nav_list} menu-toggled={toggled}>
                        {navItems}
                    </ul>
                </div>
                {/* right part of navigation part which contains logo and main navigation */}
                <div className={css.nav_right}>
                    {/* if user is not authenticated, show login button otherwise do not */}
                    {!isAuthed && <button className={css.login_btn} onClick={() => modalRef.current.showModal()}>
                        Login
                    </button>}
                    <div className={css.burger_container} onClick={toggleMenu}>
                        <div className={css.burger_line}></div>
                        <div className={css.burger_line}></div>
                        <div className={css.burger_line}></div>
                    </div>
                </div>
                {/* button that should be only rendered once menu for mobile is toggled*/}
                <button className={css.nav_close_btn} onClick={closeMenu} menu-toggled={toggled}></button>
            </nav>
            {/* dialog-popup that opens to prompt login */}
            <dialog ref={modalRef} className={css.login_modal}>

                <button className={css.close_modal_btn}
                    onClick={() => modalRef.current.close()}>
                </button>

                <div className={css.modal_content}>
                    <h3 className={css.login_header}>Hello user &#x1F44B;</h3>

                    <form className={css.login_form} method="dialog">
                        <div className={css.login_field}>
                            <input ref={emailRef} type="email" data-error={isError} placeholder="email" required></input>
                            <img className={css.user_icon} src={userIcon} alt="user icon" />
                        </div>
                        <div className={css.login_field}>
                            <input ref={pwdRef} data-error={isError} type="password" placeholder="password" required></input>
                            <img className={css.pwd_icon} src={pwdIcon} alt="user icon" />
                        </div>
                        <button onClick={sendData}>Submit</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}
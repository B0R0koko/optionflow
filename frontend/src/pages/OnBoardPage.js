import React, { useState, useEffect } from "react"

import NavBar from "@layouts/Navbar"
import ChartComponent from "@layouts/ChartComponent"

import css from "@styles/onboard.module"
import api_image from "@images/api"


export default function OnBoardPage() {

    const [currentPage, setCurrentPage] = useState(0)
    const [hovered, setHovered] = useState(false)
    const totalPages = 2

    useEffect(() => {
        const interval = setInterval(() => {
            if (!hovered) {
                setCurrentPage(currentPage => (currentPage + 1) % totalPages)
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [hovered])

    function onHoverEnter() {
        setHovered(true)
    }

    function onHoverExit() {
        setHovered(false)
    }

    return (
        <div>
            <NavBar />
            <main className={css.main_content}>
                <section className={css.slider}>

                    <div className={css.slide_page}
                        hidden={!(currentPage == 0)}
                        onMouseEnter={onHoverEnter}
                        onMouseLeave={onHoverExit}
                    >

                        <div className={css.text_container}>
                            <h1 className={css.slide_title}>Explore market through options</h1>
                            <p className={css.slide_text}>By Mikhail Mironov</p>
                        </div>
                        <ChartComponent />
                    </div>

                    <div className={css.slide_page}
                        hidden={!(currentPage == 1)}
                        onMouseEnter={onHoverEnter}
                        onMouseLeave={onHoverExit}>
                        <div className={css.text_container}>
                            <h1 className={css.slide_title}>Power you project with our Data API</h1>
                            <p className={css.slide_text}>We provide a sweet of tools that will complement your analysis</p>
                        </div>
                        <img className={css.api_image} src={api_image} alt="api_image" />
                    </div>
                </section>
            </main>
        </div >
    )
}
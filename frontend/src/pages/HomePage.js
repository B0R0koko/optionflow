import React from "react";

import NavBar from "@layouts/Navbar";
import css from "@styles/homepage.module";


export default function HomePage() {
    const articles = []

    for (let i = 0; i < 5; i++) {
        articles.push(
            <div className={css.article_container} key={i}>
                <h3>Title of the article</h3>

                <article>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur labore accusamus consequuntur amet possimus voluptatem vero. Fugiat blanditiis itaque numquam.
                </article>
            </div >
        )
    }

    return <div>
        <NavBar />
        <main className={css.main_container}>
            {articles}
        </main>
    </div>
}

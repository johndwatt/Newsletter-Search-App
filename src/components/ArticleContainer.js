import React, { useState, useEffect } from 'react';
import { DATA_OBJ} from "../api/api_connection"
// import axios from 'axios';

import Article from './Article'
import Search from './Search'

import "../styles/ArticleContainer.css"

function ArticleContainer(props) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let temp = JSON.parse(JSON.stringify(DATA_OBJ));
        setArticles(temp);
    }, []);

    console.log(articles);

    return (
        <main className='article-container'>
            <Search />
            <div className='article-container-display'>
                { articles.length > 0 ? (
                    // PROBLEM HERE: will not display article because each article is a JS object, need to compare to shower thoughts and see what happens there. How to parse properly so that the data can be gathered?
                    // try to set up auth headers and actually get the real data from wordpress site with your password stuff
                    articles.map((article) => {
                        return (
                            <Article 
                            key={article.id} 
                            title={article.title.rendered}
                            author={article.author}
                            date={article.date}
                            link={article.link} />
                        )
                    })
                ) : (
                    <div className='no-articles'>
                        <h3>No articles found!</h3>
                        <p>Please try again later.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ArticleContainer;
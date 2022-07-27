import React, { useState, useEffect } from 'react';
import { API_URL } from "../api/api_connection";

import Article from './Article'
import Search from './Search'
import Loading from './Loading'

import "../styles/ArticleContainer.css"

function ArticleContainer(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatDateStr = function (str) {
        const dateObj = new Date(str);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }
    
    const formatAuthorStr = function (str) {
        let author = str.match(/<em>by(.*?)</i);
        if (author) {
            return `by ${author[1]}`
        } else {
            return "Spotlight";
        }
    }

    useEffect(() => {
        const getData = async function () {
            try {
                setLoading(true);
                let response = await fetch(`${API_URL}/pages`);
                let data = await response.json();
                let dataMod = await data.map((article) => {
                    return {
                        date: formatDateStr(article.date),
                        title: article.title.rendered,
                        author: formatAuthorStr(article.content.rendered),
                        link: article.link,
                        id: article.id,
                    } 
                });
                setLoading(false);
                return setArticles(dataMod);
            } catch(error) {
                console.error(error);
            }
        }

        getData();

    }, []);

    // console.log("ARTICLES:", articles);

    return (
        <main className='article-container'>
            <Search />
            { loading ? (
                <Loading />
            ) : (
                <div className='article-container-display'>
                    { articles.length > 0 ? (
                        // try to set up auth headers and actually get the real data from wordpress site with your password stuff
                            // working currently, but may break, make sure you are signed into browser
                        articles.map((article) => {
                            return (
                                <Article 
                                key={article.id}
                                title={article.title}
                                author={article.author}
                                date={article.date}
                                link={article.link} />
                            )
                        })
                    ) : (
                        <div className='no-articles'>
                            <h3>No articles found with that search criteria!</h3>
                            <p>Please use a different search term or try again later.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default ArticleContainer;
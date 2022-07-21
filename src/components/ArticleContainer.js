import React, { useState, useEffect } from 'react';
import { DATA_OBJ} from "../api/api_connection"
// import axios from 'axios';

import Article from './Article'
import Search from './Search'

import "../styles/ArticleContainer.css"

function ArticleContainer(props) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const formatDateStr = function (str) {
            const dateObj = new Date(str);
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
        }
        
        const formatAuthorStr = function (str) {
            let author = str.match(/<em>by(.*?)</i);
            if (author) {
                return author[1]
            } else {
                return "Spotlight";
            }
        }
        
        const formatTitleStr = function (str, alt) {
            let title = str.match(/<h1>(.*?)</i);
            if (title) {
                return title[1];
            } else {
                return alt;
            }
        }

        let data = JSON.parse(JSON.stringify(DATA_OBJ));

        let dataMod = data.map((article) => {
            return {
                date: formatDateStr(article.date),
                title: formatTitleStr(article.content.rendered, article.title.rendered),
                author: formatAuthorStr(article.content.rendered),
                link: article.link,
                id: article.id,
            } 
        });
        setArticles(dataMod);

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
                        // console.log(article);
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
                        <h3>No articles found!</h3>
                        <p>Please try again later.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ArticleContainer;
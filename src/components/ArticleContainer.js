import React, { useState, useEffect } from 'react';
import { API_URL } from "../api/api_connection";

import Article from './Article'
import Loading from './Loading'

import "../styles/ArticleContainer.css"
import "../styles/Search.css"

function ArticleContainer(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

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

    /**
     * Sets search query to value of search input on page.
     * @param {Object} e Event Object.
     */
    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }
    
    /**
     * Clears search state/input and sends request to reload articles page.
     * @param {Object} e Event Object.
     */
    const handleClearSearch = async (e) => {
        e.preventDefault();

        setSearch("");
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
        setArticles(dataMod);

        setLoading(false);
    }
        
    /**
     * Sends equest with search query and loads returned articles.
     * @param {Object} e Event object.
     */
    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);

        let response = await fetch(`${API_URL}/pages?search=${search}`);
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
        setArticles(dataMod);

        setLoading(false);
    }

    return (
        <main className='article-container'>
            <div className='search-container'>
                <form>
                    <input 
                        name="search" 
                        type="search"
                        value={search}
                        onChange={handleSearchInput}
                        placeholder="Search titles, authors, and key words" />
                    <div className='search-btns'>
                        <button 
                            type="submit" 
                            className='search-button'
                            onClick={handleSearch}>
                            Search
                        </button>
                        <button
                            className='clear-button'
                            onClick={handleClearSearch}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
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
                            <h3>No articles found with that search criteria.</h3>
                            <p>You could try different search terms.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}

export default ArticleContainer;
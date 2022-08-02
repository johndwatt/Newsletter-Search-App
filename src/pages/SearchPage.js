import React, { useState, useEffect } from 'react';
import { API_URL } from "../api/api_connection";

import Article from '../components/Article';
import Loading from '../components/Loading';
import NoArticles from '../components/NoArticles';

import "../styles/SearchPage.css";

function SearchPage(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [err, setErr] = useState(null);

    /**
     * Formats ISO-8601 date string to display year and abbreviated month (three characters). Converts string to date object, then formats with string interpolation. 
     * @param {String} str Date string in ISO-8601 format. Example: "2022-07-20T08:32:39".
     * @returns Formatted date string as "Mon Year". 
     */
    const formatDateStr = function (str) {
        const dateObj = new Date(str);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }
    
    /**
     * Formats author string from Wordpress page content using regex.
     * @param {String} str Large block of Wordpress HTML content in string format.
     * @returns String with extracted author name or "Spotlight" if no author is found. 
     */
    const formatAuthorStr = function (str) {
        let author = str.match(/<em>by(.*?)</i);
        if (author) {
            return `by ${author[1]}`
        } else {
            return "Spotlight";
        }
    }

    useEffect(() => {
        /**
         * Sends request to Wordpress REST API for latest 10 articles and formats returned articles. 
         * @returns Modified data as article state. 
         */
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
     * Clears search state/input and sends request to reload articles.
     * @param {Object} e Event Object.
     */
    const handleClearSearch = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSearch("");
        setPage(1);
        setErr(null);

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
     * Sends request to Wordpress REST API with search query and loads formatted returned articles.
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
        setPage(1);
        setArticles(dataMod);
        setLoading(false);
    }

    /**
     * Clears search state/input and sends request to reload articles.
     * @param {Object} e Event Object.
     */
    const handleNextPage = async (e) => {
        e.preventDefault();

        setLoading(true);

        let response = null;
        if (search){
            response = await fetch(`${API_URL}/pages?search=${search}&page=${page+1}`);
        } else {
            response = await fetch(`${API_URL}/pages?page=${page+1}`);
        }
        let data = await response.json();
        if (response.status === 200) {
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
        } else {
            setErr(data.message);
            setArticles([]);
        }
        setPage(page+1);
        setLoading(false);
    }

    /**
     * Clears search state/input and sends request to reload articles.
     * @param {Object} e Event Object.
     */
    const handlePrevPage = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErr(null);

        let currentPage = page;
        if (currentPage - 1 < 1) {
            currentPage = 1;
        } else {
            currentPage--;
        }

        let response = null;
        if (search){
            response = await fetch(`${API_URL}/pages?search=${search}&page=${currentPage}`);
        } else {
            response = await fetch(`${API_URL}/pages?page=${currentPage}`);
        }
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
        setPage(currentPage);
        setArticles(dataMod);
        setLoading(false);
    }

    return (
        <main className='search-page'>
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
            <div className='article-container'>
            { loading ? (
                <Loading />
            ) : (
                <div className='article-container'>
                    { err ? (
                        <div className='error-container'>
                            <div className='no-articles'>
                                <h3>{err}</h3>
                                <p>Please return to the previous page or select clear above.</p>
                            </div>
                            <form className='pagination-container'>
                                <button
                                    onClick={handlePrevPage}>
                                    Prev
                                </button>
                                <p className='current-page'>{page}</p>
                                <button
                                    className='disabled'
                                    disabled>
                                    Next
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className='results-container'>
                        { articles.length > 0 ? (
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
                            <NoArticles />
                        )}
                            <form className='pagination-container'>
                                { page === 1 ? (
                                    <button
                                        className='disabled'
                                        disabled>
                                        Prev
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePrevPage}>
                                        Prev
                                    </button>
                                )}
                                <p className='current-page'>{page}</p>
                                <button
                                    onClick={handleNextPage}>
                                    Next
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
            </div>
        </main>
    );
}

export default SearchPage;
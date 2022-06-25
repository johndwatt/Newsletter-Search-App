import React from 'react';

import Article from './Article'
import Loading from './Loading'
import Search from './Search'

import "../styles/ArticleContainer.css"

function ArticleContainer(props) {
    return (
        <main className='article-container'>
            <Search />
            <Article />
            <Article />
            <Loading />
            <Loading />
        </main>
    );
}

export default ArticleContainer;
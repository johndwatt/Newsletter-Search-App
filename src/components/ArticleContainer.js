import React from 'react';

import Article from './Article'
import Loading from './Loading'

import "../styles/ArticleContainer.css"

function ArticleContainer(props) {
    return (
        <main className='article-container'>
            <Article />
            <Article />
            <Loading />
            <Loading />
        </main>
    );
}

export default ArticleContainer;
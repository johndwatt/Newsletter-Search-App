import React from 'react';

import "../styles/Article.css"

function Article(props) {
    return (
        <a href="" className='article-link'>
            <section className='article-box'>
                <h3 className='article-title'>Title Here: The title is longer</h3>
                <p className='article-author'>by Author Here</p>
            </section>
        </a>
    );
}

export default Article;
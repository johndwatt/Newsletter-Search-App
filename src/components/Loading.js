import React from 'react';

import "../styles/Article.css"
import "../styles/Loading.css"

function Loading(props) {
    return (
        <div className='loading-container'>
            <section className='article-box loading-box'>
                <h3 className='article-title loading'>Loading Title...</h3>
                <p className='article-author loading'>Loading Author...</p>
            </section>
        </div>
    );
}

export default Loading;
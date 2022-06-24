import React from 'react';

import "../../styles/Article.css"

function Loading(props) {
    return (
        <div className='loading-container'>
            <section className='article-box'>
                <h3 className='article-title'>Loading Title...</h3>
                <p className='article-author'>Loading Author...</p>
            </section>
        </div>
    );
}

export default Loading;
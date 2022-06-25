import React from 'react';

import "../styles/Article.css"

function Article(props) {
    return (
        <a href="" className='article-link'>
            <section className='article-box'>
                <div className='flex'>
                    <h3 className='article-title'>Title Here: The title is longer</h3>
                    <p className='article-author'>Date 2022</p>
                </div>
                <div className='flex'>
                    <p className='article-author'>by Author Here</p>
                    <p className='article-author'>Section</p>
                </div>

            </section>
        </a>
    );
}

export default Article;
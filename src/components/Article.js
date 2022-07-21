import React from 'react';

import "../styles/Article.css"

function Article(props) {

    // const [title, setTitle] = useState("");
    // const [author, setAuthor] = useState("");
    // const [date, setDate] = useState("");

    // useEffect(() => {
    //     const formatDateStr = function (str) {
    //         const dateObj = new Date(str);
    //         let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    //         return `${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    //     }
        
    //     const formatAuthorStr = function (str) {
    //         let author = str.match(/by (.*?)</i)[1]
    //         return author;
    //     }
        
    //     const formatTitleStr = function (str) {
    //         let title = str.match(/<h1>(.*?)</i)[1]
    //         return title;
    //     }

    //     setDate(formatDateStr(props.article.date));
    //     setTitle(formatTitleStr(props.article.title));
    //     setAuthor(formatAuthorStr(props.atticle.content.rendered));
    // }, []);
    

    return (
        <a href={props.link} className='article-link'>
            <section className='article-box'>
                <div className='flex'>
                    <h3 className='article-title'>{props.title}</h3>
                    <p className='article-date'>{props.date}</p>
                </div>
                <div className='flex'>
                    <p className='article-author'>by {props.author}</p>
                    <p className='article-section'>Section</p>
                </div>

            </section>
        </a>
    );
}

export default Article;
import React from 'react';

import "../styles/Search.css"

function Search(props) {
    return (
        <div className='search-container'>
            <form>
                <input 
                    name="search" 
                    type="search"
                    value=""
                    placeholder="Search" />
                <div className='search-btns'>
                    <button 
                        type="submit" 
                        className='search-button'
                        onClick="">
                        Search
                    </button>
                    <button
                        className='clear-button'
                        onClick="">
                        Clear
                    </button>
                </div>

            </form>
        </div>
    );
}

export default Search;
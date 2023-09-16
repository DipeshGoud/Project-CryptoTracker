import React from 'react';
import './styles.css';
import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Search(props) {
    // Destructure the props to access search and onSearchChange
    const { search, onSearchChange } = props;

    return (
        <div className='search-flex'>
            <SearchRoundedIcon /> {/* Search icon */}
            <input 
                className='search-input' 
                type='text' 
                value={search} // The value of the input field is controlled by the search prop
                placeholder='Search' 
                onChange={(e) => onSearchChange(e)} // Call the onSearchChange function when the input changes
            />
        </div>
    );
}

export default Search;

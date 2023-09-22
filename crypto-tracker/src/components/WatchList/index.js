import React, { useState } from 'react';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './styles.css';

function Watchlist({ coinId }) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    // Function to handle adding/removing from watchlist
    const handleToggleWatchlist = () => {
        // Get the current watchlist from local storage or initialize as an empty array
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Check if the coinId is already in the watchlist
        if (watchlist.includes(coinId)) {
            // If it's in the watchlist, remove it
            const updatedWatchlist = watchlist.filter((id) => id !== coinId);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            setIsInWatchlist(false);
        } else {
            // If it's not in the watchlist, add it
            watchlist.push(coinId);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            setIsInWatchlist(true);
        }
    };

    // Check if the coinId is in the watchlist when the component mounts
    React.useEffect(() => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setIsInWatchlist(watchlist.includes(coinId));
    }, [coinId]);

    return (
        <>
            {isInWatchlist ? (
                <div className='watchlist-icon-container'>
                    <StarRoundedIcon
                        onClick={handleToggleWatchlist}
                        style={{ color: 'var(--primary)', cursor: 'pointer' }}
                    />
                </div>
            ) : (
                <div className='watchlist-icon-container gray'>
                    <StarRoundedIcon
                        onClick={handleToggleWatchlist}
                        style={{ color: 'gray', cursor: 'pointer' }}
                    />
                </div>
            )}
        </>
    );
}

export default Watchlist;

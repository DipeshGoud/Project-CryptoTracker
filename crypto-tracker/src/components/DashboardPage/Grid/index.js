import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
import Watchlist from '../../WatchList';
import { motion } from "framer-motion";


function Grid({ coin }) {
    return (<motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
            type: 'smooth',
            duration: 0.5,
        }}>
        <Link to={`/coin/${coin.id}`}>
            <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
                <div className='info-flex'>
                    <img src={coin.image} className='coin-logo' />
                    <div className='name-col'>
                        <p className='coin-symbol'>{coin.symbol}</p>
                        <p className='coin-name'>{coin.name}</p>
                    </div>
                    <div className='watchlist-container'><Watchlist coinId={coin.id} /></div>
                </div>
                {coin.price_change_percentage_24h > 0 ?
                    (<div className='chip-flex'>
                        <div className='price-chip'>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className='icon-chip'>
                            <TrendingUpRoundedIcon />
                        </div>
                    </div>) :
                    (<div className='chip-flex'>
                        <div className='price-chip chip-red'>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className='icon-chip-red'>
                            <TrendingDownRoundedIcon />
                        </div>
                    </div>
                    )}
                <div className='info-container'>
                    <h3 className='coin-price' style={{
                        color:
                            coin.price_change_percentage_24h < 0
                                ? "var(--red)"
                                : "var(--green)"
                    }}>${coin.current_price.toLocaleString()}</h3>
                    <p className='total_volume_marketcap'>Total Volume : {coin.total_volume.toLocaleString()}</p>
                    <p className='total_volume_marketcap'>Market Cap : ${coin.market_cap.toLocaleString()}</p>
                </div>
            </div>
        </Link>
    </motion.div>
    );
}

export default Grid;

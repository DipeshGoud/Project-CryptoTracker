import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';
import Watchlist from '../../WatchList';
import { motion } from "framer-motion";

function List({ coin, Key }) {
    return (
        <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
            type: 'smooth',
            duration: 0.5,
        }}>
            <Link to={`/coin/${coin.id}`}>
                <tr className='list-row'>
                    <Tooltip title='Logo'>
                        <td className='td-image'>
                            <img src={coin.image} className='coin-logo' />
                        </td>
                    </Tooltip>

                    <td>
                        <div className='name-col'>
                            <Tooltip title='Symbol'><p className='coin-symbol'>{coin.symbol}</p></Tooltip>
                            <Tooltip title="Name"><p className='coin-name'>{coin.name}</p></Tooltip>
                        </div>
                    </td>

                    <Tooltip title="Price Change">
                        {coin.price_change_percentage_24h > 0 ?
                            (<td className='chip-flex'>
                                <div className='price-chip'>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </div>
                                <div className='icon-chip td-icon'>
                                    <TrendingUpRoundedIcon />
                                </div>
                            </td>) :
                            (<td className='chip-flex'>
                                <div className='price-chip chip-red'>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </div>
                                <div className='icon-chip-red td-icon'>
                                    <TrendingDownRoundedIcon />
                                </div>
                            </td>
                            )}
                    </Tooltip>

                    <Tooltip title='Current Price'>
                        <td >
                            <h3 className='coin-price center-align' style={{
                                color:
                                    coin.price_change_percentage_24h < 0
                                        ? "var(--red)"
                                        : "var(--green)"
                            }}>
                                ${coin.current_price.toLocaleString()}</h3>
                        </td>
                    </Tooltip>

                    <td className='td-volume'>
                        <Tooltip title='Total Volume'><p className='total_volume_marketcap td-volume right-align'>{coin.total_volume.toLocaleString()}</p></Tooltip>
                    </td>

                    <td className='desktop-tmk'>
                        <Tooltip title='Market Cap'><p className='total_volume_marketcap right-align'>
                            {coin.market_cap.toLocaleString()}</p></Tooltip>
                    </td>

                    <td className='mobile-tmk'>
                        <Tooltip title='Market Cap'><p className='total_volume_marketcap right-align'>
                            {convertNumber(coin.market_cap)}</p></Tooltip>
                    </td>

                    <td className='watchlist'>
                        <Watchlist coinId={coin.id} />
                    </td>
                </tr>
            </Link>
        </motion.div>
    );
}

export default List
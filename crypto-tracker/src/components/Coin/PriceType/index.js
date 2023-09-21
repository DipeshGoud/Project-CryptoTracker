import React from 'react';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './styles.css';

export default function TogglePriceType({priceType, handlePriceTypeChange}) {
   

    return (
        <div className='toggle-prices'>
            <ToggleButtonGroup
                value={priceType}
                exclusive
                onChange={handlePriceTypeChange}
                aria-label="text alignment"
                sx={{
                    "&Mui-selected": {
                        color: "var(--primary) !important",
                    },
                    borderColor: "var(--primary)",
                    border: "unset !important",
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "1px solid var(--primary) !important",
                        color: "var(--primary) !important",
                    },
                    "& .MuiToggleButton-standard": {
                        color: "var(--primary) !important",
                    },
                }}
            >
                <ToggleButton value="prices" className='toggle-btn'>
                    Price
                </ToggleButton>
                <ToggleButton value="market_caps" className='toggle-btn'>
                    Market Cap
                </ToggleButton>
                <ToggleButton value="total_volumes" className='toggle-btn'>
                    Total Volume
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
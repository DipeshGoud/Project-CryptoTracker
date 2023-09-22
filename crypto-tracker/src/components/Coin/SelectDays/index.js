import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css";

export default function SelectDays({days, handleDaysChange, noPtag}) {
    
    return (
        <div className="select-days">
            {!noPtag && <p>Price Change In</p>}
            <Select
                sx={{
                    height: "2.5rem",
                    color: "var(--white)",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--white)"
                    },
                    "& .MuiSvgIcon-root": {
                        color: "var(--white)"
                    },
                    "&:hover": {
                        "& fieldset": {
                            borderColor: "#3a80eg"
                        }
                    }
                }}

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={days}
                label="Days"
                onChange={handleDaysChange}
            >
                <MenuItem value={7}>7 Days</MenuItem>
                <MenuItem value={30}>30 Days</MenuItem>
                <MenuItem value={60}>60 Days</MenuItem>
                <MenuItem value={90}>90 Days</MenuItem>
                <MenuItem value={120}>120 Days</MenuItem>
                <MenuItem value={240}>240 Days</MenuItem>
            </Select>
        </div>
    );
}

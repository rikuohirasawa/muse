import styled from 'styled-components'
import { useState, useRef } from 'react'
import {GrPowerReset} from 'react-icons/gr'
import { Slider } from '@mui/material'

export const YearSlider = () => {

const [yearFilter, setYearFilter] = useState(0);
const styles = {
    color: {
        color: 'inherit',
        textAlign: 'center',
    },
    font: {
        fontFamily: 'inherit'
}, 
    input: {
        padding: '2px 6px',
        textDecoration: 'none',
        fontFamily: 'inherit',
        border: '1px solid #E3E2E2'
    },
    inputLabel: {
        fontWeight: '700',
        fontFamily: 'inherit',
        margin: '8px 0'

    }
}
return (
    <>
    <Slider 
aria-label='Select year'
onChange={(e)=>{setYearFilter(e.target.value)}}
size='small'
style={styles.color}
min={1000}
max={2022}
value={yearFilter}
/>
{/* kind of messy looking logic here for rendering, but as 0 returns falsy, yearFilter will not render at initial state */}
<div className='year-filter'>{yearFilter}<YearResetBtn onClick={(e)=>{
    e.preventDefault()
    setYearFilter(0)
    }}><GrPowerReset/></YearResetBtn></div>
    </>
)
}

const YearResetBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: inherit;
    font-family: inherit;
    border: none;
    cursor: pointer;
        transition: all .2s ease-in-out;
    &:hover,
    &:focus {
    transform: scale(1.1)
    };
    `
import styled from 'styled-components'
// import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel, Checkbox, FormGroup, Typography, Slider, Input } from '@mui/material'
import {BsFilter} from 'react-icons/bs'
import {GrPowerReset} from 'react-icons/gr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const SideBar = () => {

    const [yearFilter, setYearFilter] = useState(null);
    const [filterAlert, setFilterAlert] = useState(0);
    const navigate = useNavigate();
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

    const submitFilter = (e) => {
        e.preventDefault();
        console.log('form submitted');
        const form = new FormData(document.forms.filterForm);
        let valueArray = [];
        for (const value of form.values()){
            // add condition here because there was an empty string being pushed to valueArray otherwise
            if (value) {
                valueArray.push(value)
            } 
        }
        if (yearFilter) {
            valueArray.push(yearFilter)
            console.log(valueArray)
        }
        if (valueArray.join('')) {
            console.log(valueArray.join(''))
            setFilterAlert(false);
            navigate(`/collection/${valueArray.join(', ')}`);
        } else {
            setFilterAlert(true);
        }
        console.log(valueArray.join(','))
        // console.log(form.getAll('category'))
    }

    return (
        <FlexColumn>
            <FilterForm id='filterForm' onSubmit={(e)=>{submitFilter(e)}}>
            <SearchSelect >
                <div className='title'>Categories</div>
                <FormControlLabel control={<Check name='category' value='Modern Art' style={styles.color}/>} label={<Typography style={styles.font}>Modern Art</Typography>}/>
                <FormControlLabel control={<Check name='category' value='Prints and Drawings' style={styles.color}/>} label={<Typography style={styles.font}>Prints and Drawings</Typography>}/>
                <FormControlLabel control={<Check name='category' value='Women Artists' style={styles.color}/>} label={<Typography style={styles.font}>Women artists</Typography>}/>
                <FormControlLabel control={<Check name='category' value='Contemporary Art' style={styles.color}/>} label={<Typography style={styles.font}>Contemporary Art</Typography>}/>
                <FormControlLabel control={<Check name='category' value='Arts of Asia' style={styles.color}/>} label={<Typography style={styles.font}>Arts of Asia</Typography>}/>
                <div className='title'>Artists</div>
                <FormControlLabel control={<Check name='artist' value='Frida Kahlo' style={styles.color}/>} label={<Typography style={styles.font}>Frida Kahlo</Typography>}/>
                <FormControlLabel control={<Check name='artist' value='Pablo Picasso' style={styles.color}/>} label={<Typography style={styles.font}>Pablo Picasso</Typography>}/>
                <FormControlLabel control={<Check name='artist' value='Gabor Peterdi' style={styles.color}/>} label={<Typography style={styles.font}>Gabor Peterdi</Typography>}/>
                <FormControlLabel control={<Check name='artist' value='Grant Wood' style={styles.color}/>} label={<Typography style={styles.font}>Grant Wood</Typography>}/>
                <div className='title'>Year</div>
                <Slider 
                aria-label='Select year'
                onChange={(e)=>{setYearFilter(e.target.value)}}
                size='small'
                style={styles.color}
                min={1000}
                max={2022}
                />
                {/* kind of messy looking logic here for rendering, but as 0 returns falsy, yearFilter will not render at initial state */}
                <div className='year-filter'>{yearFilter ? yearFilter : 0}<YearResetBtn onClick={()=>{setYearFilter(0)}}><GrPowerReset/></YearResetBtn></div>
                
                <FormControlLabel control={<Input name='customSearch' style={styles.input} disableUnderline='true' placeholder='e.g. Cats' size='small'/>} label={<Typography style={styles.inputLabel}>Custom Search</Typography>} labelPlacement='top'/>
                <FilterButton type='submit'><BsFilter/> Filter</FilterButton>
            </SearchSelect>
            </FilterForm>
        </FlexColumn>

    )
}

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #E3E2E2;
    height: 100vh;
    width: 350px;
    `

const FilterForm = styled.form`
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .title {
        font-weight: 700;
        width: 100%;
}
    .year-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
    }
    `

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

const SearchSelect = styled(FormGroup)`
text-align: center;
`

const Check = styled(Checkbox)`
`

const CustomSearch = styled.form`
    display: flex;`

const CustomInput = styled.input`
    font-family: inherit;
    &:focus {
        outline: none;
    }`

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    background: inherit;
    border: none;
    font-size: 1.5rem;


    cursor: pointer;
    `

const FilterButton = styled.button`
    margin: 16px 0; 
    padding: 4px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: inherit;
    font-family: inherit;
    border: none;
    font-size: inherit;
    gap: 8px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    
    &:hover,
    &:focus {
    transform: scale(1.05)
    };
`

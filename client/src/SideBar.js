import styled from 'styled-components'
import { FormControlLabel, Checkbox, FormGroup, Typography, Slider, Input } from '@mui/material'
import {BsFilter} from 'react-icons/bs'
import {GrPowerReset} from 'react-icons/gr'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

export const SideBar = () => {
    const [sidebarDisplay, setSidebarDisplay] = useState(false);
    const [yearFilter, setYearFilter] = useState(0);
    const { isAuthenticated } = useAuth0();
    
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
        },
        showSidebar: {
            width: '350px'
        },
        hideSidebar: {
            width: '0px'
        },
        buttonHide: {
            width: '35px'
        },
        buttonShow: {
            width: '50px',
        },
        hideForm: {
            opacity: '0',
            zIndex: '-1'
        },
        displayForm: {
            opacity: '1',
            zIndex: '1'
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
        }
        if (valueArray.join('')) {
            navigate(`/collection/${valueArray.join(', ')}`);
        }
    }

    return (
        <Wrapper>
        <SideBarToggle style={sidebarDisplay ? styles.showSidebar : styles.hideSidebar}>
            <FilterForm id='filterForm' onSubmit={(e)=>{submitFilter(e)}} style={sidebarDisplay ? styles.displayForm : styles.hideForm}>
            <SearchSelect>
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
                    value={yearFilter}
                    />
                    <div className='year-filter'>{yearFilter}<YearResetBtn onClick={(e)=>{
                        e.preventDefault();
                        setYearFilter(0);
                        }}><GrPowerReset/></YearResetBtn></div>
                {isAuthenticated ? 
                 <FormControlLabel control={<Input name='customSearch' style={styles.input} disableUnderline={true} placeholder='e.g. Cats' size='small'/>} label={<Typography style={styles.inputLabel}>Custom Search</Typography>} labelPlacement='top'/>
                :
                <FormControlLabel control={<Input disabled='true' name='customSearch' style={styles.input} disableUnderline={true} size='small'/>} label={<Typography style={styles.inputLabel}>Log in to custom search</Typography>} labelPlacement='top'/>
                }
               
                <FilterButton type='submit'><BsFilter/> Filter</FilterButton>
            </SearchSelect>
            </FilterForm>
        </SideBarToggle>
        <ToggleDisplay 
        onClick={()=>{
            sidebarDisplay ?
            setSidebarDisplay(false)
            :
            setSidebarDisplay(true)
        }}
        style={
            sidebarDisplay ?
            styles.buttonHide
            :
            styles.buttonShow
            }>
            {sidebarDisplay ?
            <>
            <IoIosArrowBack/>
            </>
            : 
            <>
            <IoIosArrowForward/>
            <IoIosArrowForward/>
            </>}
        </ToggleDisplay>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    border-right: 1px solid #E3E2E2;
`

const SideBarToggle = styled.div`
    transition: all 0.5s ease-in-out;
    min-height: 100vh;
    border-right: 1px solid #E3E2E2;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: all 0.5s ease-in-out;

    justify-content: space-between;

`

const ToggleDisplay = styled.button`
    height: 100vh;
    transition: all 0.5s ease-in-out;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    background: inherit;

`

const FilterForm = styled.form`
    transition: all 0.2s ease-in-out;
    padding: 16px 0px;
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



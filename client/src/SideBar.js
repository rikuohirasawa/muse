import styled from 'styled-components'
// import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel, Checkbox, FormGroup, Typography } from '@mui/material'

export const SideBar = () => {
    const styles = {
        color: {
            color: 'black',
        },
        font: {
            fontFamily: 'Raleway, sans-serif'
    }
}

    return (
        <FlexColumn>
            <SearchSelect>
                <div>Categories</div>
                <FormControlLabel control={<Check name='modern-art' style={styles.color}/>} label={<Typography style={styles.font}>Modern Art</Typography>}/>
                <FormControlLabel control={<Check name='prints-and-drawings' style={styles.color}/>} label={<Typography style={styles.font}>Prints and Drawings</Typography>}/>
                <FormControlLabel control={<Check name='women-artists' style={styles.color}/>} label={<Typography style={styles.font}>Women artists</Typography>}/>
                <FormControlLabel control={<Check name='contemporary-art' style={styles.color}/>} label={<Typography style={styles.font}>Contemporary Art</Typography>}/>
                <FormControlLabel control={<Check name='arts-of-asia' style={styles.color}/>} label={<Typography style={styles.font}>Arts of Asia</Typography>}/>
                <div>Artists</div>
                <FormControlLabel control={<Check name='frida-kahlo' style={styles.color}/>} label={<Typography style={styles.font}>Frida Kahlo</Typography>}/>
                <FormControlLabel control={<Check name='pablo-picasso' style={styles.color}/>} label={<Typography style={styles.font}>Pablo Picasso</Typography>}/>
            </SearchSelect>
        </FlexColumn>
    )
}

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #E3E2E2;
    height: 100vh;
    `

const SearchSelect = styled(FormGroup)`
font-family: inherit;

.category {
}
`

const Check = styled(Checkbox)`
`

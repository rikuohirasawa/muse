import styled from 'styled-components'

export const SideBar = () => {
    return (
        <FlexColumn>
            <CategorySelect>
                <div className='checkboxy'><Checkbox type='checkbox' style={{color: 'black',
            background: 'black'}}/></div>
     
            </CategorySelect>
        </FlexColumn>
    )
}

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #E3E2E2;
    height: 100vh;
    `

const CategorySelect = styled.form`
`

const Checkbox = styled.input`
checkmark: {
    color: black;
    border: black;
    background-color: black;
}
&::after {
    color: black;
    border: black;
    background: black;
}`



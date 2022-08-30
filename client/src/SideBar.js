import styled from 'styled-components'

export const SideBar = () => {
    return (
        <FlexColumn>
            <CategorySelect></CategorySelect>
        </FlexColumn>
    )
}

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid #E3E2E2;
    `

const CategorySelect = styled.div``


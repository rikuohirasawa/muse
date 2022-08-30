import { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Raleway', sans-serif;
        /* color: #000000;
        background: #fff; */
    }`

export const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid #E3E2E2;
    /* rgba(255, 255, 255, 0.3); */
    margin: 4px 0;`

export const LinkPath = styled(Link)`
color: inherit;
text-decoration: none;

&:hover {
    text-decoration: underline;
}
`
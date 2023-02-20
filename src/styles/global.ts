import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
        padding: 0;
        margin: 0;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
    }
    html {
        font-family: 'Roboto', sans-serif;
        @media (max-width: 1290px) {
            font-size: 93.75%; 
        }
        @media (max-width: 1000px) {
            font-size: 87.50%; 
        }
    }
    body {
        -webkit-font-smoothing: antialiased;
    }
    body, input, textarea, button {
        font-family: 'Manrope', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
    button, a {
        cursor: pointer;
    }
    img {
        display: block;
        max-width: 100%;
    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
 
`;
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    
    body {
        font-family: 
		   'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo', 
		   '맑은 고딕', 'malgun gothic',
		   'Microsoft NeoGothic', 
		   'Droid sans', sans-serif;
        margin: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fafafa;
        font-size: 14px;
    }
    * {
        box-sizing: border-box;
        letter-spacing: -0.3px;
    }

    a {
        text-decoration: none;
        font-size: 0;
        color: black;
    }
    button,
    input {
        outline: none;
        border: none;
    }
    button,
    textarea {
        font-family:
		   'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo', 
		   '맑은 고딕', 'malgun gothic',
		   'Microsoft NeoGothic', 
		   'Droid sans', sans-serif;
        &::placeholder {
            font-family:
		   'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo', 
		   '맑은 고딕', 'malgun gothic',
		   'Microsoft NeoGothic', 
		   'Droid sans', sans-serif;
      }
    }
`;
export default GlobalStyle;

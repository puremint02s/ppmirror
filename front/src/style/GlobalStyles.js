import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  #root {
    width: 100%;
    margin: 0 auto;
  }
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.borderColor};
  }
  a {
    text-decoration: none;
    font-weight: 700;
  }
  .nav {
    background: ${({ theme }) => theme.bgColor};
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
  }
  .card {
    background: ${({ theme }) => theme.card};
  }
  .card-text {
    margin: 20px auto;
  }
  .form-control {
    background: ${({ theme }) => theme.input};
    color: ${({ theme }) => theme.textColor};
    &:focus {
      background: ${({ theme }) => theme.input};
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.borderColor};
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
  }
  span {
    line-height: 20px;
  }
`;

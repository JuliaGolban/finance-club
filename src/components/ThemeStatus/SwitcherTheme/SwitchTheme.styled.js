import styled, { keyframes } from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

const fadeInTopAnimation = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const BtnChangeTheme = styled.button`
  color: ${props => props.theme.white_text};
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  & svg {
    fill: currentColor;
  }
`;

const SwitcherWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  animation: ${fadeInTopAnimation} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    position: absolute;
    top: 5px;
    left: 68px;
  }
`;

export { BtnChangeTheme, SwitcherWrapper };

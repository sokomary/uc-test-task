import { CSSProperties, FC, MouseEventHandler, PropsWithChildren } from "react";
import styled from "styled-components";

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

const Button: FC<Props> = (props) => (
  <StyledButton
    style={props.style}
    className={props.className}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </StyledButton>
);

const StyledButton = styled.div<Props>`
  width: fit-content;
  height: 22px;

  display: flex;
  align-items: center;

  padding: 10px 20px;

  border: none;
  border-radius: 10px;

  cursor: pointer;

  background-color: ${({ disabled }) => (!disabled ? "lightpink" : "grey")};

  color: rgba(0, 0, 0, 0.64);
  font-weight: bold;
  font-size: 16px;

  &:hover {
    ${({ disabled }) => (!disabled ? "background-color: pink" : "")};
  }
`;

export { Button };

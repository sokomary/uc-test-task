import {
  CSSProperties,
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import styled from "styled-components";

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  vertical?: boolean;
  gap?: number;
  center?: boolean;
  onClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
}

const Container: FC<Props> = (props) => (
  <StyledContainer
    style={props.style}
    className={props.className}
    vertical={props.vertical}
    gap={props.gap}
    center={props.center}
    onClick={props.onClick}
    onKeyDown={props.onKeyDown}
  >
    {props.children}
  </StyledContainer>
);

const StyledContainer = styled.div<Props>`
  width: fit-content;

  display: flex;
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  ${(props) =>
    props.gap
      ? "gap: " + props.gap + "px;"
      : `justify-content: ${props.center ? "center" : "space-between"}`};
  ${(props) => (props.center ? `align-items: center;` : "")};

  outline: none;
`;

export { Container };

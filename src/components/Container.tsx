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
  fullSize?: boolean;
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
    fullSize={props.fullSize}
    onKeyDown={props.onKeyDown}
  >
    {props.children}
  </StyledContainer>
);

const StyledContainer = styled.div<Props>`
  ${({ fullSize }) =>
    fullSize ? "width: 100%; height: 100%" : "width: fit-content;"};

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

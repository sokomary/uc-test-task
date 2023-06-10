import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Container } from "../Container.tsx";
import { Button } from "../Button.tsx";
import { useInterval } from "../../hooks/useInterval.ts";
import { useChildren } from "../../hooks/useChildren.ts";

type BaseProps = {
  loop?: boolean;
  children: JSX.Element | JSX.Element[];
};
type Props = BaseProps &
  Readonly<
    | {
        autoPlay?: false;
        speed?: undefined;
      }
    | {
        autoPlay: true;
        speed?: number;
      }
  >;

type ImageSliderExtensions = {
  Slide: typeof Slide;
};

const DEFAULT_SPEED = 2000;
const NEXT_SLIDE_KEY = "ArrowRight";
const PREV_SLIDE_KEY = "ArrowLeft";
const TOUCH_DISTANCE = 10;

const ImageSlider: FC<Props> & ImageSliderExtensions = (props) => {
  const imageSetRef = useRef<HTMLDivElement>(null);
  useEffect(() => imageSetRef.current?.focus(), []);

  const children = useChildren(props.children, [ImageSlider.Slide]);

  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const prevImgIndex = useMemo(
    () => (currentImgIdx ? currentImgIdx - 1 : children.length - 1),
    [currentImgIdx]
  );
  const nextImgIndex = useMemo(
    () => (currentImgIdx === children.length - 1 ? 0 : currentImgIdx + 1),
    [currentImgIdx]
  );
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const setPrevImg = useCallback(() => {
    setCurrentImgIdx((prev) =>
      prev > 0 ? prev - 1 : props.loop ? children.length - 1 : prev
    );
  }, [children]);

  const setNextImg = useCallback(() => {
    setCurrentImgIdx((prev) =>
      prev < children.length - 1 ? prev + 1 : props.loop ? 0 : prev
    );
  }, [children]);

  const [startAutoPlay, stopAutoPlay] = useInterval(
    setNextImg,
    props.speed || DEFAULT_SPEED,
    props.autoPlay
  );

  useEffect(() => {
    if (currentImgIdx >= children.length - 1 && !props.loop) {
      stopAutoPlay();
    }
  }, [currentImgIdx]);

  const handleKeyDown = (key: string) => {
    if (key === NEXT_SLIDE_KEY) {
      setNextImg();
    }
    if (key === PREV_SLIDE_KEY) {
      setPrevImg();
    }
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > TOUCH_DISTANCE) {
      setNextImg();
    }
    if (touchEnd - touchStart > TOUCH_DISTANCE) {
      setPrevImg();
    }
  };

  const handleDotClick = async (i: number) => {
    const isForward = currentImgIdx > i;
    if (Math.abs(currentImgIdx - i) > 1) {
      for (
        let j = isForward ? currentImgIdx - 1 : currentImgIdx + 1;
        isForward ? j >= i : j <= i;
        isForward ? (j -= 1) : (j += 1)
      ) {
        setCurrentImgIdx(j);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
    } else {
      setCurrentImgIdx(i);
    }
  };

  return (
    <Container vertical gap={10} center fullSize>
      <Container center gap={10} fullSize>
        {children.length > 1 && (
          <Button
            disabled={!(currentImgIdx > 0 || props.loop)}
            onClick={setPrevImg}
          >
            &lt;
          </Button>
        )}
        <ImageSet
          tabIndex={-1}
          ref={imageSetRef}
          onKeyDown={(e) => handleKeyDown(e.key)}
          onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
          onTouchEnd={handleSwipe}
        >
          {children.length > 1 && (
            <Image
              style={{ transform: "translateX(-100%)" }}
              key={prevImgIndex}
            >
              {children[prevImgIndex]}
            </Image>
          )}
          <Image
            onMouseEnter={() => {
              if (props.autoPlay) {
                stopAutoPlay();
              }
            }}
            onMouseLeave={() => {
              if (props.autoPlay) {
                startAutoPlay();
              }
            }}
            key={currentImgIdx}
          >
            {children[currentImgIdx]}
          </Image>
          {children.length > 1 && (
            <Image style={{ transform: "translateX(100%)" }} key={nextImgIndex}>
              {children[nextImgIndex]}
            </Image>
          )}
        </ImageSet>
        {children.length > 1 && (
          <Button
            disabled={!(currentImgIdx < children.length - 1 || props.loop)}
            onClick={setNextImg}
          >
            &gt;
          </Button>
        )}
      </Container>
      <DotsContainer gap={10}>
        {children.map((_, i) => (
          <Dot
            onClick={() => handleDotClick(i)}
            key={i}
            accent={i === currentImgIdx}
          />
        ))}
      </DotsContainer>
    </Container>
  );
};

type SlideProps = {
  src: string;
};
const Slide: FC<SlideProps> = (props) => {
  return <SlideImage src={props.src} />;
};

const DotsContainer = styled(Container)`
  padding: 20px 0;
`;

const ImageSet = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  outline: none;
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  transition: transform 0.4s ease-in-out;
`;

const Dot = styled.div<{ accent: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.accent ? "lightpink" : "grey")};
  transition: background-color 1s;

  &:hover {
    background-color: ${(props) => (props.accent ? "pink" : "lightgray")};
  }
`;

const SlideImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

ImageSlider.Slide = Slide;

export { ImageSlider };

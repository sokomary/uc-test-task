import "./App.css";
import { ImageSlider } from "./components/Slider/ImageSlider";
import styled from "styled-components";

function App() {
  const height = window.innerHeight;
  return (
    <StyledApp height={height}>
      <ImageSlider loop>
        <ImageSlider.Slide src="https://image.isu.pub/200108033723-3ca2097884c8efacf45a0f28f2db9aff/jpg/page_109.jpg" />
        <ImageSlider.Slide src="https://w7.pngwing.com/pngs/31/751/png-transparent-museum-of-modern-art-futurism-bauhaus-typography-poster-number-2-food-text-monochrome-thumbnail.png" />
        <ImageSlider.Slide src="https://www.accobrands.com.au/pa_images/Detail/900408.jpg" />
        <ImageSlider.Slide src="https://lh3.googleusercontent.com/Y2-c97PxIFWROK24rVVGaIzF2lngG_8iXYZgNYvq7jb-7_-LLzmQP_o1fuxAw9xSovXwc8F5giWzUAJ75-YW9lNiH79XAAteSLPXDaY=s120" />
        <ImageSlider.Slide src="https://ukrpublic.com/images/2021/09/16/73378738_large.jpg" />
        <ImageSlider.Slide src="https://otvet.imgsmail.ru/download/875a8375f91de049494d6073098e8a2f_87df8602575cc25864a612668335e50b.png" />
      </ImageSlider>
    </StyledApp>
  );
}

const StyledApp = styled.div<{ height: number }>`
  width: 100vw;
  height: ${({ height }) => `${height}px`};
`;

export default App;

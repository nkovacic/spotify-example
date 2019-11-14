import { Dimensions, PixelRatio } from 'react-native';
import Logger from 'app/services/Logger';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;
const guidelinePixelRatio = 3;

const scale = (size: number) => {
    //Logger.info(`(${shortDimension} * ${guidelinePixelRatio} * ${size})  / (${guidelineBaseWidth} * ${PixelRatio.get()} ${PixelRatio.getFontScale()})`);

    //return PixelRatio.roundToNearestPixel((shortDimension * PixelRatio.get() * size)  / (guidelineBaseWidth * guidelinePixelRatio));

    let pixelRatio = PixelRatio.get();

    if (pixelRatio < 2) {
        pixelRatio = 2;
    }
    else if (pixelRatio < 3) {
        pixelRatio = 2.5;
    }
    else if (pixelRatio >= 3.5) {
        pixelRatio -= 0.8;
    }

    return PixelRatio.roundToNearestPixel(pixelRatio * size  / guidelinePixelRatio);
}

export { scale };
import { ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType | string;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // ダブルタップでオリジナル画像の倍のサイズを計算する
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  // ダブルタップでオリジナル画像の倍のサイズを取得したらstyleに適用する
  const doubleTapStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  // ドラッグでの移動の定義
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // ドラッグでの移動のスタイル
  const dragStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const getImageSource = (
    source: ImageSourcePropType | string
  ): ImageSourcePropType => {
    if (typeof source === "string") {
      return { uri: source };
    }
    return source;
  };

  const combinedGesture = Gesture.Simultaneous(doubleTap, drag);

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[dragStyle, { top: -350 }]}>
        <Animated.Image
          source={getImageSource(stickerSource)}
          resizeMode="contain"
          style={[doubleTapStyle, { width: imageSize, height: imageSize }]}
        />
      </Animated.View>
    </GestureDetector>
  );
}

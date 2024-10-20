import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
  imgSource: string | number;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const image = selectedImage ? { uri: selectedImage } : imgSource;
  return <Image source={image} style={styles.image} />;
}
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

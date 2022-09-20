import {
  Animated,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect } from "react";

type Props = {
  content: string;
  duration: number;
  style?: ViewStyle | TextStyle | ImageStyle;
  textStyle?: ViewStyle | TextStyle | ImageStyle;
  onFinish?: Function;
};

const TextAnimator = ({ ...props }: Props) => {
  useEffect(() => {
    animated(1);

    return () => {};
  }, []);

  const textArr = props.content.trim().split(" ");
  let animatedValues: Animated.Value[] = [];
  textArr.map((_, i) => {
    animatedValues.push(new Animated.Value(0));
  });
  function animated(toValue: number) {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration: props.duration,
        useNativeDriver: true,
      });
    });
    Animated.stagger(
      props.duration / 5,
      toValue == 0 ? animations.reverse() : animations
    ).start(() => {
      setTimeout(() => {
        animated(toValue === 0 ? 1 : 0);
      }, 1000);
      props.onFinish && props.onFinish();
    });
  }
  return (
    <View style={[props.style, styles.textWrapper]}>
      {textArr.map((word, index) => {
        return (
          <Animated.Text
            key={index.toString()}
            style={[
              props.textStyle,
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: Animated.multiply(
                      animatedValues[index],
                      new Animated.Value(-20)
                    ),
                  },
                ],
              },
            ]}
          >
            {word}
            {`${index < textArr.length ? " " : ""}`}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default TextAnimator;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

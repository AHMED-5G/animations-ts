import React, { FC, FunctionComponent, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { width } from "../constants/Layout";
import { RootStackParamList, RootStackScreenProps } from "../types";

export interface AppProps {}

export interface AppState {}
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

type Props = RootStackScreenProps<"CircularProgressProgs">;

export interface CircularProgressInterface {
  progress: Animated.Value;
}
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CircularProgressProgs: FunctionComponent<Props> = ({ route }) => {
  // let progress = route?.params?.progress;
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const α = progress?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2],
  });
  const strokeDashoffset = Animated.multiply(α, radius);
  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="rgba(255,255,255,0.4)"
        fill="none"
        r={radius}
        cy={size / 2}
        cx={size / 2}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
      />
      <AnimatedCircle
        stroke="#0ebeff"
        fill="none"
        r={radius}
        cy={size / 2}
        cx={size / 2}
        strokeDashoffset={strokeDashoffset}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
      />
    </Svg>
  );
};

export default CircularProgressProgs;

//https://www.youtube.com/watch?v=tc3G-bO1p8Q&list=PLQocKVqyqZDSCyzTX6QYZ5k5GBv4_TvAX&index=41
//23:00

import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../types";
import color from "randomcolor";
import * as d3Shape from "d3-shape";
import { snap } from "@popmotion/popcorn";
import Svg, { Path, G, Text as SText, TSpan } from "react-native-svg";
import { width } from "../constants/dimensions";
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
} from "react-native-gesture-handler";
const numberOfSegments = 10;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
function makeWheel() {
  const data = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: "dark",
    count: numberOfSegments,
  });
  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);
    return {
      path: instance(arc),
      color: colors[index],
      value: Math.round(Math.random() * 10 + 1) * 200,
      centroid: instance.centroid(arc),
    };
  });
}
const wheelSize = width * 0.9;
const Wheel = ({ navigation }: RootStackScreenProps<"Wheel">) => {
  const wheelPaths = makeWheel();
  const angle = new Animated.Value(0);
  let angleValue = 0;
  function getWinnerIndex() {
    const deg = Math.abs(Math.round(angleValue % oneTurn));
    return Math.floor(deg / angleBySegment);
  }
  const onPan = ({ nativeEvent }: HandlerStateChangeEvent) => {
    // if (nativeEvent.state === State.END) {
    const { velocityY } = nativeEvent;
    Animated.decay(angle, {
      velocity: velocityY / 1000,
      deceleration: 0.997,
      useNativeDriver: true,
    }).start(() => {
      //do something
    });
    // }
  };

  const [disablePan, setDisablePan] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler enabled={!disablePan} onHandlerStateChange={onPan}>
        {renderSvgWheel()}
      </PanGestureHandler>
      <Text>{disablePan}</Text>
    </GestureHandlerRootView>
  );
  function renderSvgWheel() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                rotate: angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, "0deg", `${oneTurn}deg`],
                }),
              },
            ],
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const number = arc.value.toString();
                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                      origin={`${x} , ${y}`}
                    >
                      <SText
                        fill={"white"}
                        textAnchor="middle"
                        x={x}
                        y={y - 70}
                        fontSize={26}
                      >
                        {Array.from({ length: number.length }).map(
                          (_, index) => {
                            return (
                              <TSpan
                                key={index.toString() + "ss"}
                                x={x}
                                dy={26}
                              >
                                {number.charAt(index)}
                              </TSpan>
                            );
                          }
                        )}
                      </SText>
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
    );
  }
};

export default Wheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

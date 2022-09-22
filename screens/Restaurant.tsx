import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Animated,
  Button,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { RootStackScreenProps } from "../types";
import { restaurantData } from "../dummyData";
import { height } from "../constants/dimensions";
import { width } from "../constants/Layout";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
type Props = {
  navigation: RootStackScreenProps<"Restaurant">;
};
const transition = (
  <Transition.Together>
    <Transition.Out
      type="slide-bottom"
      durationMs={200}
      interpolation="easeIn"
    />
    <Transition.Change />
    <Transition.In
      type="slide-bottom"
      durationMs={200}
      interpolation="easeOut"
    />
  </Transition.Together>
);
const Restaurant: FC<Props> = () => {
  const [index, setIndex] = useState(0);
  let activeIndex = useRef(new Animated.Value(0)).current;
  let animation = useRef(new Animated.Value(0)).current;

  function animateFunction(newIndex: number) {
    ref?.current?.animateNextTransition();
    Animated.timing(animation, {
      toValue: newIndex,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {});
  }

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height],
  });
  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "140deg"],
  });
  let ref = useRef<TransitioningView>(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <FlingGestureHandler
          key={"up"}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state == State.END) {
              if (index < restaurantData.length - 1) {
                activeIndex.setValue(index + 1);
                setIndex((prev) => prev + 1);
                animateFunction(+index + 1);
              }
            }
          }}
          direction={Directions.UP}
        >
          <FlingGestureHandler
            key={"down"}
            onHandlerStateChange={(event) => {
              if (event.nativeEvent.state == State.END) {
                if (index > 0) {
                  activeIndex.setValue(index - 1);
                  setIndex((prev) => prev - 1);

                  animateFunction(index - 1);
                }
              }
            }}
            direction={Directions.DOWN}
          >
            <View key={index}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,

                  {
                    height: height * restaurantData.length,
                    transform: [
                      {
                        translateY,
                      },
                    ],
                  },
                ]}
              >
                {restaurantData.map((_, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        // height: height,
                        height,
                        backgroundColor: i % 2 == 0 ? "white" : "#fef0de",
                      }}
                    ></View>
                  );
                })}
              </Animated.View>
              <View style={{ marginTop: 150, marginLeft: 20 }}>
                <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                  {restaurantData[index].name}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: width / 2 - 5,
                    height: 350,
                    justifyContent: "center",
                  }}
                >
                  <Transitioning.View ref={ref} transition={transition}>
                    <Animated.View style={styles.restaurantPropsItem}>
                      <AntDesign name="star" size={24} color="black" />
                      <Animated.Text style={styles.propsText}>
                        {restaurantData[index].rate}
                      </Animated.Text>
                    </Animated.View>
                  </Transitioning.View>
                  <View style={styles.restaurantPropsItem}>
                    <MaterialCommunityIcons
                      name="play-speed"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.propsText}>
                      {restaurantData[index].speed}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: width / 2 - 5,
                    height: 350,
                    justifyContent: "center",
                  }}
                >
                  <Animated.View
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: 200,
                      overflow: "hidden",
                      backgroundColor: "black",
                      right: "-15%",
                      transform: [{ rotate }],
                    }}
                  >
                    <Image
                      source={{ uri: restaurantData[index].image }}
                      style={{ width: 300, height: 300 }}
                    />
                  </Animated.View>
                </View>
              </View>
              <View style={{ marginTop: 20, marginLeft: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {restaurantData[index].description}
                </Text>
              </View>
            </View>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  restaurantPropsItem: { marginTop: 10, flexDirection: "row", marginLeft: 5 },
  propsText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "500",
  },
});

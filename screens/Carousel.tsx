//https://www.youtube.com/watch?v=XFtx09yoX0M&list=PLQocKVqyqZDSCyzTX6QYZ5k5GBv4_TvAX&index=37
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";
import { width } from "../constants/Layout";
import { height } from "../constants/dimensions";
// import * as Svg from "react-native-svg";
import Svg, { Rect, Stop, RadialGradient, Defs } from "react-native-svg";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  bg: string;
  image?: string;
}
// const { Defs, RadialGradient, Stop, Rect } = Svg;
const RenderItem = ({ item, index }: { item: Product; index: number }) => {
  function renderRadialGradient(color: string) {
    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ["0deg", "15deg", "0deg", "15deg"],
    });
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [0, width / 2, 0, width / 2],
    });
    return (
      <Animated.View
        style={[
          styles.svgContainer,
          {
            transform: [{ translateX: translateX }, { rotate }],
          },
        ]}
      >
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="35%"
              r={"60%"}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={"0%"} stopColor="#FFF" stopOpacity={"1"} />
              <Stop offset={"100%"} stopColor={color} stopOpacity={"1"} />
            </RadialGradient>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fillOpacity={0.9}
            fill={`url(#grad)`}
          />
        </Svg>
      </Animated.View>
    );
  }

  const inputRange = [
    (index - 2) * width,
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];
  const imageScale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 0.4, 1, 0.4],
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [1, 0.2, 1, 0.2],
  });

  return (
    <View key={index} style={[styles.container, styles.item]}>
      <Animated.Image
        source={{ uri: item.image }}
        style={[
          styles.image,
          {
            opacity,
            transform: [{ scale: imageScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.metaContainer,
          {
            transform: [{ scale: imageScale }],
          },
        ]}
        key={index}
      >
        <Text style={[styles.font, styles.title]}>{item.title}</Text>
        <Text style={[styles.font, styles.subTitle]}>{item.subtitle}</Text>
        <Text style={[styles.font, styles.description]}>
          {item.description}
        </Text>
      </Animated.View>
      <Text style={[styles.font, styles.price]}>{item.price}</Text>
      {renderRadialGradient(item.bg)}
    </View>
  );
};
const scrollX = new Animated.Value(0);

export default function Carousel({
  navigation,
}: RootStackScreenProps<"Carousel">) {
  const PRODUCT_LIST = [
    {
      id: "GI6L2pkiZgQ",
      title: "TMA-2",
      subtitle: "DJ PRESET",
      description:
        "This configuration is based on the original TMA-1 DJ, which is the preferred choice of a range of acclaimed DJs.",
      price: "200€",
      bg: "#16CDC1",
      image:
        "https://images.unsplash.com/photo-1599855129460-58c62b60e3df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHNldHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "gKKB13zJ1ss",
      title: "TMA-2",
      subtitle: "ED BANGER EDITION",
      description:
        "This combination provides a very heavy and powerful bass. Recommended for bass lovers and those who like it loud. Limited edition of 300.",
      price: "240€",
      bg: "#bbb",
      image:
        "https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlYWRzZXR8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "s04h71e05c71",
      title: "TMA-2",
      subtitle: "YOUNG GURU PRESET",
      description:
        "This configuration provides open, vibrant sound with good bass and treble. Wide sound stage and medium isolation.",
      price: "260€",
      bg: "palevioletred",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHNldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "s03h03e04c02",
      title: "TMA-2",
      subtitle: "STUDIO PRESET",
      description:
        "This configuration provides a warm sound and it is good for extended listening. Great bass and added energy in the lower mid range.",
      price: "225€",
      bg: "#629BF0",
      image:
        "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRzZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollViewContainer}
      >
        {PRODUCT_LIST.map((item, index) => (
          <RenderItem {...{ item, index }} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  scrollViewContainer: {
    // justifyContent: "center",
  },
  metaContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    paddingLeft: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
  },
  subTitle: {
    fontSize: 10,
    fontWeight: "900",
  },
  description: {
    fontSize: 14,
    marginVertical: 15,
    textAlign: "center",
  },
  price: { fontSize: 42, fontWeight: "900" },
  font: {
    // fontFamily: "Menlo",
    color: "#222",
  },
  image: {
    width: width * 0.85,
    height: height * 0.65,
    resizeMode: "contain",
  },
  // bgRadialGradient: {
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   zIndex: -1,
  // },
  svgContainer: {
    // position: "absolute",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
  },
});

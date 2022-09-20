import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";
import TextAnimator from "../components/TextAnimator";

type Props = {};

const TextAnimation = ({
  navigation,
}: RootStackScreenProps<"TextAnimation">) => {
  function onFinish() {
    Alert.alert("done");
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <TextAnimator
        textStyle={{ fontSize: 22, fontWeight: "500" }}
        content="Hi welcome in this text animations all words should be rendered one by one 😊😊😊"
        duration={400}
        // onFinish={onFinish}
      />
    </View>
  );
};

export default TextAnimation;

const styles = StyleSheet.create({});

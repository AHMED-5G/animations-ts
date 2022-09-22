import { StyleSheet, TouchableOpacity, View } from "react-native";

import MedButton from "../components/mini/MedButton";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnContainer}>
        <MedButton
          title="Restaurant"
          onPress={() => navigation.navigate("Restaurant")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <MedButton
          title="ScrollToIndex"
          onPress={() => navigation.navigate("ScrollToIndex")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <MedButton
          title="Text Animation"
          onPress={() => navigation.navigate("TextAnimation")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <MedButton
          title="Carousel"
          onPress={() => navigation.navigate("Carousel")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <MedButton title="Wheel" onPress={() => navigation.navigate("Wheel")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  btnContainer: {
    marginTop: 10,
  },
});

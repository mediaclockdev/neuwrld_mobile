// components/AnimatedHeader.js
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

const HEADER_HEIGHT = 60;

const AnimatedHeader = ({
  title = "Header",
  scrollY,
  height = HEADER_HEIGHT,
  backgroundColor = "rgba(255,255,255,0.8)",
  glass = true, // enable glass effect
  titleStyle = {},
}) => {
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height], // hide on scroll down
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, height / 2, height],
    outputRange: [1, 0.5, 0], // fade out
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        { height, transform: [{ translateY: headerTranslate }], opacity: headerOpacity },
      ]}
    >
      {glass ? (
        <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={10} />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor },
          ]}
        />
      )}
      <Text style={[styles.headerText, titleStyle]}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AnimatedHeader;

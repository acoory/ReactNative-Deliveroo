import { View, Text, Animated, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ModalFavori(props) {
  const isLiked = props.isLiked;
  const opacity = props.opacity;
  const message = props.message;

  const width = Dimensions.get("window").width;

  console.log(props);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        marginBottom: 40,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0b1310",
        borderRadius: 10,
        opacity: opacity,
        zIndex: 100,
        left: width / 2 - 100,
      }}
    >
      <Icon name="heart" size={20} color="white" />
      <Text
        style={{
          color: "white",
          fontSize: 13,
          fontWeight: "bold",
          marginLeft: 10,
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
}

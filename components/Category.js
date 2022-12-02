import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { category } from "../data/category";

export default function Category() {
  return (
    <FlatList
      data={category}
      keyExtractor={(item) => item.name}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop: 20,
      }}
      renderItem={({ item }) => (
        <View
          style={{
            width: 100,
            borderRadius: 10,
            marginRight: -15,
            paddingRight: 40,
            paddingLeft: 40,
            marginLeft: 15,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#fff",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.img}
              style={{
                width: 90,
                height: 60,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: 90,
              padding: 5,
              borderWidth: 1,
              borderColor: "#eaeaea",
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "500",
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

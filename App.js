import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Animated,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalFavori from "./components/ModalFavori";
import { category } from "./data/category";
import { Restaurant } from "./data/restaurant";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [DataRate, setDataRate] = useState([]);
  const [dataUne, setDateUne] = useState([]);
  const [messageModal, setMessageModal] = useState("");

  // Width and height of the screen
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // Animation
  const opacityLogoUpdate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // refresh the page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => setRefreshing(false));
  }, []);

  const filterRestaurantFavorieByRate = (rate) => {
    const result = Restaurant.filter((item) => item.rate >= rate)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setDataRate(result);
  };

  //create function random restaurant and setUne
  const randomRestaurant = () => {
    const result = Restaurant.sort(() => 0.5 - Math.random()).slice(0, 5);
    setDateUne(result);
  };

  const animatedModal = () => {
    console.log("animatedModal");
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2500);
  };

  const editIsLiked = (index) => {
    console.log("editIsLiked");
    const newData = [...DataRate];
    newData[index].isLiked = !newData[index].isLiked;
    if (newData[index].isLiked) {
      setMessageModal("Ajouté aux favoris");
    } else {
      setMessageModal("Retiré des favoris");
    }
    setDataRate(newData);
  };

  useEffect(() => {
    filterRestaurantFavorieByRate(3);
    randomRestaurant();
    console.log("update");
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {Platform.OS === "ios" ? (
          <Animated.Image
            source={require("./assets/delivero/deliveroo.png")}
            style={{
              width: 40,
              height: 70,
              position: "absolute",
              marginTop: 60,
              resizeMode: "contain",
              opacity: opacityLogoUpdate,
            }}
          />
        ) : null}
      </View>

      <ModalFavori opacity={opacity} message={messageModal} />

      <SafeAreaView
        style={{
          width: width,
          flex: 1,
        }}
      >
        <ScrollView
          alwaysBounceVertical={false}
          bounces={true}
          scrollEventThrottle={16}
          onScroll={(event) => {
            console.log(event.nativeEvent.contentOffset.y);
            if (event.nativeEvent.contentOffset.y < 40) {
              Animated.timing(opacityLogoUpdate, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }).start();
            }
            if (event.nativeEvent.contentOffset.y == 0) {
              Animated.timing(opacityLogoUpdate, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }).start();
            }
          }}
          onScrollEndDrag={() => {
            Animated.timing(opacityLogoUpdate, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start();
            console.log("onMomentumScrollBegin");
          }}
          refreshControl={
            <RefreshControl
              colors={["red", "orange"]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          style={styles.container}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          <StatusBar style="dark" />
          {/* Header */}
          <View
            style={{
              width: "90%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text>Livraison Maintenant</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Location
                </Text>

                <Icon
                  name="chevron-down"
                  size={23}
                  color="#04cbbb"
                  style={{
                    marginLeft: 5,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 10,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              >
                <Icon name="heart-o" size={20} color="#04cbbb" />
              </View>
              <View
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Icon name="user-o" size={20} color="#04cbbb" />
              </View>
            </View>
          </View>
          {/* Header end */}
          {/* Search */}
          <View
            style={{
              width: "90%",
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#eeeeee",
                padding: 10,
                width: width - 100,
                borderRadius: 5,
                flexDirection: "row",
              }}
            >
              <Icon name="search" size={20} color="#cdcdcd" />
              <TextInput
                placeholder="Restaurant, Commerces, plats"
                style={{
                  marginLeft: 10,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: "#f7f7f7",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Icon name="sliders" size={20} color="#04cbbb" />
            </View>
          </View>
          {/* FlatList */}
          <View
            style={{
              backgroundColor: "#f9f9f9",
              width: "100%",
              marginTop: 20,
              flexDirection: "column",
            }}
          >
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
            {/* FlatList end*/}
            {/* Favoris */}
            <View
              style={{
                width: "100%",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Les mieux notés
                </Text>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 50,
                    marginTop: -10,
                  }}
                >
                  <Icon name="arrow-right" size={20} color="#04cbbb" />
                </View>
              </View>
              <View
                style={{
                  width: "90%",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: -10,
                    color: "#686a69",
                  }}
                >
                  Ces adresses sont très souvent ajoutées en favori
                </Text>
              </View>
            </View>
            <View>
              <FlatList
                data={DataRate}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 20,
                  // paddingLeft: 20,
                }}
                renderItem={({ item, index }) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "white",
                      // marginRight: 10,
                      borderColor: "#eaeaea",
                      borderWidth: 1,
                      borderRadius: 5,
                      // marginRight: 20,
                      marginLeft: 20,
                    }}
                  >
                    <View>
                      <ImageBackground
                        source={item.img}
                        style={{
                          width: 280,
                          height: 150,
                          borderRadius: 5,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.freeDelivery ? (
                            <View
                              style={{
                                padding: 10,
                                backgroundColor: "#b8342a",
                                width: 140,
                                alignItems: "center",
                                marginLeft: 10,
                                marginTop: 10,
                                borderRadius: 5,
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "600",
                                }}
                              >
                                Livraison offerte
                              </Text>
                            </View>
                          ) : (
                            <View></View>
                          )}

                          <View
                            style={{
                              padding: 10,
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                editIsLiked(index);
                                animatedModal();
                              }}
                            >
                              {item.isLiked ? (
                                <Icon name="heart" size={20} color="#fff" />
                              ) : (
                                <Icon name="heart-o" size={20} color="#fff" />
                              )}
                            </TouchableOpacity>
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                              }}
                            >
                              (335)
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            padding: 5,
                            marginTop: 120,
                            backgroundColor: "#fff",
                            alignItems: "center",
                            marginRight: 10,
                            borderRadius: 20,
                            width: 90,
                            // shadow
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.1,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 15,
                            }}
                          >
                            {item.time} - {item.maxTime}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                            }}
                          >
                            min
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                    <View
                      style={{
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          marginTop: 10,
                        }}
                      >
                        {item.name}
                      </Text>
                      {item.rate >= 1 && item.rate <= 1.9 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                          }}
                        >
                          <Icon name="star" size={15} color="#04cbbb" />
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: "#04cbbb",
                            }}
                          >
                            {item.rate}
                          </Text>
                          <Text style={{ fontSize: 12, marginLeft: 5 }}>
                            Médiocre
                          </Text>
                        </View>
                      ) : item.rate >= 2 && item.rate <= 2.9 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                          }}
                        >
                          <Icon name="star" size={15} color="#057c8b" />
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: "#057c8b",
                            }}
                          >
                            {item.rate}
                          </Text>
                          <Text style={{ fontSize: 12, marginLeft: 5 }}>
                            Moyen
                          </Text>
                        </View>
                      ) : item.rate >= 3 && item.rate <= 3.9 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                          }}
                        >
                          <Icon name="star" size={15} color="#057c8b" />
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: "#057c8b",
                            }}
                          >
                            {item.rate}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: "#057c8b",
                            }}
                          >
                            Bien
                          </Text>
                        </View>
                      ) : item.rate >= 4 && item.rate <= 4.9 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                          }}
                        >
                          <Icon name="star" size={15} color="#057c8b" />
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: "#057c8b",
                            }}
                          >
                            {item.rate}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginLeft: 5,
                              color: "#057c8b",
                            }}
                          >
                            Très bien
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
          {/* A la une */}
          <View
            style={{
              marginTop: 20,
              width: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                A la une
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#686a69",
                  marginTop: 5,
                }}
              >
                Annonces payante de nos partenaires
              </Text>
            </View>
          </View>
          {dataUne.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                // marginRight: 10,
                borderColor: "#eaeaea",
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 10,
                // marginRight: 20,
              }}
            >
              <View>
                <ImageBackground
                  source={item.img}
                  style={{
                    width: width - 40,
                    height: 150,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.freeDelivery ? (
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#b8342a",
                          width: 140,
                          alignItems: "center",
                          marginLeft: 10,
                          marginTop: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          Livraison offerte
                        </Text>
                      </View>
                    ) : (
                      <View></View>
                    )}

                    <View
                      style={{
                        padding: 10,
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          editIsLiked(index);
                          animatedModal();
                        }}
                      >
                        {item.isLiked ? (
                          <Icon name="heart" size={20} color="#fff" />
                        ) : (
                          <Icon name="heart-o" size={20} color="#fff" />
                        )}
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                        }}
                      >
                        (335)
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      padding: 5,
                      marginTop: 120,
                      backgroundColor: "#fff",
                      alignItems: "center",
                      marginRight: 10,
                      borderRadius: 20,
                      width: 90,
                      // shadow
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      {item.time} - {item.maxTime}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                      }}
                    >
                      min
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 10,
                  }}
                >
                  {item.name}
                </Text>
                {item.rate >= 1 && item.rate <= 1.9 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <Icon name="star" size={15} color="#04cbbb" />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: "#04cbbb",
                      }}
                    >
                      {item.rate}
                    </Text>
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>
                      Médiocre
                    </Text>
                  </View>
                ) : item.rate >= 2 && item.rate <= 2.9 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <Icon name="star" size={15} color="#057c8b" />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: "#057c8b",
                      }}
                    >
                      {item.rate}
                    </Text>
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>Moyen</Text>
                  </View>
                ) : item.rate >= 3 && item.rate <= 3.9 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <Icon name="star" size={15} color="#057c8b" />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: "#057c8b",
                      }}
                    >
                      {item.rate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: "#057c8b",
                      }}
                    >
                      Bien
                    </Text>
                  </View>
                ) : item.rate >= 4 && item.rate <= 4.9 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                    }}
                  >
                    <Icon name="star" size={15} color="#057c8b" />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: "#057c8b",
                      }}
                    >
                      {item.rate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: "#057c8b",
                      }}
                    >
                      Très bien
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    zIndex: 999,
    elevation: 999,
  },
});

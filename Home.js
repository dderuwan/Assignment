import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useFonts } from "expo-font";

export function Home({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    "Kanit-Light": require("./assets/fonts/Kanit-Light.ttf"),
    "Kanit-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
  });

  const [showBox, setShowBox] = useState(true);
  {useEffect}
  useEffect(() => {
    const firstLoad = async () => {
      loadNotes();
    };
    firstLoad();
  }, []);

  const [data, setData] = useState([]);
  function loadNotes() {
    const userdata = {
      Id: route.params.Id,
    };
    fetch("http://10.0.2.2:8080/assignment/loadNotesProcess.php", {
      method: "POST",

      body: JSON.stringify(userdata),
    })
      .then((Response) => {
        return Response.json();
      })
      .then((note) => {
        setData(note);
      });
  }

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.view1}>
        <Text style={styles.text1}>Welcome !!!</Text>
        <Text style={styles.text2}>
          {route.params.Firstname} {route.params.Lastname}
        </Text>
      </View>
      {showBox && (
        <View style={styles.mainView}>
          <FlatList data={data} renderItem={NoteUi} style={styles.flatlist} />
        </View>
      )}

      <View style={styles.view3}>
      <Pressable onPress={loadNotes}>
          <View style={styles.btnViewref}>
            <Text style={styles.btnText1}>Refresh</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("NewNote", route)}>
          <View style={styles.btnViewnote}>
            <Text style={styles.btnText1}>ADD New Note</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.alert("Are your sure?", "Do you Want to Log Out", [
              {
                text: "Yes",
                onPress: () => {
                  async () => {
                    AsyncStorage.clear();
                  };
                  navigation.navigate("SignIn");
                },
              },
              {
                text: "No",
              },
            ]);
          }}
        >
          <View style={styles.btnViewlog}>
            <Text style={styles.btnText1}>Log out</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
  return ui;

  function NoteUi({ item }) {
    return (
      <View style={styles.view2}>
        <Text style={styles.text3}>{item.datetime}</Text>
        <View style={styles.loadView}>
          <View style={styles.view2_1}>
            <ViewImage />
          </View>
          <View style={styles.view2_2}>
            <Text style={styles.text2}>Title : </Text>
            <Text style={styles.text2_1}>{item.Title}</Text>
            <Text style={styles.text2}>Description :</Text>
            <Text style={styles.text2_1}> {item.Note}</Text>
          </View>
        </View>

        <Pressable onPress={deleteno}>
          <View style={styles.btnView}>
            <Text style={styles.btnText1}>Delete</Text>
          </View>
        </Pressable>
      </View>
    );
    function ViewImage() {
      if (item.UserType == "1") {
        return (
          <Image
            style={styles.image1}
            source={require("./assets/image/read.png")}
          />
        );
      } else if (item.UserType == "2") {
        return (
          <Image
            style={styles.image1}
            source={require("./assets/image/working.png")}
          />
        );
      } else if (item.UserType == "3") {
        return (
          <Image
            style={styles.image1}
            source={require("./assets/image/travel.png")}
          />
        );
      }
    }
    function deleteno() {
      const data = {
        Id: item.Id,
      };
      fetch("http://10.0.2.2:8080/assignment/deleteProcess.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((Response) => {
          return Response.json();
        })
        .then((user) => {
          if (user == "ok") {
            Alert.alert("Message", "Note Deleted");
            loadNotes();
          } else {
            Alert.alert("Message", user.responsetxt);
          }
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 30,
    color: "red",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 20,
    fontFamily: "Kanit-Bold",
  },
  text2_1: {
    fontSize: 18,
    fontFamily: "Kanit-Light",
    marginLeft: 30,
  },
  text3: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
  },
  view1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  mainView: {
    flex: 8,
    backgroundColor: "#eeeee4",
  },
  view2: {
    flex: 1,
    gap: 5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 10,
  },
  flatlist: {
    flex: 1,
    width: 400,
  },
  loadView: {
    flex: 1,
    padding: 5,

    flexDirection: "row",
  },
  view2_1: {
    flex: 1,
  },
  view2_2: {
    flex: 2,
    flexDirection: "column",
  },
  view3: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  btnView: {
    backgroundColor: "red",
    width: 380,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
  },
  btnText1: {
    fontFamily: "Kanit-Bold",
    color: "white",
    fontSize: 17,
  },
  btnViewnote: {
    backgroundColor: "green",
    width: 140,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  },
  btnViewlog: {
    backgroundColor: "black",
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  },btnViewref:{
    backgroundColor: "darkblue",
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  }
});

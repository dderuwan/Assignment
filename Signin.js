import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Kanit-Light": require("./assets/fonts/Kanit-Light.ttf"),
    "Kanit-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
  });
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  function signin() {
    const userdata = {
      Mobile: mobile,
      Password: password,
    };
    fetch("http://10.0.2.2:8080/assignment/signin.php", {
      method: "POST",
      body: JSON.stringify(userdata),
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        if (value.status == "ok") {
          Alert.alert("Success");
          const logindetails={
            "Id":value.Id,
            "Firstname":value.Firstname,
            "Lastname":value.Lastname,
            "Mobile":value.Mobile,
            "Usertype":value.Usertype,
          }; 
          login(logindetails)
          navigation.navigate("Home",logindetails);
        } else {
          Alert.alert(value.status);
        }
      })
  }
  async function login(jsonValue){
    await AsyncStorage.setItem('user',JSON.stringify(jsonValue));
    // navigation.navigate("NewNote",{someData:"Welcome"});
  }

  var ui = [
    <SafeAreaView>
      <Text>Error</Text>
    </SafeAreaView>,
  ];

  if (fontsLoaded) {
    ui = (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <Image
          style={{
            width: 100,
            height: 100,
            marginBottom: 20,
            objectFit: "contain",
            alignItems:"center",
          }}
          source={require("./assets/image/exit.png")}
        />
        <View style={styles.View1}>
          <Text style={styles.Atext}>Enter Mobile Number</Text>
          <TextInput
            style={styles.textField}
            placeholder="Mobile Number"
            onChangeText={setMobile}
            inputMode={"numeric"}
            
          />
        </View>
        <View style={styles.View1}>
          <Text style={styles.Atext}>Enter Password</Text>
          <TextInput
            style={styles.textField}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <Pressable onPress={signin}>
          <View style={styles.btnView}>
            <Text style={styles.btnText1}>Sign In</Text>
          </View>
        </Pressable>
        <Pressable onPress={signup}>
          <View>
            <Text style={styles.signup}>Sign Up</Text>
           
          </View>
        </Pressable>
       

      </SafeAreaView>
    );
  }

  return ui;

function home(){
  navigation.navigate("Home2");
}
  function signup() {
    navigation.navigate("Register");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Kanit-Light",
  },
  View1: {
    alignItems: "center",
  },
  textField: {
    height: 30,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    padding: 5,
    borderRadius: 4,
  },
  Atext: {
    fontFamily: "Kanit-Bold",
  },
  btnView: {
    backgroundColor: "red",
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText1: {
    fontFamily: "Kanit-Bold",
    color: "white",
    fontSize: 17,
  },
  signup: {
    marginTop: 10,
    textDecorationLine: "underline",
    color: "blue",
    fontFamily: "Kanit-Light",
    fontWeight: "bold",
  },
});

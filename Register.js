import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export function Register({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Kanit-Light": require("./assets/fonts/Kanit-Light.ttf"),
    "Kanit-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
  });

  var ui = [
    <SafeAreaView>
      <Text>Error</Text>
    </SafeAreaView>,
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Employee", value: "employee" },
    { label: "Student", value: "student" },
  ]);

  const [Mobile, setMobile] = useState(null);
  const [Firstname, setFirstname] = useState(null);
  const [Lastname, setLastname] = useState(null);
  const [Usertype, setUsertype] = useState(null);
  const [Password, setPassword] = useState(null);

  function signup() {
    Alert.alert("ok");
    const signupdetails = {
      Mobile: Mobile,
      Firstname:Firstname,
      Lastname:Lastname,
      Usertype:Usertype,
      Password: Password,
    }

    fetch("http://10.0.2.2:8080/assignment/register.php", {
      method: "POST",
      body: JSON.stringify(signupdetails)
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
      if(value=="ok"){
          Alert.alert("Succeess");
          navigation.navigate("SignIn");
      }else{
        Alert.alert(value);
      }
      
      })
      
  }

  if (fontsLoaded) {
    ui = (
      <SafeAreaView style={styles.container}>
           <Image
          style={{
            width: 100,
            height: 100,
            marginBottom: 20,
            objectFit: "contain",
          }}
          source={require("./assets/image/register.png")}
        />
        <View style={styles.view1}>
          <Text style={styles.Atext}>Mobile Number </Text>
          <TextInput style={styles.textField} placeholder="Mobile Number" onChangeText={setMobile}/>
        </View>
        <View style={styles.view1}>
          <Text style={styles.Atext}>First Name</Text>
          <TextInput style={styles.textField} placeholder="First Name" onChangeText={setFirstname}/>
        </View>
        <View style={styles.view1}>
          <Text style={styles.Atext}>Last Name</Text>
          <TextInput style={styles.textField} placeholder="Last Name" onChangeText={setLastname}/>
        </View>
        <View style={styles.view1}>
          <Text style={styles.Atext}>User Type</Text>

          <DropDownPicker
            style={styles.drop1}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={setUsertype}
          />
        </View>
        <View style={styles.view1}>
          <Text style={styles.Atext} >Password</Text>
          <TextInput style={styles.textField} placeholder="Password" secureTextEntry={true}  onChangeText={setPassword}/>
        </View>
        <Pressable onPress={signup}>
          <View style={styles.btnView}>
            <Text style={styles.btnText1}>Save Note</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  }

  return ui;
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Kanit-Light",
  },
  Atext: {
    fontFamily: "Kanit-Bold",
  },
  textField: {
    height: 50,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    padding: 5,
    borderRadius: 4,
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
  drop1: {
    height: 50,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    padding: 5,
    borderRadius: 4,
  },
});

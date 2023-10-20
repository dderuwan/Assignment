import { SafeAreaView, StyleSheet, Text ,Pressable,View,TextInput,Image, Alert} from "react-native";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Note({ navigation,route }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Study", value: "1" },
    { label: "Work", value: "2" },
    { label: "Travel", value: "3" },
  ]);
  const [fontsLoaded] = useFonts({
    "Kanit-Light": require("./assets/fonts/Kanit-Light.ttf"),
    "Kanit-Bold": require("./assets/fonts/Kanit-Bold.ttf"),
  });
  const [Note, setNote] = useState(null);
  const [Usertype, setUsertype] = useState(null);
  const [Title, setTitle] = useState(null);

  function savenote(){
    const newnote = {
      Id:route.params.params.Id,
      Note:Note,
      Usertype:Usertype,
      Title:Title,
    }

    fetch("http://10.0.2.2:8080/assignment/newnote.php", {
      method: "POST",
      body: JSON.stringify(newnote)
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
      if(value=="ok"){
          Alert.alert("New Note Added");
          navigation.navigate("Home",route.params.params);
      }else{
        Alert.alert(value);
      }
      
      })
  }


  const ui = (
    <SafeAreaView style={styles.container}>
       <View style={styles.view1}>
          <Text style={styles.Atextw}>Welcome !!!</Text>
           <Text style={styles.Atextn}>{route.params.params.Firstname} {route.params.params.Lastname}</Text>
        </View>
      <Image
          style={{
            width: 100,
            height: 100,
            marginBottom: 20,
            objectFit: "contain",
            alignItems:"center",
          }}
          source={{
            uri: "https://icon-library.com/images/registration-form-icon/registration-form-icon-29.jpg",
          }}
        />
       <View style={styles.view1}>
          <Text style={styles.Atext}>Title</Text>
          <TextInput style={styles.textField1} placeholder="Title" onChangeText={setTitle}/>
        </View>   
       <View style={styles.view1}>
          <Text style={styles.Atext}>Description</Text>
          <TextInput style={styles.textField} placeholder="Description" onChangeText={setNote}/>
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

        <Pressable onPress={savenote}>
          <View style={styles.btnView}>
            <Text style={styles.btnText1}>Save Note</Text>
          </View>
        </Pressable>
        <Pressable onPress={ViewNote}>
          <View>
            <Text style={styles.viewnote}>View Notes</Text>
          </View>
        </Pressable>
      </SafeAreaView>
  );
  return ui;
  function ViewNote(){
    navigation.navigate("Home",route.params.params);
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Kanit-Light",
  },
  textField: {
    height: 130,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    padding: 5,
    borderRadius: 4,
    padding:10,
    marginTop:10,
  },textField1: {
    height: 50,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    padding: 5,
    borderRadius: 4,
    padding:10,
    marginTop:10,
  },
  Atext: {
    fontFamily: "Kanit-Bold",
  }, btnView: {
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
  }, drop1: {
    fontFamily: "Kanit-Bold",
    height: 50,
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    padding: 5,
    borderRadius: 4,
    marginTop: 10,
  }, viewnote: {
    marginTop: 10,
    textDecorationLine: "underline",
    color: "blue",
    fontFamily: "Kanit-Light",
    fontWeight: "bold",
  },Atextn: {
    fontFamily: "Kanit-Bold",
    fontSize:18,
    textAlign:"center",
    marginBottom:10,
    color:"darkgreen",
  },Atextw: {
    fontFamily: "Kanit-Bold",
    fontSize:25,
    textAlign:"center",
    color:"darkblue",
  },
});

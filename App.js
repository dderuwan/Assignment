import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Register } from "./Register";
import { SignIn } from "./Signin";
import { Note } from "./NewNote";
import { Home } from "./Home";

const Stack = createNativeStackNavigator();
function App(){
  const ui =(
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="SignIn" component={SignIn}/>
    <Stack.Screen name="Register" component={Register}/>
    <Stack.Screen name="NewNote" component={Note}/>
    <Stack.Screen name="Home" component={Home}/>
  
  </Stack.Navigator>
</NavigationContainer>
  );
  return ui;
}

export default App;
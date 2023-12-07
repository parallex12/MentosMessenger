import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import Profile from "../screens/Profile/Profile";
import People from "../screens/People/People";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="ChatScreen" component={ChatScreen} />
      <Screen name="Profile" component={Profile} />
      <Screen name="People" component={People} />
    </Navigator>
  );
}
export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}
export const UnAuthNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

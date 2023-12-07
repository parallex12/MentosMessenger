import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminHome from "../screens/AdminHome/AdminHome";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AdminHome" component={AdminHome} />
    </Navigator>
  );
}
export const AdminNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

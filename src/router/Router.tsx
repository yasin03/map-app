import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LocationList from "../screens/LocationList";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationEdit from "../screens/LocationEdit";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationList"
        component={LocationList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LocationEdit"
        component={LocationEdit}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="map-marked-alt" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="list-alt" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="List3"
          component={LocationList}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="route" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CreateRide from "./screens/CreateRide";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import RequestRide from "./screens/RequestRide";
import RequestStatus from './screens/RequestStatus';
import RideStatus from "./screens/RideStatus";
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

const Layout = () => {
  const { authState, onLogout } = useAuth();

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={onLogout}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          SIGN OUT
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerTitle: "",
      headerShadowVisible: false,
    }}
    >
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="RequestRide"
            component={RequestRide}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="RequestStatus"
            component={RequestStatus}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="RideStatus"
            component={RideStatus}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
        </>
      ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
            />
          </>
        )
      }
    </Stack.Navigator>
  );
};

export default App;
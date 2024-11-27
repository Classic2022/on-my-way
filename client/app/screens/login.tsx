import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const login = async () => {
    const res = await onLogin!(email, password);
    console.log(res)
  };

  return (
    <View className="flex-1 bg-white px-8 py-10">
      <Text className="text-2xl font-bold mb-6 text-center">Login</Text>
      <TextInput
        placeholder="E-mail"
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border-b border-gray-400 mb-8 py-2"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        onPress={login}
        className="bg-black px-10 py-4 rounded-md"
      >
        <Text className="text-white text-center text-lg">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        className="mt-4"
      >
        <Text className="text-center text-blue-500">Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

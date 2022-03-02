import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './LoginScreen';
import Signup from './SignupScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
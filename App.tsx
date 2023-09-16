import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screen/Main';
const Stack = createNativeStackNavigator();

export const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

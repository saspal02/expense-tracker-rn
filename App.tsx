import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/app/pages/SignUp';
import Login from './src/app/pages/Login';
import Home from './src/app/pages/Home';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DeviceEventEmitter, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/app/pages/SplashScreen';

enableScreens(true);

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
      );
      setReceiveSmsPermission(permission);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageToAPI = async (message: string) => {
    try {
      const SERVER_BASE_URL = "http://10.0.2.2:8000";
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log("SMS got is", message);
      const response = await fetch(
        `${SERVER_BASE_URL}/v1/ds/message`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        }
      );
      console.log("Message sent to API and response got is", response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('Message sent successfully', responseData);
    } catch (error) {
      console.error('Error sending message to API', error);
    }
  };

  useEffect(() => {
    requestSmsPermission();
  }, []);

  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      const subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        (message) => {
          console.log("Raw message is", message);
          try {
            const { messageBody, senderPhoneNumber } = JSON.parse(message);
            sendMessageToAPI(messageBody);
          } catch (error) {
            console.log("Error processing SMS", error);
          }
        }
      );

      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
  <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={Login} options={{ headerTitleAlign: 'center' }} />
  <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitleAlign: 'center' }} />
  <Stack.Screen
    name="Home"
    component={Home}
    options={{
      headerTitleAlign: 'center',
      headerBackVisible: false,
      gestureEnabled: false,
    }}
  />
</Stack.Navigator>


      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LoginService from '../api/LoginService';

const SplashScreen = ({ navigation }) => {
  const loginService = new LoginService();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await loginService.isLoggedIn();
      navigation.replace(isLoggedIn ? 'Home' : 'Login');
    };

    setTimeout(checkLoginStatus, 1500); // Optional delay for effect
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('assets/logo.png')} // Make sure path is correct
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // match your branding
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      {/* Left: Logo */}
      <Image
        source={require('/assets/logo.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Center: App Name */}
      <Text style={styles.title}>Xpense AI</Text>

      {/* Right: Profile */}
      <Image
        source={require('/assets/avatar.png')} // Replace with your actual profile path
        style={styles.profile}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ProfileHeader;

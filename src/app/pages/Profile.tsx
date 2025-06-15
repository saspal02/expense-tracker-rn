import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../api/userService';
import { UserDto } from '../dto/UserDto';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

interface ProfileProps {
  closeModal: () => void;
}

const Profile: React.FC<ProfileProps> = ({ closeModal }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await new UserService().getCurrentUser();
        setUser(fetchedUser);
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    Alert.alert('Logged out');
    closeModal();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.modalContent}>
      {user ? (
        <>
          <CustomText style={{ letterSpacing: -1 }}> {user.first_name} {user.last_name}</CustomText>
          <CustomText style={styles.emailText}>{user.email}</CustomText>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
  },
  userText: {
    fontSize: 900,
    fontWeight: '600',
    marginBottom: 4,
    flex: 1,
    textAlign: 'center',
    color: '#black',
  },
  emailText: {
    fontSize: 14,
    color: '#Black',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#ff5555',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Profile;

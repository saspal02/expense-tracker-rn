import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Profile from './Profile';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <Image source={require('/assets/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>EaseExpense AI</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={require('/assets/avatar.png')} style={styles.profile} resizeMode="cover" />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
        </Pressable>
        <Profile closeModal={() => setModalVisible(false)} />
      </Modal>
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
    elevation: 4,
    shadowColor: '#000',
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default Header;

import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Spends from './Spends';
import Header from './Header';


const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Header/>
      <View style={styles.container}>
        
        <View style={styles.spendsContainer}>
          <Spends />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  spendsContainer: {
    marginTop: 20,
  },
});

export default Home;

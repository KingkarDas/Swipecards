import React from 'react';
import { View, StyleSheet } from 'react-native';
import TinderSwiper from './TinderSwiper';  // Adjust the path as needed

const App = () => {
  return (
    <View style={styles.container}>
      <TinderSwiper />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
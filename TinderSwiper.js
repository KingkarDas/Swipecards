import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';

const Card = ({ title, content, zIndex, onSwipeRight, backgroundColor }) => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        onSwipeRight && onSwipeRight();
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  // Calculate rotation based on the swipe distance
  const rotate = pan.x.interpolate({
    inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const animatedStyles = {
    transform: [{ translateX: pan.x }, { rotate }],
    zIndex: zIndex,
    backgroundColor: backgroundColor,
  };

  return (
    <Animated.View style={[styles.card, styles.cardSize, animatedStyles]} {...panResponder.panHandlers}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </Animated.View>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    Animated.timing(data[currentIndex].animation, {
      toValue: Dimensions.get('window').width * 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const data = [
    { zIndex: 3, animation: new Animated.Value(0), color: 'red' },
    { zIndex: 2, animation: new Animated.Value(0), color: 'orange' },
    { zIndex: 1, animation: new Animated.Value(0), color: 'lightgreen' },
    { zIndex: 0, animation: new Animated.Value(0), color: 'cyan' },
  ];

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.card,
            styles.cardSize,
            {
              transform: [{ translateX: item.animation }],
              zIndex: item.zIndex,
              backgroundColor: item.color,
            },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </Animated.View>
      ))}
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          content={item.content}
          zIndex={item.zIndex}
          onSwipeRight={swipeRight}
          backgroundColor={item.color}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 8,
    padding: 16,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    position: 'absolute',
  },
  cardSize: {
    width: 320,
    height: 500,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
});

export default App;

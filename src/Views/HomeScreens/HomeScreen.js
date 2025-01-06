import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';

// Constants
import { ThameFont } from '../../Constants/theme'; // Ensure this import is correct and ThameFont is properly defined
import images from '../../Constants/images';

const { width: screenWidth } = Dimensions.get('window');

const dummyData = [
  {
    title: 'Beautiful Beach',
    image: images.pic1,
  },
  {
    title: 'Mountain Adventure',
    image: images.pic2,
  },
  {
    title: 'City Life',
    image: images.pic3,
  },
];

const HomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll position to update active index
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveIndex(currentIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.box1}>
            <Text style={styles.boxText}>Today's Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box2}>
            <Text style={styles.boxText}>Give Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel using ScrollView */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {dummyData.map((item, index) => (
            <View style={styles.carouselItem} key={index}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.carouselTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Indicator Dots */}
        <View style={styles.indicatorContainer}>
          {dummyData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                index === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '80%',
    height: '70%',
    backgroundColor: 'powderblue',
    paddingHorizontal: 40,
    borderRadius: 50,
    marginHorizontal: '10%',
    marginVertical: '10%',
  },
  box1: {
    padding: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 30,
  },
  box2: {
    padding: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 30,
  },
  boxText: {
    fontSize: 16,
    color: 'white',
    fontFamily: ThameFont.PrimaryBold, // Ensure ThameFont is defined properly
  },
  // Carousel Item Styles
  carouselItem: {
    width: screenWidth,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  carouselTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // Carousel Indicator Styles
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicatorDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'lightgray',
  },
});

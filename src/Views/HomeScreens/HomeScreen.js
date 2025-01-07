import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

// Constants
import {ThameFont} from '../../Constants/theme'; // Ensure this import is correct and ThameFont is properly defined
import images from '../../Constants/images';
import MenuScreen from '../Screens/MenuScreen';
import { useNavigation } from '@react-navigation/native';


const {width: screenWidth} = Dimensions.get('window');

const dummyData = [
  {
    title: 'Beautiful Beach',
    image: images.pic1, // If pic1 is a local asset, use require in the images.js
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
  const navigation = useNavigation();

  // Handle scroll position to update active index
  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveIndex(currentIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('Menu')} style={styles.box1}>
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
          scrollEventThrottle={16}>
          {dummyData.map((item, index) => (
            <View style={styles.carouselItem} key={index}>
                <Image source={item.image} style={styles.image} />
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
    justifyContent: 'flex-start',
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor:"#A0937D",
    // margin:10,
    borderRadius: 30,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '80%',
    height: '45%',
    backgroundColor: '#F6E6CB',
    paddingHorizontal: 40,
    borderRadius: 50,
    marginHorizontal: '10%',
    marginVertical: '10%',
  },
  box1: {
    padding: 40,
    backgroundColor: '#A0937D',
    alignItems: 'center',
    borderRadius: 30,
  },
  box2: {
    padding: 40,
    backgroundColor: '#A0937D',
    alignItems: 'center',
    borderRadius: 30,
  },
  boxText: {
    fontSize: 16,
    color: '#F6E6CB',
    fontFamily: ThameFont.PrimaryExtraBold, // Ensure ThameFont is defined properly
  },
  // Carousel Item Styles
  carouselItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: screenWidth,
    alignItems: 'center',
    paddingHorizontal: 16,
    // backgroundColor: '#F6E6CB',
    borderRadius: 50,
  },
  image: {
    width: '90%',
    height: 180,
    borderRadius: 20,
  },
  carouselTitle: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: ThameFont.PrimaryExtraBold,
    color: '#333',
  },
  // Carousel Indicator Styles
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:10 ,
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

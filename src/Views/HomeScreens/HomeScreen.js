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
import Swiper from 'react-native-swiper';

// Constants
import {ThameFont} from '../../Constants/theme'; // Ensure this import is correct and ThameFont is properly defined
import images from '../../Constants/images';
import MenuScreen from '../Screens/MenuScreen';
import {useNavigation} from '@react-navigation/native';

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
    <SafeAreaView style={{backgroundColor:'white', height:'100%'}}>
      <View style={{width:'100%'}}>
        <ScrollView>
          <View style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly', marginVertical:'10%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}
              style={styles.box1}>
              <Text style={styles.boxText}>Today's Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box2}>
              <Text style={styles.boxText}>Give Feedback</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}      // Enable auto-scroll
        autoplayTimeout={5}  // Auto-scroll every 3 seconds
        loop={true}          // Infinite loop
      >
        {dummyData.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.carouselTitle}>{item.title}</Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '50%',
    paddingHorizontal: 40,
  },
  box1: {
    padding: 30,
    backgroundColor: '#001F3F',
    alignItems: 'center',
    borderRadius: 30,
  },
  box2: {
    padding: 30,
    backgroundColor: '#001F3F',
    alignItems: 'center',
    borderRadius: 30,
  },
  boxText: {
    fontSize: 16,
    color: '#F6E6CB',
    fontFamily: ThameFont.PrimaryExtraBold,
  },
  // Swiper Styles
  wrapper: {
    height: "100%", // Adjust height based on your design
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#6A9AB0',
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
});

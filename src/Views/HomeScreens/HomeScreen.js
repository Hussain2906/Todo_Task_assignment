import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Swiper from 'react-native-swiper';
import YoutubePlayer from "react-native-youtube-iframe";

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
  const [playing, setPlaying] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const changeState = useCallback((state)=>{
    if(state === 'ended'){
      setPlaying(false)
      Alert.alert('Video','Video is Ended')
    }
  },[])

  const tooglePlay = useCallback(()=>{
    setPlaying((prev)=> !prev)
  },[])
  // Handle scroll position to update active index
  // const handleScroll = event => {
  //   const scrollPosition = event.nativeEvent.contentOffset.x;
  //   const currentIndex = Math.round(scrollPosition / screenWidth);
  //   setActiveIndex(currentIndex);
  // };

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
      <View style={{width:'90%', justifyContent:'center', marginHorizontal:'5%', marginVertical:'5%'}}>
        <YoutubePlayer 
        height={250}
        videoId={'MxIPQZ64x0I'}
        play={playing}
        onChangeState={changeState}
        />
        <View style={{flexDirection:'row', width:'100%', justifyContent:'center'}}>
        <TouchableOpacity style={styles.playbtn}  onPress={tooglePlay}><Text style={styles.btnText}>Play & Pause Video</Text></TouchableOpacity>
        </View>
      </View>
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
  playbtn:{
    width:'auto',
    height:40,
    // backgroundColor:'grey',
    justifyContent:'center',
    borderWidth:4,
    borderColor:'#001F3F',
    borderRadius:30,
    elevation:5,
    paddingHorizontal:10
  },
  btnText:{
    fontSize:16,
    fontFamily:ThameFont.PrimarySemiBold,
    textAlign:'center'
  }
});

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {ThameFont} from '../../Constants/theme';
import firestore from '@react-native-firebase/firestore';

const MenuScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [isMenuLoading, setIsMenuLoading] = useState(true);

  // Fetch menu data from Firestore for the selected day
  const fetchMenuData = async day => {
    setIsMenuLoading(true);
    setSelectedDay(day);
    try {
      const snapshot = await firestore()
        .collection('ThaaliMenu')
        .where('Day', '==', day) // Fetch data where the 'Day' matches the selected day
        .get();
      const data = snapshot.docs.map(doc => doc.data()); // Map Firestore documents to data array
      setMenuData(data);
    } catch (error) {
      console.log('Error fetching menu data: ', error);
    }
    setIsMenuLoading(false);
  };

  const toggleModal = day => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      fetchMenuData(day); // Fetch data when opening the modal
    }
  };

  // Reusable MenuItem component for each day
  const MenuItem = ({day}) => (
    <TouchableOpacity style={styles.menuBox} onPress={() => toggleModal(day)}>
      <Text style={styles.dayText}>{day} Menu</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Display menu items for each day */}
        <View style={styles.MainContainer}>
          <MenuItem day="Monday" />
          <MenuItem day="Tuesday" />
        </View>
        <View style={styles.MainContainer}>
          <MenuItem day="Wednesday" />
          <MenuItem day="Thursday" />
        </View>
        <View style={styles.MainContainer}>
          <MenuItem day="Friday" />
          <MenuItem day="Saturday" />
        </View>

        {/* Modal for displaying the menu */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          animationOutTiming={1000}
          animationInTiming={1000}
          backdropOpacity={0.4}>
          <View style={styles.modal}>
            {isMenuLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : menuData.length ? (
              menuData.map((item, index) => (
                <View key={index} style={styles.menuContainer}>
                  <View style={styles.textView}>
                    <Text style={styles.menuText1}>Roti/Naan</Text>
                    <View  style={styles.menuText}><Text style={{fontSize:16, fontFamily:ThameFont.PrimaryBold}}>{item.Roti}</Text>

                    </View>
                    </View>
                  <View style={styles.textView}>
                    <Text style={styles.menuText1}>Meethaas</Text>
                    <View  style={styles.menuText}><Text style={{fontSize:16, fontFamily:ThameFont.PrimaryBold}}>{item.Meethaas}</Text></View>
                    </View>
                  <View style={styles.textView}>
                    <Text style={styles.menuText1}>Dal/Tarkari etc</Text>
                    <View  style={styles.menuText}><Text style={{fontSize:16, fontFamily:ThameFont.PrimaryBold}}>{item.Tarkari}</Text></View>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.menuText1}>Rice</Text>
                    <View  style={styles.menuText}><Text style={{fontSize:16, fontFamily:ThameFont.PrimaryBold}}>{item.Rice}</Text></View>
                    </View>
                  <View style={styles.textView}>
                    <Text style={styles.menuText1}>Todays Thali by</Text>
                    <View  style={styles.menuText}><Text style={{fontSize:16, fontFamily:ThameFont.PrimaryBold}}>{item.Thali_By}</Text></View>
                    </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      style={{width: '100%', justifyContent: 'center'}}
                      onPress={toggleModal}>
                      <Text style={{textAlign: 'center'}}>Close</Text>
                    </TouchableOpacity>
                    <Text style={{color:'#795757', fontFamily:ThameFont.PrimaryExtraBold}}>Contact Mulla Abbas bhai Umrethwala for any changes required in your Thaali</Text>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text style={styles.menuText}>
                  No menu available for {selectedDay}
                </Text>
                <TouchableOpacity
                  style={{width: '100%', justifyContent: 'center'}}
                  onPress={toggleModal}>
                  <Text style={{textAlign: 'center'}}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '30%',
    marginHorizontal: '5%',
  },
  MainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuBox: {
    width: '47%',
    borderWidth: 6,
    borderColor: '#3B3030',
    borderRadius: 20,
    height: 100,
    marginVertical: '8%',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    height: '70%',
    // padding: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textView: {
    borderWidth: 3,
    width: '100%',
    height: 60,
    marginTop: '10%',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  menuContainer: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#F6E6CB',
    paddingHorizontal: 10,
    paddingBottom: 30,
    borderWidth: 4,
    borderColor: '#664343',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: '#3B3030',
    fontFamily: ThameFont.PrimaryBold,
    padding: 10,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    flexDirection: 'row',
    paddingHorizontal: 10,
    fontfamily: ThameFont.PrimaryBold,
    // backgroundColor: '#F6E6CB',
    borderWidth: 2,
    borderColor: '#3B3030',
    borderRadius: 20,
  },
  menuText1: {
    fontSize: 16,
    fontFamily: ThameFont.PrimarySemiBold,
    paddingHorizontal: 10,
  },
});

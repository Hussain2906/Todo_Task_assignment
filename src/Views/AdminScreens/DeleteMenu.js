/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ThameFont} from '../../Constants/theme';
import {doc, firebase} from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

const DeleteMenu = () => {
  const navigation = useNavigation();
  const [editCliked, seteditCliked] = useState(false);
  const [deleteCliked, setdeleteCliked] = useState(false);
  const [roti, setRoti] = useState('');
  const [meethaas, setMeethaas] = useState('');
  const [tarkari, setTarkari] = useState('');
  const [vegies, setVegies] = useState('');
  const [rice, setRice] = useState('');
  const [thaliBy, setThaliBy] = useState('');
  const [day, setDay] = useState('');
  const [days, setDays] = useState([]);

  const updateMenu = async () => {
    const docRef = firebase.firestore().collection('ThaaliMenu').doc(day);
    const docSanp = await docRef.get();
    if (!docSanp.exists) {
      Alert.alert(
        'Add Menu',
        'Menu for Specific day is not available. Please go to Add Menu',
      );
    } else {
      try {
        await firebase.firestore().collection('ThaaliMenu').doc(day).update({
          Roti: roti,
          Meethaas: meethaas,
          Vegetable: vegies,
          Tarkari: tarkari,
          Rice: rice,
          Thali_By: thaliBy,
          Day: day,
        });
        Alert.alert('Success', 'Menu updated successfully');
        seteditCliked(false);
        setRoti('');
        setMeethaas('');
        setVegies('');
        setTarkari('');
        setRice('');
        setThaliBy('');
        setDay(''); // Reset day to default
        navigation.navigate('AdminStack');
      } catch (error) {
        console.log('Error updating menu: ', error);
        Alert.alert('Error', 'Failed to update menu');
      }
    }
  };

  const fetchDays = async () => {
    setdeleteCliked(true)
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection('ThaaliMenu')
        .get();
      const daysArray = [];

      querySnapshot.forEach(doc => {
        const dayData = doc.data();
        if (dayData.Day) {
          daysArray.push(dayData.Day);
        }
      });

      setDays(daysArray);
      console.log(daysArray);
    } catch (error) {
      console.log('Error fetching menu days: ', error);
      Alert.alert('Error', 'Failed to retrieve menu days');
    }
  };

  const deleteDay = async day => {
    try {
      await firebase.firestore().collection('ThaaliMenu').doc(day).delete();
      Alert.alert('Success', 'Day deleted successfully');
      setDays(days.filter(item => item !== day));
    } catch (error) {
      console.log('Error deleting menu: ', error);
      Alert.alert('Error', 'Failed to delete menu');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            height: 50,
            marginTop: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: ThameFont.PrimaryExtraBold,
              color: '#0077b6',
            }}>
            Edit or Delete Menu
          </Text>
        </View>
        <View>
          <View style={styles.dayContainer}>
            <Text style={styles.allText}>Delete Menu Here</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 100,
              }}>
              <TouchableOpacity onPress={() => seteditCliked(true)}>
                <Text style={styles.allText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fetchDays}>
                <Text style={styles.allText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {editCliked ? (
        <Modal
          isVisible={editCliked}
          onBackdropPress={() => seteditCliked(false)}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationOutTiming={1000}
          animationInTiming={1000}
          backdropOpacity={0.7}>
          <View style={styles.modal}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={roti}
                onChangeText={text => setRoti(text)}
                placeholder="Edit Roti"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
              <TextInput
                style={styles.input}
                value={meethaas}
                onChangeText={text => setMeethaas(text)}
                placeholder="Edit Meethaas"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
              <TextInput
                style={styles.input}
                value={vegies}
                onChangeText={text => setVegies(text)}
                placeholder="Edit Sabji"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
              <TextInput
                style={styles.input}
                value={tarkari}
                onChangeText={text => setTarkari(text)}
                placeholder="Edit Tarkari"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
              <TextInput
                style={styles.input}
                value={rice}
                onChangeText={text => setRice(text)}
                placeholder="Edit Rice"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
              <TextInput
                style={styles.input}
                value={thaliBy}
                onChangeText={text => setThaliBy(text)}
                placeholder="Edit Thali By"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
              <TextInput
                style={styles.input}
                value={day}
                onChangeText={text => setDay(text)}
                placeholder="Edit Day"
                placeholderTextColor={'#0077b6'}
                fontFamily={ThameFont.PrimarySemiBold}
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={updateMenu}>
              <Text style={styles.allText2}>Save Edit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : null}

      {/* Delete Menu Modal */}
      {deleteCliked ? (
        <Modal
          isVisible={deleteCliked}
          onBackdropPress={() => setdeleteCliked(false)}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationOutTiming={1000}
          animationInTiming={1000}
          backdropOpacity={0.7}>
          <View style={styles.modal}>
            <View style={styles.inputContainer}>
              {days.length === 0 ? (
                <TouchableOpacity onPress={()=> setdeleteCliked(false)} style={styles.dayContainer}>
                    <Text style={styles.allText}>There is no Data to Delete</Text>
                </TouchableOpacity>
              ) 
              : days.map((dayItem, index) => (
                <View key={index} style={styles.dayContainer}>
                  <View>
                    <Text style={{fontFamily: ThameFont.PrimaryExtraBold}}>
                      Delete {dayItem} Menu
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteDay(dayItem)}>
                    <Text style={styles.allText2}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )) }
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

export default DeleteMenu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: '30%',
  },
  dayContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 4,
    borderColor: '#90e0ef',
    borderRadius: 15,
  },
  allText: {
    fontSize: 15,
    fontFamily: ThameFont.PrimarySemiBold,
    color: '#0077b6',
    textAlign: 'center',
  },
  allText2: {
    fontSize: 15,
    fontFamily: ThameFont.PrimarySemiBold,
    color: '#90e0ef',
    textAlign: 'center',
  },
  modal: {
    flexDirection: 'column',
    backgroundColor: '#90e0ef',
    width: '100%',
    height: 'auto',
    marginVertical: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
  },
  inputContainer: {
    width: '90%',
    marginVertical: '10%',
  },
  input: {
    width: '90%',
    borderBottomColor: '#0077b6',
    borderBottomWidth: 1,
    fontSize: 16,
    marginTop: 20,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#fff',
    marginVertical: 20,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  deleteButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0077b6',
    borderRadius: 15,
  },
});

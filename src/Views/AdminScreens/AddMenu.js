import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {ThameFont} from '../../Constants/theme';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const AddMenu = () => {
  const navigation = useNavigation();
  const [roti, setRoti] = useState('');
  const [meethaas, setMeethaas] = useState('');
  const [tarkari, setTarkari] = useState('');
  const [rice, setRice] = useState('');
  const [thaliBy, setThaliBy] = useState('');
  const [day, setDay] = useState('Monday'); // New state for the day
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!roti || !meethaas || !tarkari || !rice || !thaliBy || !day) {
      Alert.alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // Add new data to Firestore with the day field
      await firestore().collection('ThaaliMenu').add({
        Roti: roti,
        Meethaas: meethaas,
        Tarkari: tarkari,
        Rice: rice,
        Thali_By: thaliBy,
        Day: day, // Include the day field
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setLoading(false);
      navigation.navigate('AdminStack');
      Alert.alert('Success', 'Menu added successfully!');
      // Reset form
      setRoti('');
      setMeethaas('');
      setTarkari('');
      setRice('');
      setThaliBy('');
      setDay('Monday'); // Reset day to default
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to submit form: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.heading}>Add Menu</Text>
        <Text style={styles.label}>Roti / Naan</Text>
        <TextInput style={styles.input} value={roti} onChangeText={setRoti} />
        <Text style={styles.label}>Meethaas</Text>
        <TextInput
          style={styles.input}
          value={meethaas}
          onChangeText={setMeethaas}
        />
        <Text style={styles.label}>Tarkari / Dal</Text>
        <TextInput
          style={styles.input}
          value={tarkari}
          onChangeText={setTarkari}
        />
        <Text style={styles.label}>Rice</Text>
        <TextInput style={styles.input} value={rice} onChangeText={setRice} />
        <Text style={styles.label}>Today's Thaali by?</Text>
        <TextInput
          style={styles.input}
          value={thaliBy}
          onChangeText={setThaliBy}
        />
        {/* New day selection input */}
        <Text style={styles.label}>Select Day</Text>
        <TextInput
          style={styles.input}
          value={day}
          onChangeText={setDay} // Optionally use a picker instead
        />

        <Button title="Submit" onPress={handleSubmit} color="#3B3030" />
      </View>
    </SafeAreaView>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    padding: 20,
    backgroundColor: '#FFF0D1', // pastel background
  },
  container1: {
    marginVertical: '17%',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: ThameFont.PrimaryExtraBold,
  },
  label: {
    fontSize: 18,
    fontFamily: ThameFont.PrimaryMeduim,
    color: '#3B3030', // dark text color
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#795757', // border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF0D1', // input background
    color: '#3B3030', // input text color
  },
});

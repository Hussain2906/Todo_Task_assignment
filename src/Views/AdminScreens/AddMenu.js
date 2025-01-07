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
import { useNavigation } from '@react-navigation/native';

const AddMenu = () => {

  const navigation = useNavigation();
  const [roti, setRoti] = useState('');
  const [meethaas, setMeethaas] = useState('');
  const [tarkari, setTarkari] = useState('');
  const [rice, setRice] = useState('');
  const [thaliBy, setThaliBy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!roti || !meethaas || !tarkari || !rice || !thaliBy) {
      Alert.alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // Add new data to Firestore in the "dummyFormCollection" collection
      await firestore().collection('ThaaliMenu').add({
        Roti: roti,
        Meethaas: meethaas,
        Tarkari: tarkari,
        Rice: rice,
        Thali_By: thaliBy,
        createdAt: firestore.FieldValue.serverTimestamp(), // Adding a timestamp for when the document was created
      });
      setLoading(false);
      navigation.navigate('AdminStack');
      Alert.alert('Success', 'Form submitted successfully!');
      // Optionally, reset the form after successful submission
      setRoti('');
      setMeethaas('');
      setTarkari('');
      setRice('');
      setThaliBy('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit form: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container1}>
          <View>
            <Text style={styles.heading}>Add Menu</Text>
          </View>
          <View>
            <Text style={styles.label}>Roti / Naan</Text>
            <TextInput
              style={styles.input}
              value={roti}
              onChangeText={setRoti}
            />
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
            <TextInput
              style={styles.input}
              value={rice}
              onChangeText={setRice}
            />
            <Text style={styles.label}>Today's Thaali by?</Text>
            <TextInput
              style={styles.input}
              value={thaliBy}
              onChangeText={setThaliBy}
            />
            <Button title="Submit" onPress={handleSubmit} color="#3B3030" />
          </View>
        </View>
      )}
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

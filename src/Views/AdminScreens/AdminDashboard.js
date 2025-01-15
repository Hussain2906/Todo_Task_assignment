import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ThameFont} from '../../Constants/theme';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const AdminDashboard = () => {
  const [docName, setDocName] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false); // To manage the upload state

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (result) {
        const fileUri = result[0].uri; // File URI to upload
        const name = result[0].name; // File name
        setFileName(name);

        const storageRef = storage().ref(`uploads/${name}`);
        setIsUploading(true); // Start uploading state

        // Upload the file to Firebase Storage
        const task = storageRef.putFile(fileUri);

        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        await task;

        // Get the download URL after the upload is complete
        const downloadUrl = await storageRef.getDownloadURL();

        // Save document metadata in Firestore
        await firestore().collection('documents').add({
          name,
          url: downloadUrl,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        console.log('Document uploaded and metadata saved in Firestore');
        setIsUploading(false); // End uploading state
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error uploading document: ', err);
        setIsUploading(false); // Handle error
      }
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 50}}>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            marginHorizontal: '10%',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: ThameFont.PrimaryExtraBold,
              padding: 20,
              textAlign: 'center',
            }}>
            Admin Section
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Addmenu')}
            style={styles.box1}>
            <Text style={styles.boxText}>Add Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => navigation.navigate('Deletemenu')}>
            <Text style={styles.boxText}>Delete Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Doc upload Code */}
        {fileName !== '' ? (
          <View
            style={{
              justifyContent: 'center',
              width: '80%',
              padding: 25,
              marginHorizontal: 'auto',
              marginTop: '20%',
              backgroundColor: '#DFF2EB',
              borderWidth: 5,
              borderColor: '#001F3F',
              borderRadius: 18,
            }}>
            <Text style={{fontSize: 20, fontFamily: ThameFont.PrimaryMeduim}}>
              File Name: {fileName}
            </Text>
            <TouchableOpacity style={styles.playbtn} onPress={() => setFileName('')}>
              <Text style={styles.btnText}>Cancel Upload</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              width: '80%',
              padding: 25,
              marginHorizontal: 'auto',
              marginTop: '20%',
              backgroundColor: '#DFF2EB',
              borderWidth: 5,
              borderColor: '#001F3F',
              borderRadius: 18,
            }}>
            <View style={{width: '100%', justifyContent: 'center'}}>
              <Text style={{fontSize: 18, fontFamily: ThameFont.PrimaryMeduim}}>
                Upload Document
              </Text>
            </View>
            <View style={{width: '100%', justifyContent: 'flex-start'}}>
              <TouchableOpacity
                style={styles.playbtn}
                onPress={()=>navigation.navigate('Name')}
                disabled={isUploading} // Disable while uploading
              >
                <Text style={styles.btnText}>
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  box1: {
    padding: 40,
    backgroundColor: '#6A9AB0',
    alignItems: 'center',
    borderRadius: 30,
  },
  box2: {
    padding: 40,
    backgroundColor: '#6A9AB0',
    alignItems: 'center',
    borderRadius: 30,
  },
  boxText: {
    fontSize: 16,
    color: '#001F3F',
    fontFamily: ThameFont.PrimaryExtraBold,
  },
  playbtn: {
    marginTop: 30,
    width: 'auto',
    height: 40,
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#001F3F',
    borderRadius: 30,
    elevation: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: 16,
    fontFamily: ThameFont.PrimarySemiBold,
    textAlign: 'center',
  },
});

/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {ThameFont} from '../../Constants/theme';

const DeleteMenu = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            // backgroundColor: '#fff',
            height: 50,
            marginTop: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: ThameFont.PrimaryExtraBold,
              color: '#0077b6',
              // marginTop: 20,
              // backgroundColor: '#fff',
            }}>
            Edit or Delete Menu
          </Text>
        </View>
        <View>
          <View style={styles.dayContainer}>
            <Text style={styles.allText}>Container Day</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 100,
              }}>
              <TouchableOpacity>
                <Text style={styles.allText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.allText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    // height: 300,
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: 'blue',
    width: '100%',
    marginVertical: '30%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
  },
});

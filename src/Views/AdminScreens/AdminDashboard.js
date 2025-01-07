import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ThameFont } from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Addmenu')}
            style={styles.box1}>
            <Text style={styles.boxText}>Add Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate('Deletemenu')}>
            <Text style={styles.boxText}>Delete Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF0D1',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor:"#A0937D",
    // margin:10,
    borderRadius: 30,
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '80%',
    height: '45%',
    backgroundColor: '#795757',
    paddingHorizontal: 40,
    borderRadius: 50,
    marginHorizontal: '10%',
    marginVertical: '10%',
  },
  box1: {
    padding: 40,
    backgroundColor: '#FFF0D1',
    alignItems: 'center',
    borderRadius: 30,
  },
  box2: {
    padding: 40,
    backgroundColor: '#FFF0D1',
    alignItems: 'center',
    borderRadius: 30,
  },
  boxText: {
    fontSize: 16,
    color: '#3B3030',
    fontFamily: ThameFont.PrimaryExtraBold, // Ensure ThameFont is defined properly
  },
});

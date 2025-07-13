/* eslint-disable no-dupe-keys */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TextInput,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from '../Constants/icons';
import TaskList from '../Views/HomeTabs/TaskList';
import TaskForm from '../Views/HomeTabs/TaskForm';

const getFormattedDate = () => {
  const today = new Date();
  const day = today.getDate();
  const monthName = today.toLocaleString('default', { month: 'long' });
  return `Today, ${day} ${monthName}`;
};

const CustomHeader = ({ title = 'My Tasks', showSearch = true }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showSearch && (
          <View style={styles.searchRow}>
            <Icon type={Icons.Entypo} name="grid" size={22} color="white" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#ccc"
              style={styles.searchInput}
            />
            <Icon
              type={Icons.Entypo}
              name="dots-three-horizontal"
              size={18}
              color="white"
            />
          </View>
        )}
        <Text style={styles.date}>{getFormattedDate()}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => (
  <Tab.Navigator
    initialRouteName="TaskList"
    screenOptions={{
      tabBarShowLabel: false,
      keyboardHidesTabBar: true,
      tabBarStyle: {
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: 'white',
        borderTopColor: 'transparent',
        borderRadius: 30,
        marginVertical: '4%',
      },
    }}
  >
    <Tab.Screen
      name="TaskList"
      component={TaskList}
      options={{
        header: () => <CustomHeader title="My Tasks" showSearch={true} />,
        tabBarIcon: () => (
          <Icon
            type={Icons.FontAwesome}
            name="list"
            color="black"
            size={25}
          />
        ),
      }}
    />
    <Tab.Screen
      name="TaskForm"
      component={TaskForm}
      options={{
        header: () => <CustomHeader title="Add Task" showSearch={false} />,
        tabBarIcon: () => (
          <Icon
            type={Icons.Entypo}
            name="add-to-list"
            color="black"
            size={25}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#A993FE',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: '#A993FE',
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 36,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
  },
  date: {
    marginTop: 15,
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

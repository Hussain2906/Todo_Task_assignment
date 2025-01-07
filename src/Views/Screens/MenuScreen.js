import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MenuScreen = () => {
  return (
    <SafeAreaView>
        <View style={styles.container}>
        <View style={styles.MainContainer}>
            <TouchableOpacity style={styles.menuBox}><Text>Container 1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}><Text>Container 2</Text></TouchableOpacity>
        </View>
        <View style={styles.MainContainer2}>
            <TouchableOpacity style={styles.menuBox}><Text>Container 1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}><Text>Container 2</Text></TouchableOpacity>
        </View>
        <View style={styles.MainContainer2}>
            <TouchableOpacity style={styles.menuBox}><Text>Container 1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}><Text>Container 2</Text></TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent:'center',
        // margin:"7%",
        // marginVertical:'20%',
        marginTop:'30%',
    },
    MainContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        // marginVertical:'20%',
    },
    MainContainer2: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        // marginVertical:'10%',
    },
    menuBox:{
        width:'47%',
        backgroundColor:'green',
        height:100,
        marginVertical:'8%'
    }
})
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DownloadScreen = () => {
  return (
    <ScrollView>
      <SafeAreaView style={{backgroundColor:'white', height:'100%', width:'100%'}}>
        <View>
          <Text>Screen for Download</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default DownloadScreen

const styles = StyleSheet.create({})
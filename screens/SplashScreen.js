import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Client Logo</Text>
      <Text style={styles.promotion}>Powered by Sample</Text>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container : {
        height:'100%',
        width:'100%'
    },
    logo : {
        fontSize:20,
        textAlign:"center",
        top:"50%",
    },
    promotion : {
        textAlign:'center',
        top: '90%',
    }
})
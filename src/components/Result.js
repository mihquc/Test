import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Result = ({isWin, handlePlayAgain}) => {
  return (
    <View style={styles.container}>
      <Image
       source={isWin ? require('../../assets/you-win.png') : require('../../assets/you-lose.png')}
       style={{marginBottom: 70}}
      />
      <TouchableOpacity onPress={handlePlayAgain}>
      <Image
       source={require('../../assets/tap-to-restart.png')}
      />
      </TouchableOpacity>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }
})
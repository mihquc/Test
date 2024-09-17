import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useNavigationService from '../navigation/NavigationService';

const Home = () => {
    const { navigate } = useNavigationService();
    return (
        <ImageBackground source={require('../../assets/home-background.png')} style={styles.background}>
            <Image
                source={require('../../assets/logo.png')}
                resizeMode='contain'
                style={{ marginBottom: 50 }}
            />
            <TouchableOpacity onPress={() => {
                navigate('Game')
            }}>
                <Image
                    source={require('../../assets/tap-to-play.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
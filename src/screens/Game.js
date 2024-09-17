import { Image, ImageBackground, StyleSheet, TouchableOpacity, View, Animated, Text } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Result from '../components/Result';

const Game = () => {
    const [ballPosition, setBallPosition] = useState(Math.floor(Math.random() * 3));
    const [selectedCup, setSelectedCup] = useState(null);
    const [isShuffling, setIsShuffling] = useState(true);

    const [isWin, setIsWin] = useState(false);

    const cup1ShuffleAnim = useRef(new Animated.Value(0)).current;
    const cup2ShuffleAnim = useRef(new Animated.Value(0)).current;
    const cup3ShuffleAnim = useRef(new Animated.Value(0)).current;
    const liftAnim1 = useRef(new Animated.Value(0)).current;
    const liftAnim2 = useRef(new Animated.Value(0)).current;
    const liftAnim3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        shuffleCups();
    }, []);

    const shuffleCups = () => {
        setIsShuffling(true);
        Animated.parallel([
            Animated.sequence([
                Animated.timing(cup1ShuffleAnim, { toValue: Math.random() * 300 - 150, duration: 300, useNativeDriver: true }),
                Animated.timing(cup1ShuffleAnim, { toValue: Math.random() * 300 - 150, duration: 300, useNativeDriver: true }),
                Animated.timing(cup1ShuffleAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            ]),
            Animated.sequence([
                Animated.timing(cup2ShuffleAnim, { toValue: Math.random() * 300 - 150, duration: 300, useNativeDriver: true }),
                Animated.timing(cup2ShuffleAnim, { toValue: Math.random() * 300 - 150, duration: 300, useNativeDriver: true }),
                Animated.timing(cup2ShuffleAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            ]),
            Animated.sequence([
                Animated.timing(cup3ShuffleAnim, { toValue: Math.random() * 300 - 150, duration: 300, useNativeDriver: true }),
                Animated.timing(cup3ShuffleAnim, { toValue: Math.random() * 300 - 150, duration: 300, useNativeDriver: true }),
                Animated.timing(cup3ShuffleAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            ]),
        ]).start(() => setIsShuffling(false));
    };

    const liftCup = (index) => {
        const liftAnimation = Animated.timing(
            index === 0 ? liftAnim1 : index === 1 ? liftAnim2 : liftAnim3,
            {
                toValue: -100,
                duration: 500,
                useNativeDriver: true,
            }
        );
        liftAnimation.start();
    };

    const handleCupPress = (index, isBallHere) => {
        if (isShuffling || selectedCup !== null) return;
        setSelectedCup(index);
        liftCup(index);
        setIsWin(isBallHere);
    };

    const handlePlayAgain = () => {
        setSelectedCup(null);
        setIsWin(false);
        setBallPosition(Math.floor(Math.random() * 3));
        shuffleCups();
    };

    const data = [
        { id: 1, image: require('../../assets/plastic-cup.png') },
        { id: 2, image: require('../../assets/plastic-cup.png') },
        { id: 3, image: require('../../assets/plastic-cup.png') },
    ];

    return (
        <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
            <View style={{ flexDirection: 'row', marginTop: 70 }}>
                {data.map((item, index) => {
                    const isBallHere = ballPosition === index;
                    let animatedStyle;

                    if (index === 0) animatedStyle = { transform: [{ translateX: cup1ShuffleAnim }, { translateY: selectedCup === index ? liftAnim1 : 0 }] };
                    if (index === 1) animatedStyle = { transform: [{ translateX: cup2ShuffleAnim }, { translateY: selectedCup === index ? liftAnim2 : 0 }] };
                    if (index === 2) animatedStyle = { transform: [{ translateX: cup3ShuffleAnim }, { translateY: selectedCup === index ? liftAnim3 : 0 }] };

                    return (
                        <View key={item?.id} style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleCupPress(index, isBallHere)}>
                                <Animated.View style={animatedStyle}>
                                    <Image
                                        source={item?.image}
                                        style={{ width: 100, height: 100, margin: 10 }}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                            {selectedCup === index && isBallHere && (
                                <Image
                                    source={require('../../assets/ball.png')}
                                    style={{ position: 'absolute', bottom: 15 }}
                                />
                            )}
                        </View>
                    );
                })}
            </View>
            {selectedCup !== null && (
                <Result
                    isWin={isWin}
                    handlePlayAgain={handlePlayAgain}
                />
            )}
        </ImageBackground>
    );
};

export default Game;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

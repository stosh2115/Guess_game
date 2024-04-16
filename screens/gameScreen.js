import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from '../components/ui/primaryButton'

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

useEffect(() => {
    if (currentGuess === userNumber ) {
        onGameOver();
    }

}, [currentGuess, userNumber, onGameOver]);


function nextGuessHandler(direction) {
    if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) 
    {
        Alert.alert("You are a Liar!",'You know that is wrong...', [
            {text: 'Sorry!', style: 'cancel'},
        ]);
        return;
    };
    
    if (direction === 'lower') {
        maxBoundary = currentGuess;
    } else {
        minBoundary = currentGuess;
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber)
}



    return (
    <View style={styles.screen}>
        <Title>Oppenet's guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
            <Text>Higher or Lower?</Text>
            <View>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
            </View>
        </View>
        {/* <View>LOG ROUNDS</View> */}
    </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ddb52f',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#ddb52f',
        padding: 12,

    },
});
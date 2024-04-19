import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons'

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from '../components/ui/primaryButton'
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";
import GuessLogItem from "../components/game/GuessLogItem";


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
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

useEffect(() => {
    if (currentGuess === userNumber ) {
        onGameOver(guessRounds.length);
    }

}, [currentGuess, userNumber, onGameOver]);

useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
}, []);


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
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
}

const guessRoundsListLength = guessRounds.length;



    return (
    <View style={styles.screen}>
        <Title>Oppenet's guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Feather name="minus" size={24} color="white"/>
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Feather name="plus" size={24} color="white"/>
                    </PrimaryButton>
                </View>
            </View>
        </Card>
        <View style={styles.listContainer}>
            {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text> )} */}
            <FlatList 
            data={guessRounds} 
            renderItem={(itemData) => (
                 <GuessLogItem 
                    roundNumber={guessRoundsListLength - itemData.index} 
                    guess={itemData.item}
                     /> 
            )}
            keyExtractor={(item) => item}
            />
        </View>
    </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText:{
        margin: 12
    },
    buttonsContainer:{
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },

    listContainer: {
        flex: 1,
        padding: 16,
    }
});
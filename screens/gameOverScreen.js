import { View, Image, StyleSheet , Text} from "react-native";
import Title from "../components/ui/Title";

import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/primaryButton";

function GameOverScreen() {
    return (
        <View style={styles.rootContainer}>
            <Title>GAME OVER!</Title>
            <View style={styles.imageContainer}>
                <Image 
                style={styles.image} 
                source={require('../assets/images/success.png')}
                />
            </View>
            <Text style={styles.summaryText}> 
                Your phone needed <Text style={styles.highlight}>X</Text> rounds to guess the number
                <Text style={styles.highlight}>Y</Text>.
            </Text>
            <PrimaryButton>Start New Game</PrimaryButton>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padidng: 24, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: 150,
        width: 300,
        height: 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
});
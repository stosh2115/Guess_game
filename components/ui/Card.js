import { View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function Card({ children }) {
    return <View style={styles.Card}>{children}</View>
    
}

export default Card;

const styles = StyleSheet.create({
    Card: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius:8,
        padding: 16,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor:'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})
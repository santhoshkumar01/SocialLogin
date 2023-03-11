import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { DummyText } from './DummyText'

export default AboutUs = () => {

    return (
        <ScrollView>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{DummyText}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        marginBottom: '5%',
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 18,
        lineHeight:30
    }
})
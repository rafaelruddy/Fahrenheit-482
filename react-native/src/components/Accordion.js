import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Accordion({ title, content }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </TouchableOpacity>
            {isExpanded && (
                <TouchableOpacity style={styles.content} onPress={toggleAccordion}>
                    <Text style={styles.contentText}>{content}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        
    },
    header: {
        backgroundColor: '#A60000',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.51,
        elevation: 5
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    content: {
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        elevation: 1
    },
    contentText: {

    }
});



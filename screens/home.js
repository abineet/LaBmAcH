import React from 'react';
import {ImageBackground, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

import homepage from 'LaBmAcH/assets/homepage.png';
import { auth } from 'LaBmAcH/screens/firebase';

const HomeScreen = ({navigation}) => {
    
    const list = auth.onAuthStateChanged((user)=>{
        console.log("Home triggered");
    });
    return (
        <View style = {{flex: 1}}>
            <ImageBackground source={homepage} style={{flex:1, resizeMode: 'cover', justifyContent: 'space-evenly'}}>
                <Text style={styles.hometextintro}>
                    LaBmAcH is a platform{'\n'}
                    which provides free access{'\n'}
                    to information about latest{'\n'}
                    research tools and{'\n'}
                    techniques of different{'\n'}
                    fields of science.
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.homebutton}>
                    <Text style={{color: "black", fontSize: 20, textAlign: "center"}}>Let{'\''}s Start</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    hometextintro: {
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
      textShadowOffset: {height:1,width:1},
      textShadowRadius: 1,
      textShadowColor: "black",
      textAlign: "center"
    },
    homebutton: {
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 1,
      height: 50,
      width: 150,
      alignSelf: 'center',
      justifyContent: 'center'
    }
});
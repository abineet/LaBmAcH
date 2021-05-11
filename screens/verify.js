import React,{useEffect} from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View} from 'react-native';

import registerpage from 'LaBmAcH/assets/register.png';
import { auth } from 'LaBmAcH/screens/firebase';

const VerifyScreen = ({navigation}) => {
    const list = auth.onAuthStateChanged((user)=>{
        console.log('Verify triggered!')
        if(user){
            if(user.emailVerified == true){
                navigation.navigate('Dashboard');
            }
        }
    });
    return(
        <View style={styles.container}>
            <ImageBackground source={registerpage} style={styles.loginbackground}>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <Text style={styles.logintextbody}>An email has been sent to you for verification. Please, check your email account :</Text>
                    <Text style={styles.logintextbody}>{auth.currentUser.email}</Text>
                    <Text style={styles.logintextbody}>Click the link, verify and Login again :</Text>
                    <TouchableOpacity
                        onPress={() => {
                            auth.signOut();
                            navigation.navigate('Login');
                        }}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.logintextbody}>If you haven't received the email, click to resend :</Text>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Email verification Sent again!')
                            auth.currentUser.sendEmailVerification();
                        }}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Resend</Text>
                    </TouchableOpacity>
                    <Text style={styles.logintextbody}>If you enetered an invalid email id, click to go back to registration :</Text>
                    <TouchableOpacity
                        onPress={() => {
                            auth.currentUser.delete();
                            navigation.navigate('Register');
                        }}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default VerifyScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    loginbackground: {
      flex: 1,
      resizeMode: "cover"
    },
    logintextheading: {
        color: "white",
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
    },
    logintextbody: {
          color: "white",
          fontSize: 20,
          textAlign: "center",
    },
    logininput: {
      alignSelf: 'center',
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 1,
      height: 50,
      width: 350,
      fontSize: 20
    },
    loginbutton: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "lightskyblue",
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        width: 150
    },
    logintextbutton: {
      color: "darkblue",
      fontSize: 20,
      textAlign: "center"
    }
  });
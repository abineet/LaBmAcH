import React,{useEffect} from 'react';
import { TextInput, TouchableOpacity, ImageBackground, StyleSheet, Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { auth } from 'LaBmAcH/screens/firebase';
import loginpage from 'LaBmAcH/assets/login.png';

const LoginScreen = ({route, navigation}) => {
    const {email, password, error} = route.params;

    const list = auth.onAuthStateChanged((user)=>{
        console.log("Login triggered");
        if(user){
            if(user.emailVerified==true){
                navigation.navigate('Dashboard');
            }
            else{
                navigation.setParams({error:'Email not verified!'});
                auth.signOut();
            }
        }
    });

    return (
        <KeyboardAwareScrollView resetScrollToCoords={{x:0,y:0}} enableAutomaticScroll={false} enableOnAndroid={true} enableResetScrollToCoords={true} contentContainerStyle={styles.container}
        extraHeight={100}>
            <ImageBackground source={loginpage} style={styles.loginbackground}>
                <View style={{justifyContent:'center', flex: 3}}>
                    <Text style={styles.logintextheading}>LaBmAcH</Text>
                </View>
                <View style={{justifyContent:'center', flex: 3}}>
                    <Text style={styles.logintextbody}>Login or Register to access content</Text>
                </View>
                <View style={{justifyContent: 'space-evenly', flex: 4}}>
                    <TextInput
                        style={styles.logininput}
                        placeholder="Email"
                        onChangeText={text=>navigation.setParams({email:text})}
                        value={email}
                        textAlign='center'
                    />
                    <TextInput
                       secureTextEntry={true}
                       style={styles.logininput}
                       placeholder="Password"
                       onChangeText={text=>navigation.setParams({password:text})}
                       value={password}
                       textAlign='center'
                    />
                </View>
                <View style={{justifyContent:'flex-start', flex: 4}}>
                    <TouchableOpacity
                        onPress={()=>{
                            auth
                                .signInWithEmailAndPassword(email, password)
                                .catch(err => navigation.setParams({error:err.message}))
                            }
                        }
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'red', fontSize: 10, textAlign: 'center'}}>{error}</Text>
                </View>
                <View style={{justifyContent:'space-evenly', flex: 3}}>
                    <Text style={styles.logintextbody}>New to LaBmAcH?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Register',{email:'', password:'',error:'', name:'', conpass:'', isSelected: false});
                        }}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
}

export default LoginScreen;

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
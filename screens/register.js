import React,{useEffect} from 'react';
import { TextInput, TouchableOpacity, ImageBackground, StyleSheet, Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox';

import { auth } from 'LaBmAcH/screens/firebase';
import loginpage from 'LaBmAcH/assets/login.png';

const RegisterScreen = ({route, navigation}) => {

    const {email,password,name,conpass,error,isSelected} = route.params;

    
    const list = auth.onAuthStateChanged((user)=>{
        console.log("Register triggered");
        if(user){
            console.log('NOT NULL USER Obtained!');
            if(user.emailVerified==false){
                console.log('Email not verified!');
                console.log("Display Name Updated!")
                user.updateProfile({displayName : name})
                user.sendEmailVerification();
                navigation.navigate('Verify');
            }
        }
    });

    return (
        <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
            <ImageBackground source={loginpage} style={styles.loginbackground}>
                <View style={{justifyContent:'space-evenly', flex: 3}}>
                    <Text style={styles.logintextheading}>LaBmAcH</Text>
                </View>
                <View style={{justifyContent: 'space-evenly', flex: 8.5}}>
                    <TextInput
                        style={styles.logininput}
                        placeholder="Full Name"
                        onChangeText={text=>navigation.setParams({name:text})}
                        value={name}
                        textAlign='center'
                    />
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
                       textAlign='center'
                       value={password}
                    />
                    <TextInput
                       secureTextEntry={true}
                       style={styles.logininput}
                       placeholder="Confirm Password"
                       onChangeText={text=>navigation.setParams({conpass:text})}
                       value={conpass}
                       textAlign='center'
                    />
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <CheckBox
                           value={isSelected}
                           onValueChange={(newVal)=>navigation.setParams({ isSelected : newVal })}
                           style={{alignSelf: 'center'}}
                           tintColors={'white'}
                        />
                        <Text style={styles.logintextbody}>I agree to the </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Terms And Conditions');
                            }}
                            style={{height : 20, width : 190}}>
                            <Text style={{textDecorationLine: 'underline', color: "white", fontSize: 20, textAlign: "center", fontStyle: 'italic'}}>terms and conditions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:'flex-start', flex: 2.5}}>
                    <TouchableOpacity
                        onPress={()=>{
                            if(isSelected && password==conpass && name!=''){
                                auth
                                .createUserWithEmailAndPassword(email,password)
                                .catch(err=>navigation.setParams({error:err.message}))
                            }
                            else if(name==''){
                                navigation.setParams({error:'Please, enter your name.'});
                            }
                            else if(password!=conpass){
                                navigation.setParams({error:'Password mismatch! Kindly verify again.'});
                            }
                            else{
                                navigation.setParams({error:'Please, agree to the Terms and Conditions.'});
                            }
                        }}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Register</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'red', fontSize: 10, textAlign: 'center'}}>{error}</Text>
                </View>
                <View style={{justifyContent:'space-evenly', flex: 3}}>
                    <Text style={styles.logintextbody}>Already registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login',{email:'', password:'',error:''});
                        }}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
}

export default RegisterScreen;

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
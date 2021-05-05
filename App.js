import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity, ImageBackground, Image,  StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

import homepage from './assets/homepage.png';
import loginpage from './assets/login.png';
import registerpage from './assets/register.png';
import dash_study from './assets/study.png';
import dash_about_us from './assets/about_us.png';
import dash_submit_req from './assets/submit_req.png';
import dash_contribute from './assets/contribute.png';
import dash_user from './assets/user.png';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';

const Stack = createStackNavigator();
var firebaseConfig = {
    apiKey: "AIzaSyDnQp-P3ZFJklAdWlBT8Q00s6kmH6SGOi0",
    authDomain: "labmach-ca37d.firebaseapp.com",
    projectId: "labmach-ca37d",
    storageBucket: "labmach-ca37d.appspot.com",
    messagingSenderId: "190491728067",
    appId: "1:190491728067:web:53db9a8fad79a0d30c2a76"
};
let app;
if (firebase.apps.length == 0){
    app=firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app();
}

const auth=firebase.auth();

function App() {
    const list = auth.onAuthStateChanged((user)=>{
        console.log("App triggered");
    });
    return (
        <NavigationContainer>
            <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} initialParams={{email:'', password:'',error:''}}/>
                    <Stack.Screen name="Register" component={RegisterScreen} initialParams={{email:'', password:'',error:'', name:'', conpass:'', isSelected: false}}/>
                    <Stack.Screen name="TermsAndCond" component={TermsAndCondScreen}/>
                    <Stack.Screen name="Verify" component={VerifyScreen}/>
                    <Stack.Screen name='Dashboard' component={Dashboard}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Listener({navigation}){
    const listener = auth.onAuthStateChanged((user)=>{
        console.log('AuthStateChanged!!!');
        if(user){
            console.log('NOT NULL USER Obtained!');
            if(user.emailVerified==false){
                console.log('Email not verified!');
                console.log("Display Name Updated!")
                user.updateProfile({displayName : name})
                user.sendEmailVerification();
                navigation.navigate('Verify');
            }
            else{
                console.log('To the Dashboard!');
                navigation.navigate('Dashboard');
            }
        }
        else{
            console.log('To homescreen!');
            navigation.navigate('Home');
        }
    });
}

function HomeScreen({navigation}) {
    
    const list = auth.onAuthStateChanged((user)=>{
        console.log("Home triggered");
    });
    return (
        <View style={styles.container}>
            <ImageBackground source={homepage} style={styles.homebackground}>
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
                    <Text style={styles.hometextbutton}>Let{'\''}s Start</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

function LoginScreen({route, navigation}) {
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
    /*
    const [email, setEmail]=React.useState('');
    const [password, setPassword]=React.useState('');
    const [error,setError]=React.useState('');
    */
    /*
    const unsubsribe = auth.onAuthStateChanged((user) =>{
        console.log("AuthState Changed!(login)");
       if(user!=null){
           console.log("Not null User OBTAINED!(login)");
           setEmail('');
           setPassword('');
           setError('');
           navigation.navigate('Dashboard');
       }
    });
    */
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


function RegisterScreen({route, navigation}) {

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

    /*
    const [email, setEmail]=React.useState('');
    const [password, setPassword]=React.useState('');
    const [name, setName]=React.useState('');
    const [conpass, setConpass]=React.useState('');
    const [error,setError]=React.useState('');
    const [isSelected, setSelection]=React.useState(false)

    const reset = () => {
        setEmail('');
        setPassword('');
        setConpass('');
        setName('');
        setError('');
        setSelection(false);
    }
    const unsubsribe = auth.onAuthStateChanged((user) =>{
        console.log("AuthState Changed!(register)");
       if(user){
            reset;
            console.log("Not null User OBTAINED!(register)");
            user.updateProfile({displayName : name});
            user.sendEmailVerification();
            navigation.navigate('Verify');
            console.log("After navigating to verify!")
       }
    });
    */

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
                                navigation.navigate('TermsAndCond');
                            }}
                            style={{height : 10, width : 10}}>
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

function TermsAndCondScreen({navigation}){
    return(
        <View style={styles.container}>
            <Text style={{flex: 2, fontSize: 30, fontWeight: 'bold', color: 'black'}}>Terms and Conditions</Text>
            <Text style={{flex: 6, fontSize: 10, color: 'black'}}>These are the terms and conditions.</Text>
            <Text style={{flex: 2, fontSize: 20, color: 'black'}}>Back to registration page :</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Register');
                }}
                style={styles.loginbutton}>
                <Text style={styles.logintextbutton}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

function VerifyScreen({navigation}){
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

function Dashboard({navigation}) {
    
    const handleSignOut=()=>{
        auth.signOut();
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={registerpage} style={styles.loginbackground}>
                <View style={{flexDirection:'row-reverse',flex: 1}}>
                     <TouchableOpacity
                        onPress={handleSignOut}
                        style={styles.loginbutton}>
                        <Text style={styles.logintextbutton}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', flex: 2}}>
                     <Text style={styles.logintextheading}>Hi! {auth.currentUser.displayName}</Text>
                </View>
                <View style={{justifyContent: 'flex-start', flex: 6}}>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.navigate('Login')}>
                            <Image source={dash_study} style={{height:105,width:120}}/>
                            <Text style={styles.logintextbody}>Study</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.navigate('Login')}>
                            <Image source={dash_submit_req} style={{height:105,width:120}}/>
                            <Text style={styles.logintextbody}>Request</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.navigate('Login')}>
                            <Image source={dash_user} style={{height:105,width:120}}/>
                            <Text style={styles.logintextbody}>User</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.navigate('Login')}>
                            <Image source={dash_contribute} style={{height:105,width:120}}/>
                            <Text style={styles.logintextbody}>Contribute</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.navigate('Login')}>
                            <Image source={dash_about_us} style={{height:105,width:120}}/>
                            <Text style={styles.logintextbody}>About us</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  homebackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'space-evenly'
  },
  hometextintro: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowOffset: {height:1,width:1},
    textShadowRadius: 1,
    textShadowColor: "black"
  },
  homebutton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: 150
  },
  hometextbutton: {
    color: "black",
    fontSize: 20,
    textAlign: "center"
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

export default App;

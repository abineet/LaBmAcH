import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View, Image} from 'react-native';

import dash_study from 'LaBmAcH/assets/study.png';
import dash_about_us from 'LaBmAcH/assets/about_us.png';
import dash_submit_req from 'LaBmAcH/assets/submit_req.png';
import dash_contribute from 'LaBmAcH/assets/contribute.png';
import dash_user from 'LaBmAcH/assets/user.png';
import registerpage from 'LaBmAcH/assets/register.png';
import { auth } from 'LaBmAcH/screens/firebase';

const Dashboard = ({navigation}) => {
    
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
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.navigate('Dashboard')}>
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

export default Dashboard;

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
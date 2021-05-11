import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { auth } from 'LaBmAcH/screens/firebase';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import TermsAndCondScreen from './screens/terms';
import VerifyScreen from './screens/verify';
import Dashboard from './screens/dashboard';
//import StudyScreen from './screens/study';

const Stack = createStackNavigator();

export default function App() {
    const list = auth.onAuthStateChanged((user)=>{
        console.log("App triggered");
    });
    console.log('Here')
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} initialParams={{email:'', password:'',error:''}}/>
                <Stack.Screen name="Register" component={RegisterScreen} initialParams={{email:'', password:'',error:'', name:'', conpass:'', isSelected: false}}/>
                <Stack.Screen name="Terms And Conditions" component={TermsAndCondScreen}/>
                <Stack.Screen name="Verify" component={VerifyScreen}/>
                <Stack.Screen name='Dashboard' component={Dashboard}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
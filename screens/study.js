import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import {ExpandableListView} from 'react-native-expandable-listview';

import registerpage from 'LaBmAcH/assets/register.png';
import { auth } from 'LaBmAcH/screens/firebase';

const StudyScreen = ({navigation}) => {
    const CONTENT = [
        {
          id: '42',
          categoryName: 'Item 1',
          customItem: (
            <View style={{flexDirection: 'column'}}>
              <Text>Custom Item</Text>
              <Text>With</Text>
              <Text>what you</Text>
              <Text>want</Text>
            </View>
          ),
          subCategory: [
            {
              customInnerItem: (
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <Text>Inner Item</Text>
                  <Text>With whatever you need</Text>
                </View>
              ),
              id: '1',
              name: '',
            },
            {id: '2', name: 'Sub Item 2'},
          ],
        },
        {
          id: '96',
          categoryName: 'Item 2',
          subCategory: [{id: '1', name: 'Sub Item 1'}],
        },
        {
          id: '12',
          categoryName: 'Item 3',
          subCategory: [
            {id: '1', name: 'Category 1'},
            {id: '2', name: 'Category 2'},
            {id: '3', name: 'Category 3'},
          ],
        },
    ];
    return (
      <View style={styles.container}>
            <ImageBackground source={registerpage} style={styles.loginbackground}>
                <ExpandableListView
                  data={CONTENT}
                />
            </ImageBackground>
      </View>
    );      
}

export default StudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  loginbackground: {
    flex: 1,
    resizeMode: "cover"
  }
});
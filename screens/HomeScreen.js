import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Button, Header, Body, StyleProvider, Text, Right, Icon, Center, Title, Left } from 'native-base';
import { CategoryCard } from '../components/CategoryCard';
import { MonoText } from '../components/StyledText';
import SCREEN_IMPORT from 'Dimensions';
import { createStackNavigator, createAppContainer } from 'react-navigation';
  

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height


class HomeScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };

  
  state = {
    fontsLoaded: false
  }

  
  async componentWillMount() {
    try{
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({fontsLoaded: true});
    }
    catch (error){
      console.log('error loading fonts', error);
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <Expo.AppLoading />;
    }
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Header noLeft>
          <Left style={{flex:1}}/>
          <Body style={{flex:1, justifyContent: "center", alignItems:"center"}}>
            <Title>Goals</Title>
          </Body>
          <Right style={{flex:1}}> 
            <Button transparent onPress={() => this.props.navigation.navigate('NewCategory')}>                 
              <Icon type="Feather" name="plus" style={{color:"white"}}/>  
            </Button>         
          </Right>
        </Header>  
        <View style= {{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
            <Button style={styles.buttonStyle}><Text>Add Savings</Text></Button>
            <Button style={styles.buttonStyle}><Text>Withdraw</Text></Button>
        </View>

          <View style={{justifyContent: "flex-start"}}>
            <CategoryCard navigation={this.props.navigation}/>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Total Savings: $5000</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({

  buttonStyle: {
    width:150,
    height:50,
    color:'blue',
    justifyContent: 'center',
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'flex-start',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    left: 18,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
  },
});

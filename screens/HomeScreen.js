import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button, Header, Body, StyleProvider, Text, Right, Icon, Center, Title, Left, Container } from 'native-base';
import { CategoryCard } from '../components/CategoryCard';
import { MonoText } from '../components/StyledText';
import SCREEN_IMPORT from 'Dimensions';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import _ from "lodash";


const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height


class HomeScreen extends React.Component {
  

  state = {
    fontsLoaded: false,
    loading: false,
    categories: []
  }

  static navigationOptions = {
    header: null,
  };

  update(){
    db.transaction(tx => {
      tx.executeSql(
        `select * from categories;`,
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

  async componentDidMount(){
    try{
      var db = Database.getConnection();
      var createCategory = "create table if not exists category (id integer primary key not null, name text not null, saved float not null, goal float not null, date text);"
      var createLog = "create table if not exists log (id integer primary key not null, cat_id int not null, date text not null, amount float not null, FOREIGN KEY (cat_id) REFERENCES category (id) ON DELETE CASCADE ON UPDATE NO ACTION)"
      db.transaction(tx => {
        tx.executeSql(createCategory);
        tx.executeSql(createLog)
      });
    } 
    catch(error){
      console.log("error loading database", error)
    } 
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

    const {categories, loading } = this.state;
    
    return (
      <Container>
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
        <View style= {{flexDirection: "row", justifyContent: "space-around", paddingTop: 5, alignItems: "center"}}>
            <Button style={styles.buttonStyle}><Text>Add Savings</Text></Button>
            <Button style={styles.buttonStyle}><Text>Withdraw</Text></Button>
        </View>
        
        {loading ? (
            <Icon name = 'spinner' />
          ) : null}
          { _.isEmpty(categories) || loading ? (
          <View style={{paddingTop: 20, alignItems: "center"}}>
            <Text>Get started by adding a savings category!</Text>
          </View> 
          ) : (         
          <View style={{justifyContent: "flex-start"}}>
            <CategoryCard navigation={this.props.navigation}/>
          </View> 
        )}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Total Savings: $5000</Text>
        </View>
      </Container>
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

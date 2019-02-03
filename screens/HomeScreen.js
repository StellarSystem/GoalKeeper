import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from "prop-types";
import { SQLite } from 'expo';
import { Button, Header, Body, StyleProvider, Text, Right, Icon, Center, Title, Left, Container } from 'native-base';
import { CategoryCard } from '../components/CategoryCard';
import Database from "../database";
import { MonoText } from '../components/StyledText';
import SCREEN_IMPORT from 'Dimensions';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import _ from "lodash";

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fontsLoaded: false,
      loading: false,
      categories: []
    }
    Database.initaliseTables();
    this.updateCategories = this.updateCategories.bind(this);
    this.getCategorySuccess = this.getCategorySuccess.bind(this);
  }
  
  static navigationOptions = {
    header: null,
  }; 

 /* static updateCategories(catArray){
    if(catArray != null){
      console.log("connection get");
      console.log(JSON.stringify(catArray))
      this.setState({ categories: catArray});
    } else {
      console.log("no")
    }
}*/

  updateCategories(){
    var db = Database.getConnection()
    db.transaction(tx => {
        tx.executeSql('select * from category;', [], this.getCategorySuccess, this.getCategoryFail
    );
    })
  }

  getCategorySuccess(tx, { rows }){
      var size = rows.length 
      console.log("updating")
      if(size > 0){
          console.log("Updated nicely")
          console.log(JSON.stringify({ rows }))
          var arr = rows._array
          console.log(JSON.stringify(arr))
          var catArray = JSON.stringify(arr)
          this.setState({ categories: catArray});
      } else {
          console.log("nothing here")
          return null
      }
  }

  getCategoryFail(error){
      console.log("didn't update well", error)
      return null
  }
      
    /*
      db.transaction(tx => {
        tx.executeSql(
          'select * from categories;', [],  (tx, { rows }) => { 
            var size = rows.length
            console.log("updating")
            console.log(JSON.stringify({ rows }))
            if(size > 0){
              this.setState({ categories: rows._array})
            }
            console.log("Updated nicely"),
          (_, error) => console.log("didn't update well", error)
          }    
        );
      });
  }*/

/*
   async componentDidMount(){
      this.updateCategories();
      console.log(this.state.categories)
      console.log('we updated!')
  } */

  async componentDidMount(){
    try{
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({fontsLoaded: true});
      this.updateCategories();
    }
    catch (error){
      console.log('error loading fonts or database', error);
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
            <Button style={styles.buttonStyle}><Text>Save</Text></Button>
            <Button style={styles.buttonStyle}><Text>Spend</Text></Button>
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

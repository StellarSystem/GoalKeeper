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
import SCREEN_IMPORT from 'Dimensions';
  

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height


export default class CategoryDetails extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
              <Title>Category Details</Title>
          </Body>
        </Header>  

        <Container>
            <Text>Category Name</Text>
            <Text>Target Date: 19/07/2020</Text> 
            <Text>$5000/$7000</Text>
            <Text>71%</Text>
        </Container>
        
      </Container>
    );
  }
}

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
});

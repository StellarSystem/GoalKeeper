import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Header, Body, TextInput, Text, Right, Icon, Center, Title, Left, Content, Container, DatePicker, Form, Item, Input, Label} from 'native-base';
import SCREEN_IMPORT from 'Dimensions';
import Database from "../database";
import PropTypes from "prop-types";
import updateCategories from './HomeScreen'
const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height


class NewCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      goalDate: null, 
      categoryName: null,
      goalAmount: null
    };
    /*this.setDate = this.setDate.bind(this);
    this.handleClear = this.handleClear.bind(this);*/
    this.handleSubmit = this.handleSubmit.bind(this);

    
  }

  updateValue = name => event =>{
    console.log(event.nativeEvent.text);
    this.setState({[name]: event.nativeEvent.text});
    
  };
  
  //TODO: finish new category creation
  handleSubmit() {
    
    var db = Database.getConnection();
    try{
      db.transaction(
        tx => {
          tx.executeSql('insert into category (saved, name, goal, date) values (0, ?, ?, ?);', 
          [this.state.categoryName, this.state.goalAmount, this.state.goalDate],
          (_, { rows }) => console.log(JSON.stringify(rows)),
          (_, error) => console.log("Could not insert into category", error)
          );
          tx.executeSql('select * from category', [], (_, { rows }) =>console.log(JSON.stringify(rows)),
          );
        },
      );
      
    }
    catch(error){
      console.log("Could not create new category", error)
    }  

    /*
    alert('A goalDate was submitted: ' + this.state.goalDate);
    alert('A categoryName was submitted: ' + this.state.categoryName);
    alert('A goalAmount was submitted: ' + this.state.goalAmount);
*/
  }

  static navigationOptions = {
    header: null,
    visible: false,
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
              <Title>New Category</Title>
          </Body>
        </Header>  

        <Content>
          <Form onSubmit={this.handleSubmit}>
               <Item floatingLabel >
                <Label>Category Name</Label>
                <Input 
                 value = {this.state.categoryName}
                 onChange={this.updateValue("categoryName")}
                />
              </Item>
              <Item floatingLabel>
                <Label>Goal Amount (Optional)</Label>
                <Input 
                 value={this.state.goalAmount}
                 onChange={this.updateValue("goalAmount")}
                 />
              </Item>
              <Item floatingLabel>
                <Label>Goal Date (Optional)</Label>
                <Input 
                 value={this.state.goalDate}
                 onChange={this.updateValue("goalDate")}
                 />
              </Item>
            </Form>
            <Button type="submit" value="Submit" onPress={() => this.handleSubmit()}>
              <Text>Finish!</Text>
            </Button>
        </Content>       
      </Container>
    );
  }
}

export default NewCategory;

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

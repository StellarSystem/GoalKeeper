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
  

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height


class NewCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      goalDate: null, 
      categoryName = null,
      goalAmount = null
    };
    this.setDate = this.setDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  updateValue = name => event =>{
    this.setState({[name]: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    var db = Database.getConnection();
    db.transaction(
      tx => {
        tx.executeSql('insert into category (saved, name, goal, date) values (0, ?, ?, ?)', [this.state.categoryName, this.state.goalAmount, this.state.goalDate]);
        tx.executeSql('select * from category', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.handleSubmit
    );
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
          <Form
          onSubmit={this.handleSubmit}
          >
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
                 value={this.state.chosenDote}
                 onChange={this.updateValue("goalDate")}
                 />
              </Item>
            </Form>
            <Button type="submit" value="Post">
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

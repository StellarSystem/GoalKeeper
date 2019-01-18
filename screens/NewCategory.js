import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Header, Body, StyleProvider, Text, Right, Icon, Center, Title, Left, Content, Container, DatePicker, Form, Item, Input, Label} from 'native-base';
import SCREEN_IMPORT from 'Dimensions';
  

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height


class NewCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = { chosenDate: null };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
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
          <Form>
              <Item floatingLabel>
                <Label>Category Name</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Goal Amount (Optional)</Label>
                <Input />
              </Item>
            </Form>
            <Button>
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

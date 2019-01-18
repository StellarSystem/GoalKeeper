import React from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Body, Left, Button } from 'native-base';
import SCREEN_IMPORT from 'Dimensions';

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height

export class CategoryCard extends React.Component {

  constructor(props){
    super(props);
  }
  render() {

    return (
      
        <Container>
        <Content contentContainerStyle= {{alignItems: 'center', paddingTop: 5, paddingHorizontal: 5}}>
          <Card style={{width:(SCREEN_WIDTH*0.85)}}>
            <CardItem bordered button onPress={() => this.props.navigation.navigate('CategoryDetails')}>               
                <Body>
                  <Left>
                    <Text style={{fontSize:20}}>Category Name</Text>
                    <Text note>Target: 19/07/2020</Text>
                  </Left>                         
                </Body> 
                <Right style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'baseline'}}>
                  <Text style={{fontSize:20, marginLeft:30, marginRight:20}}>71%</Text>  
                  
                  <Button transparent>
                    <Icon type = 'Entypo' name = 'dots-three-vertical'/>
                  </Button>
                </Right>   
            </CardItem>

            <CardItem>
              <Body style={{flexDirection: 'column', alignItems:'flex-start'}}>
                <Text>Amount Saved: $5000</Text>
                <Text>Goal Amount: $7000</Text>
              </Body>      
            </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}

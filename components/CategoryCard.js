import React from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Body, Left } from 'native-base';

export class CategoryCard extends React.Component {
  render() {
    return (
        <Container>
        <Content contentContainerStyle= {{justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingHorizontal: 5}}>
          <Card style={{width:300}}>
            <CardItem>               
                <Body>
                  <Left>
                    <Text>Category Name</Text>
                    <Text note>Ongoing</Text>
                  </Left>           
                </Body> 
                <Right>
                  <Text>40%</Text>
                </Right>   
            </CardItem>

            <CardItem>
              <Body>
                <Left>
                  <Text>$5000/$7000</Text>
                </Left>
              </Body>
              <Right>
                <Text>Due 19/07/2020</Text>
              </Right>              
            </CardItem>
              
           </Card>
        </Content>
      </Container>
    );
  }
}

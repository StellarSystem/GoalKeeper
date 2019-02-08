import React from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Body, Left, Button } from 'native-base';
import SCREEN_IMPORT from 'Dimensions';

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height

export class CategoryCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: this.props.data.name,
      targetDate: this.props.data.date,
      savedAmount: this.props.data.saved,
      goalAmount: this.props.data.goal,
      percentSaved: 0
    }
    this.findPercentage = this.findPercentage.bind(this)
    
  }

  async componentDidMount(){
    try{
      this.findPercentage();
    }
    catch (error){
      console.log('error finding percentage', error);
    }
  }


  findPercentage(){
    var percent = parseInt(this.state.savedAmount, 10)/parseInt(this.state.goalAmount, 10)
    console.log(percent)
    this.setState({percentSaved: percent})
  }

  render() {

    return (
      
        <Container>
        <Content contentContainerStyle= {{alignItems: 'center', paddingTop: 5, paddingHorizontal: 5}}>
          <Card style={{width:(SCREEN_WIDTH*0.85)}}>
            <CardItem bordered button onPress={() => this.props.navigation.navigate('CategoryDetails')}>               
                <Body>
                  <Left>
                    <Text style={{fontSize:20}}>{this.state.name}</Text>
                    <Text note>Target: {this.state.targetDate}</Text>
                  </Left>                         
                </Body> 
                <Right style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'baseline'}}>
                  <Text style={{fontSize:20, marginLeft:30, marginRight:20}}>{this.state.percentSaved}%</Text>  
                  
                  <Button transparent>
                    <Icon type = 'Entypo' name = 'dots-three-vertical'/>
                  </Button>
                </Right>   
            </CardItem>

            <CardItem>
              <Body style={{flexDirection: 'column', alignItems:'flex-start'}}>
                <Text>Amount Saved: ${this.state.savedAmount}</Text>
                <Text>Goal Amount: ${this.state.goalAmount}</Text>
              </Body>      
            </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}

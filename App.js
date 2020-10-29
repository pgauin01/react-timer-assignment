import React, { Component } from 'react';
import {View , Text , Button , StyleSheet} from 'react-native'
import NumericInput from 'react-native-numeric-input'

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {time:0 , counter : 1 , start:false}
    this.timer = null;
    this.startHandler = this.startHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.changeCounter = this.changeCounter.bind(this);
    }

  // const id;

  getSeconds(time){
    return `0${time%60}`.slice(-2);
  }

  getMinutes(time){
    return Math.floor(time/60);
  }

  startHandler() {
    this.timer =  setInterval(()=>{
      this.setState({ time: this.state.time + this.state.counter });
      }, 1000);

      this.setState({start:true});

     
  }
  
  

  stopHandler() {
    clearInterval(this.timer);
    this.setState({start:false});

  }

  resetHandler(){
    this.stopHandler()
    this.setState({time:0})
    this.setState({start:false});

  }

  changeCounter(event){
    clearInterval(this.timer);
    this.startHandler(event)
    this.setState({counter:event})
   }

  render () {
    if(this.state.time < 0){
      this.resetHandler()
    }
    return (
      <View style={{marginTop:70}}>
        <Text style={styles.text}>{this.getMinutes(this.state.time)}:{this.getSeconds(this.state.time)}</Text>
        <View style={styles.buttonsActions}>
          {this.state.start ? 
        <Button color="black" title="stop" onPress={this.stopHandler}/>
          :
        <Button color="black" title="start" onPress={this.startHandler}/>

           }
        <Button color="black" title="reset" onPress={this.resetHandler}/>
        </View>
        <View style={styles.counter}>
          <Text style={{fontSize:22}}>Counter:</Text>
        <NumericInput type='up-down' value={this.state.counter} onChange={value => this.changeCounter(value)} minValue={-10} maxValue={10} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
text:{
  fontSize:38,
  textAlign:'center',
  paddingBottom:22
},

buttonsActions:{
flexDirection:'row',
justifyContent:'space-around'
}
,
counter:{
  marginTop:20,
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center'
}
})

export default App;
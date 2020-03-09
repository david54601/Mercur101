import React, {useState,useEffect} from "react";
import {StyleSheet,View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";


export default function Business(props) {
    
    const{navigation}=props;
  const [user,setUser]=useState(null);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(userInfo=>{
      setUser(userInfo);
    })
  },[])

    return(
    <View style={styles.viewBody}>
      <Text>estamos en Negocio</Text>

      {user&&<AddProductButton  navigation={navigation}/> }
        
    </View>
        )
}

function AddProductButton(props){
  const{navigation} =props;
  
  return(
    <ActionButton
    buttonColor="#8f2764"
    onPress={() => navigation.navigate("AddBusiness")}
    />
   
  )

}

const styles=StyleSheet.create({

  viewBody:{
    flex:1
  }


})

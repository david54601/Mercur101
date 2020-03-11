import React, {useState,useEffect} from "react";
import {StyleSheet,View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListBusiness from "../../components/Business/ListBusiness";
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db=firebase.firestore(firebaseApp);

export default function Business(props) {
    
  const{navigation}=props;
  const [user,setUser]=useState(null);
  const [business, setBusiness]=useState([]);
  const [startBusiness, setStartBusiness]=useState(null);
  const [isLoading , setIsLoading]=useState(false);
  const [totalBusiness, setTotalBusiness]=useState(0);
  const limiteBusiness=7;

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(userInfo=>{
      setUser(userInfo);
    })
  },[]);

  


  useEffect(()=>{
    db.collection("business")
    .get().then(snap=>{
      setTotalBusiness(snap.size);
    })


      const getDatos= (async () =>{
        const resultBusiness=[];

        const business=db
        .collection("business")
        .orderBy("createAt", "desc")
        .limit(limiteBusiness);

        await business.get().then(response =>{
          setStartBusiness(response.docs[response.docs.length-1]);

          response.forEach(doc =>{
            let business=doc.data();
            business.id=doc.id;
            resultBusiness.push({business})
          })
          setBusiness(resultBusiness);
        })
      })()
    },[]);

    return(
    <View style={styles.viewBody}>
      <ListBusiness
      business={business}      
      />
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

import React, { useState, useEffect } from "react";
import {View, Text,Button, } from "react-native";
import * as firebase from "firebase";
import InfoUser from "./InfoUser";
export default function UserLogged() {
    
    const[userInfo, setUserInfo]=useState({});

    
    useEffect(()=>{

        (async()=>{
            const user=await firebase.auth().currentUser;
            setUserInfo(user.providerData[0])
        })();

    },[])

    return(
        <View>
            <InfoUser userInfo={userInfo}/>
           
            <Button 
            title="Cerrar sesión"
            onPress={()=>firebase.auth().signOut()}
       
            
            
            />
        </View>
    )
    
}
 

 


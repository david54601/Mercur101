import React, { useState, useEffect,useRef } from "react";
import {View, Button, } from "react-native";
import * as firebase from "firebase";
import InfoUser from "./InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

export default function UserLogged() {
    const[userInfo, setUserInfo]=useState({});
    const[reloadData, setReloadData]=useState(false);
    const[isLoading, setIsLoading]=useState(false);
    const [textLoading, setTextLoading]=useState("");
    const toastRef=useRef();
    
    useEffect(()=>{

        (async()=>{
            const user=await firebase.auth().currentUser;
            setUserInfo(user.providerData[0])
        })();
        setReloadData(false);
    },[reloadData])

    return(
        <View>
            <InfoUser 
            userInfo={userInfo}
             setReloadData={setReloadData} 
             toastRef={toastRef}
             setIsLoading={setIsLoading}
             setTextLoading={setTextLoading}
             />
            <Button 
            title="Cerrar sesión"
            onPress={()=>firebase.auth().signOut()}
            />
        <Toast ref={toastRef} position="center" opacity={0.5}/>
        <Loading  text={textLoading} isVisible={isLoading}/>

        </View>
    )
    
}
 

 
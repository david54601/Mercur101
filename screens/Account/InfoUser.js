import React, {useState,useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Avatar} from "react-native-elements";
import * as firebase from "firebase";
import * as permissions from "expo-permissions";
import * as imagePicker from"expo-image-picker";


export default function InfoUser(props){
    const {userInfo:{uid,displayName,email,photoUrl}
    }=props;
       
   const changeAvatar= async()=>{
      
    const resultPermission=  await permissions.askAsync(permissions.CAMERA_ROLL);
    const resultPermissionCamera=resultPermission.permissions.cameraRoll.status;    
   
    if(resultPermissionCamera==="denied"){
        console.log("se necesitan aceptar los permisos de la galeria ");
    } else {
        const result= await  imagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[4,3]
        })

        if(result.cancelled){
            console.log("cerro la galeria de imagenes");
        }else{
            uploadImage(result.uri, uid).then(()=>{
                console.log("imagen cargada satisfactoriamente");
                updatePhotoUrl(uid);
            })
        }

    }
    
   }
   
   const uploadImage= async(uri, nameImage)=>{
       const response =await fetch(uri);
       const blob = await response.blob();
       
       const ref = firebase
       .storage()
       .ref()
       .child("avatar/${nameImage}");
       return ref.put(blob);

   };

   const updatePhotoUrl = uid =>{
    firebase
       .storage()
       .ref("avatar/${uid}")
       .getDownloadURL()
       .then(async result =>{
           console.log("entro en el then "+uid);
        const update ={
            photoUrl: result
        }
        console.log(result);
        await firebase.auth().currentUser.updateProfile(update);
       }).catch(()=>{
           console.log("Error al optener el avatar");
       })

   }

   return(
<View style={styles.ViewUserInfo}>
    <Avatar
    rounded
    size="large"
    showEditButton
    onEditPress={changeAvatar}
    containerStyle={styles.userInfoAvatar}
    source={{
        uri:photoUrl
         ? photoUrl
        : "https://api.adorable.io/avatars/130/abott@adorable.png"

    }}
    />
    <View>
    <Text style={styles.displayName}>
    {displayName ? displayName :"Anónimo"}
    </Text>
    <Text>
        {email}
    </Text>
    </View>
</View>
    )
}
const styles=StyleSheet.create({

    ViewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    
    },
    userInfoAvatar:{
        marginRight:20,

    },
    displayName:{
        fontWeight:"bold"

    }

})
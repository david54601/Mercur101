import React from "react";
import  {View, Text,StyleSheet} from "react-native";
import {Input, Button} from "react-native-elements";
import { CardStyleInterpolators } from "react-navigation-stack";

export default function ChangeDisplayNameForm(){
   
   const updateDisplayName= ()=>{
       console.log("Nombre de usuario Actualizado")
   }
   
    return(
        <View style={styles.view}>
            <Input
            placeholder="Nombre"
            containerStyle={styles.input}
           //defaultValue=""
           //onChange={}
           rightIcon={{
               type:"material-community",
               name:"account-circle-outline",
               color:"#c2c2c2"
           }}
           //errorMessage={}

            />
        <Button
        title="Cambiar Nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onpress={updateDisplayName}
        //loading={}
        />
        </View>
    )
}

const styles=StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10
    },
    btnContainer:{

        marginTop:20,

    },
    btn:{
        backgroundColor:"#8f2764"
    }


})
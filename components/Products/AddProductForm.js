import React , {useState,useRef}from "react";
import {StyleSheet, View, ScrollView,Alert, Dimensions }from "react-native";
import {Icon, Avatar, Image,Input,Button} from "react-native-elements"
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function AddProductForm(props){
    const[imagesSelected, setImagesSelected]=useState([]);
    const{ toastRef,setIsLoading,navigation}=props;

    return(
     <ScrollView>
         <UploadImage
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}  
          toastRef={toastRef}       
         />
     </ScrollView>

    )

}

function UploadImage(props){
    const{imagesSelected,setImagesSelected,toastRef}=props;

    const imageSelect=async()=>{
        const resultPermission =await
         Permissions.askAsync(
             Permissions.CAMERA_ROLL
            );
            
         const resultPermissionCamera=resultPermission.permissions.cameraRoll.status;

         if(resultPermissionCamera=== "denied"){
             toastRef.current.show("necesita aceptar los permisos para poder agregar una imagen ");5000
         }else{
            const result= await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]

            })
            if(result.cancelled){
                toastRef.current.show("cerraste la galeria de imagen sin selecionar una imagen ");2000
            }else{
                setImagesSelected([...imagesSelected,result.uri]);
            }

         }
    }
        console.log(imagesSelected);
    return(
        <View styles={styles.ViewImages}> 
        <Icon
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}

        />
        <Avatar
            onPress={()=> console.log("sdfnskdfdslf")}
            style={styles.miniatureStyle}
            //source={{url miniatura}}
        />


        </View>
    )
}

const styles=StyleSheet.create({

    ViewImages:{
        flexDirection:"row",
        marginLeft:20,
        marginRight:20,
        marginTop:20

    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle:{
        width:70,
        height:70,
        marginRight:10

    }

})
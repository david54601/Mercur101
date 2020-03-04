import React,{useState,useEffect} from "react";
import {StyleSheet,View,ScrollView,Alert,Dimensions} from "react-native"
import {Icon,Avatar,Image,Input,Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const WidthScreen=Dimensions.get("window").width;
const WidthMiniature =(WidthScreen/5)-15;

export default function AddProductForm(props){
    const{toastRef,setIsLoading,navigation}=props;
    const[imagesSelected, setImagesSelected]=useState([]);

return(
    <ScrollView>
        <ImageProduct imageProduct={imagesSelected[0]}/>
        <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef} 

        />
    </ScrollView>)
}

function ImageProduct(props){

    const{imageProduct}=props;

    return(
        <View style={styles.viewPhoto}>
            {imageProduct?(
                <Image
                source={{uri:imageProduct}}
                style={{width:WidthScreen, height:200}}

                />
            ):(
                <Image
                source={require("../../assets/img/no-photo.png")}
                style={{width:WidthScreen, height:200}}
                />
            )}
        </View>
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
    
    const removeImage =image=>{
        const arrayImages=imagesSelected;
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro de que desear eliminar la imagen ?",
            [
                {
                    text:"Cancelar",
                    style:"cancel"
                },
                {
                    text:"Eliminar",
                    onPress:()=> setImagesSelected(arrayImages.filter(imageUrl=>imageUrl!==image))
                }
            ],
            {cancelable:false}
        )

    }



    return(
        <View style={styles.viewImage}>
        {imagesSelected.length<5&&( 
            <Icon
            type="material-community"
            name="camera"
            color="#7a7a7a"
            containerStyle={styles.containerIcon}
            onPress={imageSelect}
            />

            )}

        {imagesSelected.map(imageProduct=>(


            <Avatar
            key={imageProduct}
            onPress={()=>removeImage(imageProduct)}
            style={styles.miniatureStyles}
            source={{
                uri:imageProduct }}            
            />
        ))}
        </View>
    )
}


function FormAdd(props){

    return(
        <View style={styles.viewForm}>

        </View>
    )
}


const styles=StyleSheet.create({

    viewForm:{
        marginLeft:10,
        marginRight:10

    },
    viewImage:{
        flexDirection:"row",
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"

    },
    miniatureStyles:{
        width:WidthMiniature,
        height:WidthMiniature,
        marginRight:10,

    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom:20

    }


})
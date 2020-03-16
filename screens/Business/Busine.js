import React, {useState,useEffect} from "react";
import {View,ScrollView,Text,Dimensions,StyleSheet} from "react-native";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import ActionButton from "react-native-action-button";
import {Rating, ListItem}from "react-native-elements";
import *as firebase from "firebase";


const screenWidth= Dimensions.get("window").width;

export default function Busine(props){

    const{navigation}=props;
    const {business}=navigation.state.params.business.item;
    const [imageBusiness,setImageBusiness]=useState([]);
    
    useEffect(()=>{

        const arrayUrl=[];

        (async()=>{

           await Promise.all(
               business.images.map(async idImage=>{
                   await firebase.storage()
                   .ref(`business-images/${idImage}`)
                   .getDownloadURL()
                   .then(imageUrl=>{
                       console.log(imageUrl);
                       arrayUrl.push(imageUrl)
                   });
               })
           ) 
               setImageBusiness(arrayUrl);
        })()

    },[])


    return(
        <ScrollView style={styles.viewBody}>
            <Carousel
            arrayImages={imageBusiness}
            width={screenWidth}
            height={200}
            />
            <Titlebusiness
            name={business.name}
            description={business.description}
            phone={business.phone}
            rating={business.rating}
            />
            <BusinessInfo 
            location={business.location}
            name={business.name}
            address={business.address}
            phone={business.phone}

            />

        <AddProductButton  
        style={styles.styleButton}
        navigation={navigation}/>
        </ScrollView>
    )
}

function Titlebusiness(props){
    const{name,description,rating}=props;

    return(
        <View style={styles.viewBusinessTitle}>
        <View style={{flexDirection:"row"}}>
        <Text style={styles.nameBusiness}>{name} </Text>
        <Rating
            style={styles.rating}
            imageSize={20}
            readonly
            startingValue={parseFloat(rating)}
        />

        </View>
    <Text style={styles.descriptionBusiness}>{description}</Text>

    </View>
    )

}



    function BusinessInfo(props){

        const{location,name,address,phone}=props;

    const listInfo=[
    {
        text:address,
        iconName:"map-marker",
        iconType:"material-community",
        action:null

    },
    {
        text:phone,
        iconName:"phone",
        iconType:"material-community",
        action:null


    }
    ]

        return(
            <View style={styles.viewBusinessStyle}>
                <Text style={styles.businessInfoTitle}>
                    Información Sobre el negocio</Text>
                    <Map
                    location={location}
                    name={name}
                    height={100}/>
                   {listInfo.map((item,index)=>(
                       <ListItem
                       key={index}
                       title={item.text}
                       leftIcon={{
                        name:item.iconName,
                        type:item.iconType,
                        color:"#8F2764"
                       }}
                       containerStyle={styles.contailerListItem}

                       />
                   ))}
                    
            </View>
        )


    }


function AddProductButton(props){
    const{navigation} =props;
    
    return(
      <ActionButton
      buttonColor="#8f2764"
      onPress={() => navigation.navigate("AddProduct")}
      />
     
    )
  
  }



const styles=StyleSheet.create({

    viewBody:{
    flex:1
    },
    nameBusiness:{
    fontSize:20,
    fontWeight:"bold",

    },
    viewBusinessTitle:{
     margin:15  
    },
    rating:{
       position:"absolute",
       right:0,
       
    },
    descriptionBusiness:{
        marginTop:5,
        color:"grey"
    },
    viewBusinessStyle:{
        margin:15,
        marginTop:25
    },
    businessInfoTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10
    },
    contailerListItem:{
        borderBottomColor:"#d8d8d8",
        borderBottomWidth:1
    },

    
     


})
import React from "react";
import {StyleSheet,View,Text}from "react-native";

export default function ListBusiness(props){
    const {business}=props;
    console.log(business);
    return(
        <View>
            <Text>
                lista de negocios 
            </Text>
        </View>
    )
}
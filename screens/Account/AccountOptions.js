import React ,{useState}from "react";
import {StyleSheet, View, Text} from "react-native";
import {ListItem} from "react-native-elements";
import Modal from "../../components/Modal";
import  ChangeDisplayNameForm from "./../../components/Account/ChangeDisplayNameForm";
import ChangeEmailForm from "../../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../../components/Account/ChangePasswordForm";

export default function AccountOptions(){

    const [isVisibleModal, setIsVisibleModal]=useState(false);
    const [renderComponent, setRenderComponent]=useState(null);


const menuOptions=[
    {
        title:"Cambiar nombre",
        iconType:"material-community",
        iconNameLeft:"account-circle",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#ccc",
        onPress:()=>SelectedComponent("DisplayName")
   
    },
    {
        title:"Cambiar Email",
        iconType:"material-community",
        iconNameLeft:"at",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#ccc",
        onPress:()=>SelectedComponent("email")
   
    },
    {
        title:"Cambiar contraseña",
        iconType:"material-community",
        iconNameLeft:"lock-reset",
        iconColorLeft:"#ccc",
        iconNameRight:"chevron-right",
        iconColorRight:"#ccc",
        onPress:()=>SelectedComponent("password")
   
    }

]


    const SelectedComponent=(key)=>{
        switch (key){
         case "DisplayName": 
           setRenderComponent(<ChangeDisplayNameForm/>)
           setIsVisibleModal(true);
            break;
         case "email":
            setRenderComponent(<ChangeEmailForm/>)
            setIsVisibleModal(true);
            break;
        case "password":
            setRenderComponent(<ChangePasswordForm/>)
            setIsVisibleModal(true);
            break;
            default:
                break;
        }
        setIsVisibleModal(true);
    }

    return(
        <View>
            {menuOptions.map((menu,index)=>(
                <ListItem
                key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItems}

                />
            ))}

                    {renderComponent &&(
                          <Modal isVisible={isVisibleModal}  setIsVisible={setIsVisibleModal}>
                          {renderComponent}
                 </Modal>

                    )}

          
        </View>

    )

}

const styles=StyleSheet.create({

    menuItems:{
    borderBottomWidth:1,
    borderBottomColor:"#e3e3e3"

    }

})
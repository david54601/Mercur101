 import {createStackNavigator} from "react-navigation-stack";
import BusinessScreen from "../screens/Business";
import AddBusinessScreen from "../screens/Business/AddBusiness"
import BusineScreen from "../screens/Business/Busine"


export const BusinessScreenStacks= createStackNavigator({
   
    Business:{
    screen:BusinessScreen,
    navigationOptions:()=>({
        title:"Negocios"
    })
    
    },
    AddBusiness:{
        screen:AddBusinessScreen,
        navigationOptions:()=>({
            title: "Nuevo Negocio"
        })
    },
    Busine:{
        screen:BusineScreen,
        navigationOptions:props =>({
            title: props.navigation.state.params.business.item.business.name
                  
        })
    }
})

export default BusinessScreenStacks;
 import {createStackNavigator} from "react-navigation-stack";
import BusinessScreen from "../screens/Business";
import AddBusinessScren from "../screens/Business/AddBusiness"


export const BusinessScreenStacks= createStackNavigator({
   
    Business:{
    screen:BusinessScreen,
    navigationOptions:()=>({
        title:"Negocios"
    })
    
    },
    AddBusiness:{
        screen:AddBusinessScren,
        navigationOptions:()=>({
            title: "Nuevo Negocio"
        })
    }

})

export default BusinessScreenStacks;
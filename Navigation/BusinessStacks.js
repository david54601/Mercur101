 import {createStackNavigator} from "react-navigation-stack";
import BusinessScreen from "../screens/Business";


export const BusinessScreenStacks= createStackNavigator({
Businees:{
    screen:BusinessScreen,
    navigationOptions:()=>({
        title:"Negocios"
    })
    
    }

})

export default BusinessScreenStacks;
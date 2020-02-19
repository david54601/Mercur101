import { createStackNavigator } from "react-navigation-stack";
import ProductScreen from "../screens/Products";

const ProductsScreenStacks =createStackNavigator({
    Products:{
        screen:ProductScreen,
        navigationOptions:()=>({
            title: "productos"
        })
    }
})


export default ProductsScreenStacks;


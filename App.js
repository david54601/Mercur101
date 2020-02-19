import React from 'react';
import Navigation from "./Navigation/Navigation";
import {firebaseApp} from "./utils/FiraBase";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);


export default function App() {
  return (
    <Navigation/>
  )
}


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

export default function App() {

  const [texto, setTexto] = useState("");

  function exibirApi() {
    fetch("http://localhost/postgresql/", {
      headers: {
        "Accept":"application/json",
        "Content-type":"application/json"
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setTexto(responseJson);
      alert(texto);
    })
  }exibirApi()

  return(
    <View>
      <Text>
        Meu App!
      </Text>
    </View>
  )
}
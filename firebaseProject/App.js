/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StatusBar, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import database from '@react-native-firebase/database';


export default function App() {
  const reference = database().ref('/users');

  const [name, setName] = useState('');

  const [listUsers, setListUsers] = useState('');

  useEffect(() => {
    try {
      database().ref('/users').on('value', (snapshot) => {
        const list = [];
        snapshot.forEach(element => {
          list.push({
            key: element.key,
            name: element.val().name,
          })
        });
        setListUsers(list)
      })
    } catch (error) {
      alert(error)
    }
  }, []);

  function pushData() {
    database()
      .ref('/users')
      .push({
        name: name,
      })
      .then(() => console.log('Data set.')
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>
          Firebase project
        </Text>
      </View>

      <View>
        <TextInput 
          onChangeText={name => setName(name)} 
          value={name}
          placeholder="Nome"
        />

        <TouchableOpacity onPress={pushData}>
          <Text>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList 
          data={listUsers}
          keyExtractor={(item)=>item.key}
          renderItem={({item}) => 

            <View>
              <Text>
                Nome: {item.name}
              </Text>

              {/* <TouchableOpacity 
                  onPress={() => {editUser(item.key, item.name, item.age)}}
                  >
                  <Text>
                      Editar
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  onPress={() => {deleteUser(item.key)}}
              >
                  <Text>
                      Remover
                  </Text>
              </TouchableOpacity> */}
            </View>
          }
        />
      </View>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import database from '@react-native-firebase/database';

export default function Home({ navigation }) {
  // eslint-disable-next-line no-trailing-spaces
  // const reference = database().ref('/users');

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [listFire, setListFire] = useState('');

  function pushData() {
    try {
      database().ref('/users').push({
        name: name,
        age: age,
      })
    } catch (error) {
      alert(error)
    }
    finally{
      setName('');
      setAge('');
    }
  }

  useEffect(() => {
    try {
      database().ref('/users').on('value', (snapshot) => {
        const list = [];
        snapshot.forEach(element => {
          list.push({
            key: element.key,
            name: element.val().name,
            age: element.val().age,
          })
        });
        setListFire(list)
      })
    } catch (error) {
      alert(error)
    }
  }, []);

  function editUser(key, name, age) {
    navigation.navigate('Edit', {
      key: key,
      name: name,
      age: age,
    })
  }

  function deleteUser(key) {
    database().ref('/users'+key).remove();
  }

  return (
    <View>
      <Text>Aoba</Text>

      <TextInput
          onChangeText={name => setName(name)} 
          value={name}
          placeholder="Nome" 
      />

      <TextInput 
          onChangeText={age => setAge(age)} 
          value={age}
          placeholder="Idade" 
      />

      <TouchableOpacity onPress={pushData}>  
          <Text>
              Enviar
          </Text>
      </TouchableOpacity>

      <FlatList 
        data={listFire}
        keyExtractor={(item)=>item.key}
        renderItem={({item}) => 

          <View>
            <Text>
              Nome: {item.name}
            </Text>
            
            <Text>
              Idade: {item.age}
            </Text>

            <TouchableOpacity 
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
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { Container } from './styles';

const Shoes = () => {

  const [imgPreview, setImgPreview] = useState();

  function imagePickerCallback(data){
    console.log(data)
    if (data.didCancel) {
      return;
    }

    if (data.error) {
      return;
    }

    if (!data.uri){
      return;
    }


    setImgPreview(data);
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('getImg', {
      fileName: getImg.fileName,
      uri: getImg.uri,
      type: getImg.type,
    })

    await Axios.post('', data);
  }

  return (
    <View style={styles.container}>
      <Text>
        Envio de imagens para o Firebase
      </Text>

      <Image 
        source={{
          uri: imgPreview 
          ? imgPreview.uri 
          : "https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg"
        }}

        style={styles.image}
      />
      <TouchableOpacity style={styles.button} 
        onPress={() => ImagePicker.showImagePicker({}, imagePickerCallback)}
        >

        <Text>
          Escolher imagem
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} 
        onPress={uploadImage}
        >

        <Text>
          Enviar imagem
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: 300,
    height: 300,
  },
  button: {
    color: '#fff',
    borderWidth: 1,
    borderColor: 'blue',
  }
})

export default Shoes;
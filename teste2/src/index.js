import React, {useEffect, useState} from 'react';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Button, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

export default function Index() {
    const [avatar, setAvatar] = useState(null)
    const [imagePath, setImagePath] = useState()
    const [isLoading, setIsLoading] = useState()
    const [status, setStatus] = useState()
    // useState = {
    //     imagePath: require("./1.jpg"),
    //     isLoading: false,
    //     status: '',
    // } 
    function chooseFile() {
        setStatus( '' );
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true, // do not backup to iCloud
                path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
            },
        };
        ImagePicker.showImagePicker(options, response => {
            setAvatar(response.uri)
            if (response.didCancel) {
                console.log('User cancelled image picker', storage());
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let path = getPlatformPath(response).value;
                let fileName = getFileName(response.fileName, path);
                setImagePath( path );
                uploadImageToStorage(path, fileName);
                
            }
        });
    };
    
    function getFileName(name, path) {
        if (name != null) { return name; }
        
        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        return path.split("/").pop();
    }

    function uploadImageToStorage(path, name) {
        setIsLoading({ isLoading: true });
        let reference = storage().ref("images/" + name);
        let task = reference.putFile(path);
        task.then(() => {
            console.log('Image uploaded to the bucket!');
            setIsLoading(false);
            setStatus('Image uploaded successfully');
        }).catch((e) => {
            status = 'Something went wrong';
            console.log('uploading image error => ', e);
            setIsLoading(false);
            setStatus('Something went wrong');
        });
    }

    /**
     * Get platform specific value from response
     */
    function getPlatformPath({ path, uri }) {
        return Platform.select({
            android: { "value": path },
            ios: { "value": uri }
        })
    }

    function getPlatformURI(imagePath) {
        let imgSource = imagePath;
        if (isNaN(imagePath)) {
            imgSource = { uri: imagePath };
            if (Platform.OS == 'android') {
                imgSource.uri = "images/" + imgSource.uri;
            }
        }
        return imgSource
    }

    // let imgSource = getPlatformURI(imagePath)
    // var imgSource = getPlatformURI(imagePath);
    const [listFire, setListFire] = useState();
    
    function listFilesAndDirectories(reference, pageToken) {
        const list = []
        return reference.list({ pageToken }).then(result => {
            // Loop over each item
            result.items.forEach(ref => {
                list.push({
                    nome: ref.name,
                    path: ref.path
                })
            });
            setListFire(list);

            if (result.nextPageToken) {
                return listFilesAndDirectories(reference, result.nextPageToken);
            }

            return Promise.resolve();
        });
    }

    const reference = storage().ref('images');
    const [imageUrl, setImageUrl] = useState([]);
    const refer = storage().ref('images');

    useEffect(() => {
        try {
            listFilesAndDirectories(reference).then(() => {
                console.log('Finished listing');
            });
            refer.list().then(result => {
                result.items.forEach(element => {
                    element.getDownloadURL().then(downloadUrl => {
                        setImageUrl(state => [...state, downloadUrl])
                    }).catch(error =>{
                        alert(error)
                    })
                })
            })
        } catch (error) {
            alert(error);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.listFireBase_text}>
                Index
            </Text>
            {isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
            <View style={styles.imgContainer}>
                <Text style={styles.boldTextStyle}>{status}</Text>
                <Image style={styles.uploadImage} source={{uri:  avatar ? avatar : 'https://s3.ap-south-1.amazonaws.com/custpostimages/ss_images/avatar1.png'}} />
                <View style={styles.eightyWidthStyle} >
                    <Button title={'Upload Image'} onPress={chooseFile}></Button>
                </View>
                
                
                <View>
                    <Image 
                    
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listFireBase_text:{
        color: 'red'
    },
    container: {
        flex: 1,
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    eightyWidthStyle: {
        width: '80%',
        margin: 2,
    },
    uploadImage: {
        width: '80%',
        height: 30,
        marginVertical: 5,
    },
    loadingIndicator: {
        zIndex: 5,
        width: '100%',
        height: '100%',
    },
    boldTextStyle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#5EB0E5',
    }

});
import React, {useState} from 'react';
import {
  Button,
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Linking,
  Documnet,
} from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ms } from '../../../utils/responsive';
import { fontFamily } from '../../../theme/typography';


function UploadMedia({
  visible,
  onBackdropPress,
  seleceElseWhere,
  setImageSource,
  selectOption,
  matchModle,
  theme,
  Documnet,
  desc,
  onPressCam,
  setImgPath,
}) {
console.log("visible",visible)

  const uploadDoc = async () => {
    launchImageLibrary({
      quality: 1, // high quality
      compressImageMaxWidth: 1000, // large image size
      compressImageMaxHeight: 1000,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    })
      .then(image => {
        var imageData = image;
        imageData = {
          uri: image.assets[0]?.uri,
          path: image.assets[0].uri,
          type: image.assets[0].type,
          name: image.assets[0].fileName,
          // base64: image.assets[0].base64,
        };
        setImageSource(imageData);
      })
      .catch(err => console.log(err));
  };

  const clickPicture = () => {
    launchCamera({
      quality: 1, // high quality
      compressImageMaxWidth: 1000, // large image size
      compressImageMaxHeight: 1000,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    })
      .then(image => {
        var imageData = image;
        imageData = {
          uri: image.assets[0]?.uri,
          path: image.assets[0].uri,
          type: image.assets[0].type,
          name: image.assets[0].fileName,
          // base64: image?.assets[0]?.base64,
        };
        setImageSource(imageData);
      })
      .catch(err => console.log(err));
  };
  return (
    <Modal
      isVisible={visible}
      backdropColor={'#000'}
      backdropOpacity={0.5}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={800}
      animationOutTiming={1000}
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}
      onBackdropPress={onBackdropPress}>
      <View
        style={{
          width: '100%',
          padding: ms(20),
          paddingBottom: 10,
          backgroundColor: theme?.background,
          borderRadius: 10,
        }}>
        <>
          <Text
            style={{
              fontSize: ms(14),
              fontFamily: fontFamily.playfair_semiBold,
              // lineHeight: ms(35),
              marginBottom: ms(10),
              color: theme?.gray,
            }}>
            Upload {Documnet ? Documnet : ' profile Image'}
            <Text style={{color: theme?.primary_color}}> {desc}</Text>
          </Text>
          <Text
            style={{
              color: theme?.gray,
              fontSize: ms(12),
              fontFamily: fontFamily?.Playfair_Display_Med,
            }}>
            Take a new photo or select an existing one from your photo library.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginVertical: ms(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                uploadDoc();
              }}>
              <Text
                style={{
                  color: theme?.primary_color,
                  fontFamily: fontFamily?.Playfair_Display_Med,
                  paddingRight: ms(20),
                  fontSize: ms(12),
                }}>
                GALLERY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                clickPicture();
              }}>
              <Text
                style={{
                  color: theme?.primary_color,
                  fontFamily: fontFamily?.Playfair_Display_Med,
                  paddingRight: ms(5),
                  fontSize: ms(12),
                }}>
                CAMERA
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </Modal>
  );
}

export default UploadMedia;

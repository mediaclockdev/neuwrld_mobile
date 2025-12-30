import React, {useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {ICONS} from '../theme/colors';
import {fontFamily, fontSizes} from '../theme/typography';
import {hp, s, vs} from '../utils/responsive';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  tintColor,
  icon,
  maxLength,
  secureTextEntry,
  rightLoader,
  customStyle,
  placeholderTextColor,
  customIconStyleLeft,
  propsStyle,
  textAlignVertical,
  error,
  onBlur,
  keyboardType = 'default',
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: icon ? 40 : 12,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8], // moves up
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [fontSizes.sm, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#999', '#555'],
    }),
    fontFamily: fontFamily.poppins_regular,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  };

  return (
    <View style={{marginBottom: 20}}>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : customStyle,
        ]}>
        {icon && (
          <Image
            tintColor={tintColor}
            source={icon}
            resizeMode="contain"
            style={[styles.leftIcon, customIconStyleLeft]}
          />
        )}
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          style={[styles.textInput, {...propsStyle}]}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && showPassword}
          keyboardType={keyboardType}
          placeholder=""
          textAlignVertical={textAlignVertical}
          autoCorrect={false}
          placeholderTextColor={placeholderTextColor || '#999'}
          
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? ICONS.eye : ICONS.eye_off}
              resizeMode="contain"
              style={{marginRight: 8, width: 20, height: 20}}
            />
          </TouchableOpacity>
        )}
        {rightLoader && <ActivityIndicator size={'small'} color={'#C49A6C'} />}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C28840',
    // borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: s(50),
    backgroundColor: '#fff',
    position: 'relative',
  },
  textInput: {
    flex: 1,
    fontSize: fontSizes.sm,
    fontFamily: fontFamily.poppins_regular,
    color: '#000',
    paddingTop: vs(8),
  },
  inputError: {
    borderColor: '#EC382A',
  },
  errorText: {
    marginTop: 4,
    color: '#EC382A',
    fontSize: 12,
  },
  leftIcon: {marginRight: 8, width: 20, height: 20},
});

export default CustomTextInput;

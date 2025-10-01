import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SubHeader from '../components/SubHeader';
import CustomButton from '../../../components/CustomButton';
import { goBack } from '../../../utils/rootNavigation';

// ✅ Validation schema
const schema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
    .required('Phone is required'),
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string()
    .matches(/^[0-9]{5,6}$/, 'Enter valid Zip/Postal code')
    .required('Zip/Postal code is required'),
});

export default function AddAddressScreen({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  const onSubmit = data => {
    console.log('New Address:', data);
    // 🔹 Save address to backend / state / Redux here
    navigation.goBack();
  };

  const renderInput = (name, placeholder, keyboardType = 'default') => (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={placeholder}
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType={keyboardType}
          />
          {errors[name] && (
            <Text style={styles.errorText}>{errors[name]?.message}</Text>
          )}
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <SubHeader onPressLeftIcon={()=>goBack()} centerlabel={'Add New Address'} hideRigthIcon={true} />
      <ScrollView contentContainerStyle={{padding: 20}}>
        {renderInput('fullName', 'Full Name')}
        {renderInput('phone', 'Phone Number', 'phone-pad')}
        {renderInput('street', 'Street Address')}
        {renderInput('city', 'City')}
        {renderInput('state', 'State')}
        {renderInput('zip', 'Zip / Postal Code', 'numeric')}
      </ScrollView>
      {/* Bottom Fixed Button */}
      <View style={styles.bottomBar}>
        <CustomButton onPress={handleSubmit(onSubmit)} title={'Save Address'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  inputWrapper: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android Shadow
    elevation: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },

  saveBtn: {
    backgroundColor: '#6B4226',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

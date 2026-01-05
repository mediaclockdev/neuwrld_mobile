import React, {useEffect, useState} from 'react';
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
import {goBack} from '../../../utils/rootNavigation';
import {CustomDropdown} from '../components/CustomDropdown';
import {useDispatch, useSelector} from 'react-redux';
import {postApi} from '../../../api/requestApi';
import {ALL_APi_LIST} from '../../../utils/apis';
import {ToastService} from '../../../utils/toastService';
import { getAddressRequest } from '../appReducer';

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
  const {savedAddress, userdetails} = useSelector(state => state.App);
const dispatch = useDispatch()
  const [stateOptions, setStateOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (savedAddress?.list_of_states) {
      const options = savedAddress.list_of_states.map(item => ({
        label: item?.name,
        value: item?.id,
      }));
      setStateOptions(options);
    }
  }, [savedAddress]);

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
    setLoading(true);
    let payload = {
      name: data?.fullName,
      email: userdetails?.email,
      phone: data?.phone,
      pincode: data?.zip,
      state_id: data?.state,
      country_id: savedAddress?.country?.id,
      address_line_1: data?.street,
      address_line_2: data?.street,
      landmark: '',
      city_name: data?.city,
      primary: true,
    };
    postApi(ALL_APi_LIST.address, payload)
      .then(res => {
        if (res?.data) {
          ToastService.success(
            'Your address has been updated , happy shopping',
          );
          dispatch(getAddressRequest())
          goBack()
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
      });
    // 🔹 Save address to backend / state / Redux here
    // navigation.goBack();
  };

  const renderInput = (
    name,
    placeholder,
    keyboardType = 'default',
    type,
    maxLength,
  ) => (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.inputWrapper}>
          {type === 'dropdown' ? (
            <CustomDropdown
              placeholder={`Select your ${placeholder}`}
              data={stateOptions}
              value={value}
              setValue={onChange}
              error={errors.issueCategory?.message}
            />
          ) : (
            <>
              <TextInput
                placeholder={placeholder}
                style={styles.input}
                maxLength={maxLength ?? 100}
                placeholderTextColor={'#696969'}
                numberOfLines={name === 'street' ? 3 : 1}
                multiline={name === 'street' ? true : false}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType={keyboardType}
              />
              {errors[name] && (
                <Text style={styles.errorText}>{errors[name]?.message}</Text>
              )}
            </>
          )}
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <SubHeader
        onPressLeftIcon={() => goBack()}
        centerlabel={'Add New Address'}
        hideRigthIcon={true}
      />
      <ScrollView contentContainerStyle={{padding: 20}}>
        {renderInput('fullName', 'Full Name', 'default', 'input')}
        {renderInput('phone', 'Phone Number', 'phone-pad', 'input', 10)}
        {renderInput('street', 'Street Address', 'default', 'input')}
      {renderInput('city', 'City', 'default', 'input')}
        {renderInput('state', 'State', 'default', 'dropdown')}
        {renderInput('zip', 'Zip / Postal Code', 'numeric', 'input', 6)}
      </ScrollView>
      {/* Bottom Fixed Button */}
      <View style={styles.bottomBar}>
        <CustomButton
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          title={'Save Address'}
        />
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

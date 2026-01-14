import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {AvoidSoftInput, AvoidSoftInputView} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {colors, ICONS, IMAGES} from '../../../theme/colors';
import {vs, s, wp, rr, ms} from '../../../utils/responsive';
import {useTheme} from '../../../context/ThemeContext';
import {fontFamily, fontSizes} from '../../../theme/typography';
import {usePopup} from '../../../context/PopupContext';
import ReusableModal from '../components/ReusableModal';
import {COUNTRIES, loerms_ipsum} from '../../../utils/globalJson';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/Header';
import SubHeader from '../components/SubHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomSheet from '../../../components/BottomSheet';
import {updateUserProfileDetails} from '../appReducer';
import {goBack} from '../../../utils/rootNavigation';

// export const userScheema = Yup.object().shape({
//   first_name: Yup.string().required('First name is required'),

//   last_name: Yup.string().required('Last name is required'),

//   gender: Yup.string().required('Please select your gender'),

//   country_code: Yup.string().required(),

//   mobile: Yup.string().required('Mobile number is required'),

// });

export const userScheema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),

  last_name: Yup.string().required('Last name is required'),

  gender: Yup.string().required('Please select your gender'),

  country_code: Yup.string().required(),

  mobile: Yup.string()
    .required('Mobile number is required')
    .test('mobile-length-by-country', function (value) {
      const {country_code} = this.parent;
      const country = COUNTRIES.find(c => c.code === country_code);
      console.log('country_code', country_code, country);

      if (!country || !value) {
        return this.createError({
          message: 'Enter mobile number',
        });
      }

      if (value.length < country.minLength) {
        return this.createError({
          message: `Mobile number must be ${country.minLength} digits`,
        });
      }

      if (value.length > country.maxLength) {
        return this.createError({
          message: `Mobile number must be ${country.maxLength} digits`,
        });
      }

      return true;
    })
    .test('mobile-regex-by-country', function (value) {
      const {country_code} = this.parent;
      const country = COUNTRIES.find(c => c.code === country_code);

      if (!country || !value) return false;

      const normalized = country.dialCode + value;

      if (!country.regex.test(normalized)) {
        return this.createError({
          message: country.error,
        });
      }

      return true;
    }),
});

const UpdateProfile = ({navigation}) => {
  const {showPopup} = usePopup();
  const [showCountrySheet, setShowCountrySheet] = useState(false);

  const {customerDash, isLoading, allOrders, appliedCoupon, cartData} =
    useSelector(state => state.App);

  const dispatch = useDispatch();

  const {theme} = useTheme(); // 👈 hook works here
  const styles = createStyles(theme);

  const [genderPicker, setGenderPicker] = useState(false);
  const [resolver, setResolver] = useState(() => yupResolver(userScheema));
  const onFocusEffect = React.useCallback(() => {
    // This should be run when screen gains focus - enable the module where it's needed
    AvoidSoftInput.setEnabled(true);
    return () => {
      // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  useFocusEffect(onFocusEffect); // register callback to focus events
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(userScheema),
    defaultValues: {
      first_name: '',
      last_name: '',
      gender: '',
      country_code: 'AU',
      mobile: '',
    },
  });

  const onSubmit = async data => {
    let payload = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      gender: data?.gender === 'Male' ? 1 : data?.gender === 'Female' ? 2 : 3,
      phone: data?.mobile,
    };
    console.log('Register Data:', payload);
    dispatch(updateUserProfileDetails(payload));
    setTimeout(() => {
      goBack();
    }, 1000);
  };

  const handleGender = () => {
    setGenderPicker(!genderPicker);
  };

  const selectedCountry =
    COUNTRIES.find(c => c.code === watch('country_code')) || COUNTRIES[0];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <SubHeader hideRigthIcon />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={20}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Update your details to enjoy a seamless Neuwrld experience
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: wp(90), marginTop: ms(10)}}>
            <Controller
              control={control}
              name="first_name"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="First Name *"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon={ICONS.user}
                  error={errors.first_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="last_name"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Last Name *"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon={ICONS.user}
                  error={errors.last_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="gender"
              render={({field: {value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Select Gender *"
                  value={value}
                  onBlur={onBlur}
                  type="dropdown"
                  icon={ICONS.gender}
                  onPressRightIcon={handleGender}
                  rightIcon={ICONS.down_arrow}
                  error={errors.gender?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="mobile"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Mobile Number *"
                  value={value}
                  onChangeText={text => {
                    const cleaned = text.replace(/[^0-9+]/g, '');
                    onChange(cleaned);
                  }}
                  maxLength={selectedCountry.maxLength}
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  // 👇 Country shown here
                  leftCustomComponent={
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={() => setShowCountrySheet(true)}>
                      <Text style={{fontSize: 18}}>{selectedCountry.flag}</Text>
                      <Text style={{marginLeft: 6}}>
                        {selectedCountry.dialCode}
                      </Text>
                    </TouchableOpacity>
                  }
                  rightIcon={ICONS.down_arrow}
                  onPressRightIcon={() => setShowCountrySheet(true)}
                  error={errors.mobile?.message}
                />
              )}
            />

            <CustomButton
              title="Update Details"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
            />

            <BottomSheet
              visible={showCountrySheet}
              renderChild={COUNTRIES.map(country => {
                const selected = watch('country_code');
                return (
                  <Pressable
                    key={country.code}
                    style={{padding: 16}}
                    onPress={() => {
                      setValue('country_code', country.code);
                      setValue('mobile', '');
                      setShowCountrySheet(false);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: selected === country.code ? '#C49A6C' : '#000',
                      }}>
                      {country.name} ({country.dialCode})
                    </Text>
                  </Pressable>
                );
              })}
              onClose={() => setShowCountrySheet(false)}></BottomSheet>
            <BottomSheet
              visible={genderPicker}
              renderChild={['Male', 'Female', 'Other'].map(item => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setValue('gender', item, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setGenderPicker(false);
                  }}
                  style={styles.option}>
                  <Text style={styles.optionText}>{item}</Text>
                </Pressable>
              ))}
              onClose={() => setGenderPicker(false)}></BottomSheet>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      padding: ms(15),
      alignItems: 'center',
      flex: 1,
    },
    logo: {
      width: s(90),
      height: vs(90),
    },

    title: {
      fontSize: fontSizes.xxl,
      textAlign: 'center',
      marginVertical: vs(0),
      width: wp(70),
      fontFamily: fontFamily.playfair_semiBold,
      color: theme?.text,
    },
    termsDetails: {
      fontSize: fontSizes.sm,
      textAlign: 'left',
      fontFamily: fontFamily.poppins_medium,
      color: theme?.text,
      lineHeight: ms(20),
    },

    subtitle: {
      fontSize: fontSizes.sm,
      textAlign: 'center',
      marginBottom: vs(20),
      fontFamily: fontFamily.poppins_regular,
      color: theme?.text,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vs(10),
    },
    box: {
      width: s(22),
      height: s(22),
      borderWidth: 1,
      borderRadius: 4,
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    terms: {
      fontSize: fontSizes.sm,
      textAlign: 'center',
      fontFamily: fontFamily.poppins_regular,
    },
    gender: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamily.poppins_regular,
      color: '#000',
      paddingTop: vs(8),
    },
    optionText: {
      fontSize: fontSizes.sm,
      fontFamily: fontFamily.poppins_regular,
      color: '#000',
      textAlign: 'center',
      letterSpacing: ms(0.3),
    },
    rowfooter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: vs(0),
      alignSelf: 'center',
      gap: s(5),
    },
    logoWrapper: {
      width: s(90),
      height: vs(90),
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: rr(20),
      overflow: 'hidden',
    },
    checkboxrow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },

    checkbox: {
      height: s(20),
      width: s(20),
      borderWidth: 1,
      backgroundColor: 'white',
      marginRight: ms(10),
      padding: s(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftIcon: {marginRight: 8, width: 20, height: 20},
    option: {
      width: '90%',
      height: vs(45),
      paddingHorizontal: ms(15),
      paddingTop: ms(15),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default UpdateProfile;

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
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
import SignUpTab from '../components/SignUpTab';
import OtpInputPopUp from '../components/OtpInputPopUp';
import {usePopup} from '../../../context/PopupContext';

const emailSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept terms'),
});

const phoneSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter valid 10-digit number')
    .required('Phone number is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept terms'),
});

const Signup = ({navigation}) => {
  const {showPopup} = usePopup();

  const {theme} = useTheme(); // 👈 hook works here
  const styles = createStyles(theme);

  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Email');
  const [mobile, setMobile] = useState('');
  const [resolver, setResolver] = useState(() => yupResolver(emailSchema));
  const [mobileerr, setMobileError] = useState('');
  const [termsCheck, setTermsCheck] = useState(false);
  const [termsErr, setTermsErr] = useState('');
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
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      terms: false,
    },
  });

  // 🔄 Update schema + reset when tab changes
  useEffect(() => {
    if (selectedTab === 'Email') {
      setResolver(() => yupResolver(emailSchema));
      reset({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      });
    } else {
      setResolver(() => yupResolver(phoneSchema));
      reset({
        mobile: '',
        terms: false,
      });
    }
  }, [selectedTab, reset]);

  function validateMobileNumber(number) {
    const regex = /^\d{9,14}$/;
    return regex.test(number);
  }
  console.log('first', validateMobileNumber);

  const onSubmit = async data => {
    console.log('Register Data:', data);
    // API Call
  };

  const handleMobileRegister = otp => {
    console.log(otp);
    if (otp) {
      setTimeout(() => {
        showPopup({
          type: 'success',
          title: 'Done!',
          message: 'Successfully registerd , thank you for choosing us  🎉',
          confirmText: 'Continue to Login',
          onConfirm: () => navigation.navigate('Login'),
        });
      }, 1500);
    } else {
      setOtpModalVisible(true);
    }
  };

  return (
    <AvoidSoftInputView style={styles.parent} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={styles.logoWrapper}>
          <Image
            source={IMAGES.logo} // add your Handova logo in assets
            style={styles.logo}
            resizeMode="contain"
          />
        </View> */}
        <Text style={styles.title}>Create An Account</Text>
        <Text style={[styles.subtitle]}>
          Fill your details below and Join us to discover amazing fashion
        </Text>

        <SignUpTab
          type={tab => {
            console.log('first', tab);
            setSelectedTab(tab?.label);
          }}
        />
        {selectedTab === 'Email' && (
          <View style={{width: wp(90)}}>
            <Controller
              control={control}
              name="fullName"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Full Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon={ICONS.user}
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon={ICONS.email}
                  keyboardType="email-address"
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon={ICONS.lock}
                  secureTextEntry
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, value, onBlur}}) => (
                <CustomTextInput
                  placeholder="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  icon={ICONS.lock}
                  secureTextEntry
                  error={errors.confirmPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="terms"
              render={({field: {onChange, value}}) => (
                <TouchableOpacity
                  style={styles.checkboxrow}
                  onPress={() => onChange(!value)} // toggle checkbox
                >
                  <View
                    style={[
                      styles.checkbox,
                      {
                        borderColor: value ? theme?.primary_color : 'gray',
                      },
                    ]}>
                    {value && (
                      <Image
                        source={ICONS.check}
                        style={{
                          width: '100%',
                          height: '100%',
                          tintColor: theme?.primary_color,
                        }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text style={styles.terms}>
                    I accept the Terms & Conditions
                  </Text>
                </TouchableOpacity>
              )}
            />
            {errors.terms && (
              <Text style={{color: 'red'}}>{errors.terms.message}</Text>
            )}
            <CustomButton
              title="Sign Up"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            />
          </View>
        )}
        {selectedTab === 'Phone' && (
          <View style={{width: wp(90)}}>
            <CustomTextInput
              placeholder="Mobile Number"
              value={mobile}
              keyboardType="number-pad"
              onChangeText={num => {
                setMobile(num); // always update so user can type / delete freely

                if (num === '' || validateMobileNumber(num)) {
                  setMobileError(''); // clear error if empty or valid
                } else {
                  setMobileError(
                    'Mobile number should be between 9 to 14 digits and numbers only',
                  );
                }
              }}
              maxLength={14}
              icon={ICONS.telephone}
              error={mobileerr}
            />
            <View style={styles.checkboxrow}>
              <TouchableOpacity
                onPress={() =>
                  !mobile
                    ? setMobileError('Please enter your number first ')
                    : (setTermsErr(''), setTermsCheck(!termsCheck))
                }
                style={[
                  styles.checkbox,
                  {
                    borderColor: termsCheck ? theme?.primary_color : 'gray',
                  },
                ]}>
                {termsCheck && (
                  <Image
                    source={ICONS.check}
                    style={{
                      width: '100%',
                      height: '100%',
                      tintColor: theme?.primary_color,
                    }}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.terms}>I accept the Terms & Conditions</Text>
            </View>

            {termsErr && <Text style={{color: 'red'}}>{termsErr}</Text>}
            <CustomButton
              title="Sign Up"
              onPress={() => {
                if (!termsCheck) {
                  setTermsErr('You must accept terms');
                } else {
                  handleMobileRegister();
                }
              }}
              loading={isSubmitting}
            />
          </View>
        )}

        <View style={styles.rowfooter}>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme?.text,
                fontSize: fontSizes.sm,
                fontFamily: fontFamily.poppins_regular,
              },
            ]}>
            Already have have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme?.text,
                  fontSize: fontSizes.sm,
                  fontFamily: fontFamily.poppins_semiBold,
                },
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <OtpInputPopUp
        isOtpModalVisible={isOtpModalVisible}
        onBackdropPress={() => {
          setOtpModalVisible(false);
        }}
        submit={otp => {
          handleMobileRegister(otp);
        }}
      />
    </AvoidSoftInputView>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    parent: {
      flex: 1,
      backgroundColor: theme?.background,
    },
    container: {
      padding: ms(20),
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
      marginVertical: vs(12),
      width: wp(70),
      fontFamily: fontFamily.playfair_semiBold,
      color: theme?.text,
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
    rememberMe: {
      marginLeft: 8,
      fontSize: fontSizes.sm,
      textAlign: 'center',
      fontFamily: fontFamily.poppins_regular,
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
  });

export default Signup;

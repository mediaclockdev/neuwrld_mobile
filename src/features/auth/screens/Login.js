import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {AvoidSoftInput, AvoidSoftInputView} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {colors, ICONS, IMAGES} from '../../../theme/colors';
import {vs, s, hp, rr, wp, ms} from '../../../utils/responsive';
import {useTheme} from '../../../context/ThemeContext';
import {fontFamily, fontSizes} from '../../../theme/typography';
import HeaderGoBack from '../components/HeaderGoBack';
import {setUser} from '../../../utils/authStorage';
import OtpInputPopUp from '../components/OtpInputPopUp';
import {useDispatch, useSelector} from 'react-redux';
import {signInRequest} from '../authReducer';
const Login = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const onFocusEffect = React.useCallback(() => {
    // This should be run when screen gains focus - enable the module where it's needed
    AvoidSoftInput.setEnabled(true);
    return () => {
      // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  const dispatch = useDispatch();

   const {isRegisterSuccess, isDataSubmitting} = useSelector(
    state => state.Auth,
  );

  useFocusEffect(onFocusEffect); // register callback to focus events
  const [loginType, setLoginType] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileerr, setMobileError] = useState('');
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);

  // ✅ Validation Schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  function validateMobileNumber(number) {
    const regex = /^\d{9,14}$/;
    return regex.test(number);
  }

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = data => {
    if (loginType === 'email') {
      let payload = {
        email: data?.email,
        password: data?.password,
        fcm_token: 'fcm_token_here',
        device_id: 'device_unique_id',
      };

      dispatch(signInRequest(payload));
    } else {
      setOtpModalVisible(true);
    }

    // (setLoading(true),
    //   setTimeout(() => {
    //     setLoading(false);
    //     setUser({userType: 'user', email: data.email});
    //   }, 2000))
  };

  const verifyOtp = () => {
    setOtpModalVisible(false);
    setLoading(true),
      setTimeout(() => {
        setLoading(false);
        setUser({userType: 'user', phone: mobile});
      }, 2000);
  };

  return (
    <AvoidSoftInputView style={styles.parent} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={IMAGES.logo} // add your Handova logo in assets
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Welcome back!</Text>
        <Text
          style={[
            styles.subtitle,
            {
              width: wp(80),
            },
          ]}>
          You Have Been Missed , Sign in to your account and continue exploring
          the best fashion with us.
        </Text>
        <View style={[styles.singInWrapper]}>
          {loginType === 'email' && (
            <>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    placeholder="Registered Email"
                    placeholderTextColor={theme?.input_text}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    icon={ICONS.email}
                    error={errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Password"
                    placeholderTextColor={theme?.input_text}
                    icon={ICONS.lock}
                    secureTextEntry
                    error={errors.password?.message}
                  />
                )}
              />
              <View style={styles.rowBetween}>
                <Text
                  onPress={() => navigation.navigate('ResetPassword')}
                  style={[
                    styles.forgot,
                    {
                      color: theme?.text,
                    },
                  ]}>
                  Forgot Password?
                </Text>
              </View>

              <CustomButton
                title="Sign In"
                onPress={handleSubmit(handleLogin)}
                loading={loading}
              />
            </>
          )}

          {loginType === 'phone' && (
            <>
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

              <CustomButton
                title="Sign In"
                onPress={() => {
                  if (!mobile) {
                    setMobileError('Please enter your number first ');
                  } else {
                    handleLogin(mobile);
                  }
                }}
                loading={isDataSubmitting}
              />
            </>
          )}

          <TouchableOpacity
            onPress={() => {
              let prev = loginType === 'email' ? 'phone' : 'email';
              setLoginType(prev);
            }}
            style={styles.rowCenter}>
            <Text
              style={[
                styles.mobileLogin,
                {
                  color: theme?.text,
                },
              ]}>
              Or continue with{' '}
              {loginType === 'email' ? 'mobile login' : 'email & password'}
            </Text>
          </TouchableOpacity>
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
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
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
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <OtpInputPopUp
          isOtpModalVisible={isOtpModalVisible}
          onBackdropPress={() => {
            setOtpModalVisible(false);
          }}
          submit={otp => {
            verifyOtp(otp);
          }}
        />
      </ScrollView>
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
    },
    logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
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
      color: theme?.gray,
      lineHeight: vs(20),
      textTransform: 'capitalize',
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginVertical: vs(8),
    },

    forgot: {
      fontSize: fontSizes.sm,
      textAlign: 'center',
      fontFamily: fontFamily.poppins_regular,
    },

    // new
    singInWrapper: {
      width: '100%',
      height: hp(55),
      padding: s(15),
      borderRadius: rr(20),
      backgroundColor: theme?.background,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.2,

      elevation: 3,
    },
    logoWrapper: {
      width: s(200),
      height: vs(100),
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    rowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: vs(8),
    },
    mobileLogin: {
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
  });

export default Login;

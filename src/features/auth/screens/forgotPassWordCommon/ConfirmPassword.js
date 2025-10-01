import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import {AvoidSoftInput, AvoidSoftInputView} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {colors, ICONS, IMAGES} from '../../../../theme/colors';
import {vs, s} from '../../../../utils/responsive';
import {useTheme} from '../../../../context/ThemeContext';
import {fontFamily, fontSizes} from '../../../../theme/typography';
import HeaderGoBack from '../../components/HeaderGoBack';
import {usePopup} from '../../../../context/PopupContext';
const ConfirmPassword = ({navigation}) => {
  const {theme} = useTheme();
  const {showPopup} = usePopup();

  const onFocusEffect = React.useCallback(() => {
    // This should be run when screen gains focus - enable the module where it's needed
    AvoidSoftInput.setEnabled(true);
    return () => {
      // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  useFocusEffect(onFocusEffect); // register callback to focus events
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Validation Schema
  const passwordScheema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Min 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(passwordScheema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showPopup({
        type: 'success',
        title: 'Done!',
        message: 'Password updated successfully 🎉',
        confirmText: 'Continue to Login',
        onConfirm: () => navigation.navigate('Login'),
      });
    }, 2000);
  };

  return (
    <AvoidSoftInputView style={styles.parent} behavior="padding">
      <HeaderGoBack />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={IMAGES.logo} // add your Handova logo in assets
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Final Step!</Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: theme?.text,
            },
          ]}>
          Re-set password
        </Text>

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
        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {onChange, value, onBlur}}) => (
            <CustomTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Confirm Password"
              placeholderTextColor={theme?.input_text}
              icon={ICONS.lock}
              secureTextEntry
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <CustomButton
          title="Update Password"
          onPress={handleSubmit(handleResetPassword)}
          loading={loading}
        />

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
                  color: theme?.primary_color,
                  fontSize: fontSizes.sm,
                  fontFamily: fontFamily.poppins_semiBold,
                },
              ]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AvoidSoftInputView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: vs(100),
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: s(220),
    height: vs(100),
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    fontFamily: fontFamily.poppins_semiBold,
    color: '#1B1B1B',
    marginBottom: vs(10),
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSizes.base,
    textAlign: 'center',
    marginBottom: vs(20),
    fontFamily: fontFamily.poppins_regular,
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
  forgot: {
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
    bottom: vs(20),
    alignSelf: 'center',
    gap: s(5),
  },
});

export default ConfirmPassword;

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {ms, vs} from '../../../utils/responsive';
import CustomButton from '../../../components/CustomButton';
import {fontFamily, fontSizes} from '../../../theme/typography';

const OtpInputPopUp = ({isOtpModalVisible, onBackdropPress, submit}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [modal, setModal] = useState(true);
  const [otpError, setOtpError] = useState('');
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (text, index) => {
    if (/^\d$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input
      if (text !== '' && index < 3) {
        inputs[index + 1].current.focus();
      }

      // Backspace → go to previous
      if (text === '' && index > 0) {
        inputs[index - 1].current.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setOtpError('Please enter all 4 digits');
      return;
    } else if (enteredOtp?.length == 4) {
      setModal(false);
      setOtpError('');
    }
    submit(enteredOtp);
  };

  return (
    <View>
      {/* OTP Modal */}
      <Modal
        isVisible={isOtpModalVisible && modal}
        onBackdropPress={onBackdropPress}
        useNativeDriver={true} // Better performance
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true} // Avoid flicker
        propagateSwipe={true} // Allow swipe inside content
        backdropTransitionOutTiming={0} // Prevent backdrop flicker on close
        // Animation Controls
        animationIn="slideInUp" // Entry animation
        animationOut="slideOutDown" // Exit animation
        animationInTiming={500} // Duration of entry
        animationOutTiming={500} // Duration of exit
        avoidKeyboard={true}
        style={styles.bottomModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              We've sent a 4-digit verification code to your number . Please
              check your messages and enter the code below to continue.
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={inputs[index]}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                />
              ))}
            </View>
            {otpError && <Text style={{color: 'red'}}>{otpError}</Text>}
            <CustomButton title="Verify OTP" onPress={handleVerifyOtp} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default OtpInputPopUp;

const styles = StyleSheet.create({
  bottomModal: {flex: 1, justifyContent: 'flex-end', margin: 0},
  modalContent: {
    backgroundColor: 'white',
    // maxHeight: ms(400),
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontFamily.poppins_italic,
    marginBottom: vs(14),
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: vs(10),
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    fontSize: 20,
    padding: 12,
    width: 50,
    textAlign: 'center',
  },
  verifyBtn: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});

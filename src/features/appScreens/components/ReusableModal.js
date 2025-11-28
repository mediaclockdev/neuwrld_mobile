import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

const ReusableModal = ({
  isVisible,
  onClose,
  title,
  children,
  footer,
  isFlatlist=false,
  showCloseButton = true,
  swipeDirection = 'down',
  backdropOpacity = 0.5,
  avoidKeyboard = true,
  contentStyle,
  modalProps = {},
}) => {
  const Container = ({children}) =>
    avoidKeyboard ? (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        {children}
      </KeyboardAvoidingView>
    ) : (
      <>{children}</>
    );

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={'#000'}
      backdropOpacity={0.5}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={800}
      animationOutTiming={1000}
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}
      onBackdropPress={onClose}
      style={{margin: 0, flex: 1, justifyContent: 'flex-end'}}>
      <Container>
        <SafeAreaView style={[styles.modal, contentStyle]}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                {typeof title === 'string' ? (
                  <Text style={styles.titleText}>{title}</Text>
                ) : (
                  title
                )}
              </View>

              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  accessibilityRole="button"
                  style={styles.closeButton}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {isFlatlist ? (
            children
          ) : (
            <ScrollView
              contentContainerStyle={styles.bodyContent}
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          )}

          {footer && <View style={styles.footer}>{footer}</View>}
        </SafeAreaView>
      </Container>
    </Modal>
  );
};

export default ReusableModal;

const styles = StyleSheet.create({
  flex: {flex: 1},
  modal: {
    backgroundColor: 'white',
    paddingVertical: 8,
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerLeft: {flex: 1},
  titleText: {fontSize: 16, fontWeight: '600'},
  closeButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {fontSize: 18},
  bodyContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footer: {
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
});

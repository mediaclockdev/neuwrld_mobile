import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

export const RateReviewSheet = ({onSubmit ,uploadImg}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>How was your order? 😊</Text>

      <Text style={styles.subtitle}>
        Your feedback helps others choose better
      </Text>

      {/* Stars */}
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map(i => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => setRating(i)}>
            <Text style={[styles.star, rating >= i && styles.starActive]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Review input */}
      <TextInput
        placeholder="Write something (optional)"
        placeholderTextColor={theme.input_text}
        value={review}
        onChangeText={setReview}
        multiline
        style={styles.input}
      />

       <TouchableOpacity
        style={[styles.uploadImg]}
        disabled={rating === 0}
        onPress={() => uploadImg()}>
        <Text style={styles.submitText}>Upload Image </Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity
        style={[styles.submitBtn, rating === 0 && {opacity: 0.5}]}
        disabled={rating === 0}
        onPress={() => onSubmit({rating, review})}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>

      {/* Skip */}
      <TouchableOpacity onPress={() => onSubmit(null)}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.section_background,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
    subtitle: {
      color: theme.gray,
      textAlign: 'center',
      marginTop: 6,
    },
    starRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 18,
    },
    star: {
      fontSize: 36,
      color: theme.form_border,
      marginHorizontal: 6,
    },
    starActive: {
      color: theme.primary_color,
    },
    input: {
      backgroundColor: theme.white,
      borderRadius: 14,
      padding: 14,
      minHeight: 90,
      color: theme.text,
      marginBottom: 16,
      textAlignVertical: 'top',
    },
    submitBtn: {
      backgroundColor: theme.primary,
      padding: 14,
      borderRadius: 14,
      alignItems: 'center',
    },
    uploadImg: {
      backgroundColor: theme.primary_color,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitText: {
      color: theme.white,
      fontWeight: '600',
      fontSize: 16,
    },
    skip: {
      textAlign: 'center',
      color: theme.gray,
      marginTop: 12,
    },
  });

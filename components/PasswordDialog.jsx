import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const PasswordDialog = ({ isVisible, onClose, onSubmit }) => {
  const [password, setPassword] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleInputChange = (text, index) => {
    const newPassword = [...password];
    newPassword[index] = text;
    setPassword(newPassword);

    if (text.length === 1 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && password[index] === '') {
      const newPassword = [...password];
      newPassword[index - 1] = '';
      setPassword(newPassword);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullPassword = password.join('');
    if (fullPassword === '12025') {
      setError('');
      onSubmit(fullPassword);
    } else {
      setError('Contraseña incorrecta');
      shakeAnimation.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.dialog, { transform: [{ translateX: shakeAnimation }] }]}>
        <Text style={styles.title}>Digite la contraseña</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.inputContainer}>
          {password.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => inputRefs.current[index] = el}
              style={[styles.input, error ? styles.inputError : null]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              secureTextEntry
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Lora-SemiBold',
  },
  errorText: {
    color: '#F4493C',
    marginBottom: 10,
    fontFamily: 'Lora-SemiBoldItalic',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Lora-Regular',
  },
  inputError: {
    borderColor: '#F4493C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#16A6FA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Lora-Bold',
  },
  closeButton: {
    backgroundColor: '#F4493C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  closeButtonText: {
    fontFamily: 'Lora-Bold',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PasswordDialog;


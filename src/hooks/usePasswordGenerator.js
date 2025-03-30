import { useState, useCallback } from 'react';

const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const calculateStrength = (password) => {
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  
  let score = 0;
  if (length >= 12) score += 2;
  if (length >= 16) score += 1;
  if (hasUpper) score += 1;
  if (hasLower) score += 1;
  if (hasNumber) score += 1;
  if (hasSymbol) score += 1;

  if (score <= 2) return 0;
  if (score <= 4) return 1;
  if (score <= 6) return 2;
  return 3;
};

const usePasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const generatePassword = useCallback((length, options) => {
    let charset = '';
    Object.entries(options).forEach(([key, value]) => {
      if (value) charset += characterSets[key];
    });

    if (!charset) {
      setPassword('Select at least one option');
      return;
    }

    const buffer = new Uint32Array(length);
    window.crypto.getRandomValues(buffer);
    
    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += charset[buffer[i] % charset.length];
    }

    setPassword(generated);
    setStrength(calculateStrength(generated));
  }, []);

  return { password, generatePassword, strength };
};

export default usePasswordGenerator;
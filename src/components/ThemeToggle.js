import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTheme } from '../theme-context';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <Button 
      variant="outline-secondary"
      onClick={() => setDarkMode(!darkMode)}
      className="theme-toggle"
    >
      {darkMode ? '🌞' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
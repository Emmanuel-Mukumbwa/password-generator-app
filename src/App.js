// App.js
import React, { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';
import usePasswordGenerator from './hooks/usePasswordGenerator';
import StrengthMeter from './components/StrengthMeter';
import ThemeToggle from './components/ThemeToggle';
import { Modal, Button } from 'react-bootstrap';
import './App.scss';

function App() {
  const { password, generatePassword, strength } = usePasswordGenerator();
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  useEffect(() => {
    generatePassword(length, options);
  }, [length, options, generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <ThemeToggle />
      <div className="generator-container">
        <h1>Secure Password Generator</h1>
        
        <div className="password-display">
          <div className="password-field">
            {visible ? password : password.replace(/./g, '•')}
            <button onClick={() => setVisible(!visible)} className="visibility-btn">
              {visible ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button onClick={copyToClipboard} className="copy-btn">
            <FiCopy />
          </button>
        </div>

        {copied && <div className="copied-indicator">Copied!</div>}

        {/* StrengthMeter enhanced with gradient/animation */}
        <div className="strength-container">
          <StrengthMeter strength={strength} />
        </div>

        <div className="controls">
          <div className="length-control">
            <label>Length: {length}</label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="options-grid">
            {Object.entries(options).map(([key, value]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => 
                    setOptions({ ...options, [key]: e.target.checked })
                  }
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>

          <button 
            onClick={() => generatePassword(length, options)}
            className="generate-btn"
          >
            <FiRefreshCw /> Regenerate
          </button>
        </div>
      </div>

      {/* Floating buttons for modals */}
      <button className="about-developer-btn" onClick={() => setShowAboutModal(true)}>
        About Developer
      </button>
      <button className="user-manual-btn" onClick={() => setShowManualModal(true)}>
        User Manual
      </button>

      {/* About Developer Modal */}
      <Modal show={showAboutModal} onHide={() => setShowAboutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>About Developer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> Emmanuel aRelic Mukumbwa</p>
          <p><strong>Email:</strong> emukumbwa2419@gmail.com</p>
          <p>
            <strong>Skills:</strong> React, Node.js, MySQL, Postman, PHP, and more.
          </p>
          <p>
            <strong>Bio:</strong> A dedicated Full Stack Developer passionate about creating secure and efficient applications.
            Experienced in building scalable web solutions and continuously learning new technologies.
          </p>
          <p>
            <strong>Facebook Username: </strong>Emmanuel ARelic Snr.{' '}
            {/*<a href="https://web.facebook.com/@emmanuel.alingo" target="_blank" rel="noopener noreferrer">
              Emmanuel ARelic Snr.
            </a>*/}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAboutModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Manual Modal */}
        <Modal show={showManualModal} onHide={() => setShowManualModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>User Manual</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>How to Use This Password Generator</h5>
            <p>
              This secure password generator is designed to create strong, random passwords to help protect your online accounts.
            </p>
            <ul>
              <li>
                <strong>Adjust Length:</strong> Use the slider to choose the desired password length (between 8 and 64 characters).
              </li>
              <li>
                <strong>Select Options:</strong> Check the boxes to include uppercase letters, lowercase letters, numbers, and symbols. These options allow you to customize your password.
              </li>
              <li>
                <strong>Generate Password:</strong> Click the <em>Regenerate</em> button (with the refresh icon) to generate a new password based on your settings.
              </li>
              <li>
                <strong>Toggle Visibility:</strong> Click the eye icon to show or hide the password. Hidden passwords display as bullet points.
              </li>
              <li>
                <strong>Copy Password:</strong> Click the copy icon to copy the generated password to your clipboard. A "Copied!" indicator will briefly appear to confirm the action.
              </li>
            </ul>
            <h5>Benefits of a Strong Password</h5>
            <p>
              A strong password helps protect your personal information and online accounts from unauthorized access. Use a mix of characters to ensure maximum security.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowManualModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;

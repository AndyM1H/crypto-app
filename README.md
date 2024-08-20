# Encryption Tool

[![en]](README.md)
[![ru]](README-ru.md)

## Overview

The Encryption Tool is a desktop application built with [Electron](https://www.electronjs.org/) that provides two classic encryption methods: Caesar Cipher and Vigenère Cipher. This application allows users to encrypt and decrypt text, offering a simple and intuitive interface for interacting with these cryptographic algorithms. The program also supports opening and saving files, making it easy to manage encrypted and decrypted text.

## Features

- **Caesar Cipher**: Encrypt and decrypt text by shifting each character by a specified number of positions in the alphabet.
- **Vigenère Cipher**: Encrypt and decrypt text using a keyword that determines the shifting of each character.
- **File Handling**: Open text files for encryption or decryption, and save the results to a file.
- **User-friendly Interface**: Simple and easy-to-use interface for selecting encryption methods and managing text input/output.

## Installation

### Prerequisites

Before running the application, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Install Dependencies

```bash
npm install
```

### Running the Application

To start the application in development mode, run:

```bash
npm start
```

This will build and launch the application in a new Electron window.

### Building the Application

To package the application for distribution:

```bash
npm run package
```

This will create a distributable version of the app for your operating system.

## Usage

1. **Select Encryption Method**: Choose between Caesar Cipher and Vigenère Cipher from the dropdown menu.
2. **Enter Text**: Input the text you want to encrypt or decrypt.
3. **Specify Shift/Key**: Enter the shift number (for Caesar Cipher) or the key (for Vigenère Cipher).
4. **Encrypt/Decrypt**: Click the respective button to perform the desired action.
5. **Save Result**: Use the save button to store the result in a text file.

## Testing

To run the tests for the encryption algorithms:

```bash
npm test
```

This will execute the tests defined in `crypto-methods.spec.ts` and ensure that the algorithms function correctly.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# ChatAI

ChatAI is a React Native mobile application that brings AI-powered conversations to your users with a modern chat experience. The app supports Firebase authentication, stores chat history in Firestore, and integrates with the Hugging Face inference API to generate responses in real time.

It is designed for both Android and iOS, with onboarding, profile management, localization, and persistent chat history built in.

## Features

- AI-powered chat interface powered by Hugging Face
- Firebase authentication
  - Email/password sign-in
  - Google sign-in
  - Facebook sign-in
- Firestore-backed chat history persistence
- User profile management
- Onboarding flow for first-time users
- Multi-language support
  - English
  - Russian
  - German
  - Sinhala
  - Tamil
- Cross-platform React Native app for Android and iOS

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Redux Toolkit
- Firebase Auth + Firestore
- Hugging Face Inference API
- AsyncStorage
- i18next
- Jest for testing
- ESLint + Prettier

## App Structure

```bash
ChatAI/
├── __tests__/
├── android/
├── ios/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── localization/
│   ├── navigation/
│   ├── screens/
│   ├── store/
│   └── styles/
├── App.tsx
├── package.json
├── babel.config.js
├── metro.config.js
├── tsconfig.json
├── README.md
├── Dockerfile
├── docker-compose.yml
├── app.json
├── index.js
├── jest.config.js
├── .eslintrc.js
├── .prettierrc.js
├── .gitignore
└── Gemfile
```

## Screens

- Onboarding
- Login
- Sign up
- Home / chat
- Chat history
- Profile settings

## Prerequisites

Before running this project, make sure you have:

- Node.js 22.11.0 or newer
- npm or yarn
- Android Studio and Android SDK (for Android)
- Xcode and CocoaPods (for iOS)
- A Firebase project
- A Hugging Face API key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DhanushkaSa/ChatAI.git
cd ChatAI
```

### 2. Install dependencies

```bash
npm install
```

If you are using Yarn:

```bash
yarn install
```

### 3. Install iOS dependencies

```bash
cd ios
pod install
cd ..
```

### 4. Configure Firebase

This app uses Firebase Authentication and Firestore.

1. Create a new Firebase project.
2. Add Android and iOS apps to the project.
3. Download and place:
   - `google-services.json` in `android/app/`
   - `GoogleService-Info.plist` in the iOS project
4. Enable the required sign-in methods in Firebase Authentication:
   - Email/Password
   - Google Sign-In
   - Facebook Sign-In (if enabled in your app configuration)

### 5. Configure Hugging Face

The app calls the Hugging Face chat/completions endpoint from `src/api/getHugginfaceResponse.tsx`.

Create a `.env` file at the project root and add your key:

```bash
HUGGING_FACE_KEY=your_huggingface_api_key
```

Then make sure the app reads the value securely from environment variables or replace the placeholder value in the API file with your own key.

## Running the App

### Start Metro

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

## Usage

1. Launch the app.
2. Complete the onboarding flow.
3. Sign in or create an account.
4. Start a conversation with the AI assistant.
5. View chat history from the History tab.
6. Update your profile and app language from the Profile tab.

## Environment Notes

This project uses:
- Firebase for authentication and data storage
- Hugging Face for AI inference
- AsyncStorage for app-level persistence such as onboarding state and language preference

If you are deploying or testing in a production environment, ensure that API keys and Firebase credentials are securely managed and not hardcoded in production builds.

## Development Scripts

```bash
npm start
npm run android
npm run ios
npm test
npm run lint
```

## License

This project does not currently include a license file. If you plan to distribute or publish it, consider adding an appropriate open-source license.

## Contributing

Contributions are welcome. If you’d like to improve the app:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request with a clear description

## Support

For setup issues, Firebase configuration, or Hugging Face integration problems, check the project configuration files and the official documentation for:

- React Native
- Firebase
- Hugging Face
- React Navigation

---

This project is a modern AI chat app built with React Native and Firebase, designed to provide a smooth mobile experience for users who want to chat with an AI assistant, track conversations, and manage accounts securely.

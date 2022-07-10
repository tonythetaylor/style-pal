import 'dotenv/config';

export default {
  "expo": {
    "name": "style-pal",
    "slug": "style-pal",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
      "resizeMode": "contain"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "plugins": [
      "react-native-vision-camera"
    ]
  },
  "name": "style-pal",
  "plugins": [
    [
      "react-native-vision-camera",
      {
        "cameraPermissionText": "$(PRODUCT_NAME) needs access to your Camera.",
        "enableMicrophonePermission": true,
        "microphonePermissionText": "$(PRODUCT_NAME) needs access to your Microphone."
      }
    ]
  ],
  "extra": {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID
  }
}

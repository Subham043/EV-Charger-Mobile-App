EV-Charger-Mobile-App
=====================

EV-Charger-Mobile-App is a mobile application build using react-native framework. There are 2 ways to use the app:


Local Machine
---------------

-  Step 1: Clone the repository
-  Step 2: Run `npm install`
-  Step 3: Run `npx expo start`
-  Step 4: Install the Expo Go app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app.


Building Standalone Apps 
---------------

-  Step 1: Install Expo CLI
-  Step 2: Configure app.json `{
  "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    }
  }
}`
-  Step 3: Start the build. Run `expo build:android` or `expo build:ios`

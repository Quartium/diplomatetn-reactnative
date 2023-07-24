# Le Diplomate Tunisien - React Native Application

Le Diplomate Tunisien is a dedicated mobile application designed to facilitate effective communication and information exchange between Tunisian diplomats. The platform serves as a Think-Tank providing key insights and information on national diplomatic matters.

Built using React Native, the application is fully cross-platform, supporting both Android and iOS devices. It features intuitive UI/UX designs that streamline the user experience and promote interaction.

## Features

1. **Push Notifications**: The application integrates with OneSignal to enable real-time push notifications. This ensures that the users are kept up-to-date with the latest information and events related to diplomatic matters.
2. **Offline Reading**: Le Diplomate Tunisien supports offline reading, allowing users to save their preferred articles for reading later. This is particularly useful when an internet connection is not readily available.
3. **Information Repository**: The application serves as an electronic library on national diplomatic matters. It includes rich resources on various topics related to diplomacy.


## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Quartium/diplomatetn-reactnative.git
cd diplomatetn-reactnative
npm install
```

## Configuration

- Set up your OneSignal account and obtain the App ID. Update the OneSignal App ID in the application configuration file.
- Ensure that the Android SDK and/or Xcode are properly configured if you intend to build the app for Android/iOS.

## Running the Application

To start the application, navigate to the project directory and run:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

Please note that this application is still under active development, and while we strive to keep this README updated, the most current information might be in the source code itself.

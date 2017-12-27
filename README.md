# NUESTRA VISTA

Nuestra Vista is an mobile app enabling the creation of sharable provocative side­by­side comparisons of before and after the destruction caused by Hurricane Maria. These images of the urban environment and critical infrastructure not only allow individuals to effectively share and comment upon the current state, but also to reflect upon the efforts being made to restore facilities that are underway.

From the data generated, the application will create detailed mappings of the current status through a bottom up approach. These mappings and images can be utilized in arenas from news reportage and first response efforts through to directing longer term local and federal government interventions.

It is planned that the first uses of this application will be in Puerto Rico, and that through this use a more generalized application can be built to assist in areas struck by future disasters.

The application's capabilities can be broken down into multipled categories detailed below. Additionally, after a natural disaster, having a strong WiFi connection is not a given, and thus this application supports functionality for both the presence and absence of internet connection.

### Accessing a User's Camera
The user's camera allows others to see through the eyes of a disaster victim or relief worker. Accessing the native camera of a mobile device will be achieved through _cordova-plugin-camera_ whose documentation can be found at [apache's GitHub](https://github.com/apache/cordova-plugin-camera). Implementation code for the camera features of Nuestra Vista can be found in the files of the `/src/pages/create-modal` directory.

Images are all encoded as JPEGs. Also, in order to correct Android orientation quirks, `'correctOrientation'` in the camera settings JSON is set to a value of `true`. To see more settings or to manually adjust camera settings, alter the `setOptions()` function found in `/src/pages/create-modal/create-modal.ts`.

Upon successful capture of the image ...

### Using Geolocation and Google Street-View
Google Street-View presents an unparalleled opportunity to see images of urban and rural areas before disaster struck. In order to successfully make calls to the Street-View API, a user's location is first found using their device's native geolocation ability.

Similar to accessing a user's camera, geolocation of a mobile device will be achieved through _cordova-plugin-geolocation_ whose documentation can be found at [apache's GitHub](https://github.com/apache/cordova-plugin-geolocation). A user's location is established via their latitude and longitude coordinates. If this pair of coordinates does not represent a valid Street-View site, the nearest valid Street-View within a given radius will be chosen and displayed through utilization of Google Maps' StreetViewService class. Upon successful generation of valid Street-View coordinates, settings for Google Street-View are generated and passed to the Street-View API.

Implementation code for the geolocation and Street-View features of Nuestra Vista can be found in the files of the `/src/pages/street-view-modal` directory.

### Rendering Side-by-Side Images
Side-by-Side images have the highest chance of being provocative and thought-provoking. Combining the two previous sections, a user will be able to render a photo from their own camera roll next to a photo from Google Streetview before the disaster. This is achieved by ...

### Posting To a Public News Feed
A user will have the ability to post their created images to a public news feed to spread awareness of the disaster as well as relief efforts. The photo along with a caption will garner attention from peers, government officials, and news agencies. To achieve this ...

The news feed files are ...

## Online vs. Offline Protocol

As mentioned previously, this application has special functionality when a user does not have internet. The offline mode acts similarly to the online mode ... does google street view have downloadable content????!?!?!

## How to Run (Dev)

This requires cordova 5.0+ ( current stable 1.0.0 ).

`ionic cordova plugin add cordova-plugin-camera`
`ionic cordova plugin add cordova-plugin-geolocation`
`ionic cordova plugin add cordova-plugin-statusbar`

Adds details to config.xml (now not needed but for reference.)
`cordova plugin add cordova-plugin-camera --variable CAMERA_USAGE_DESCRIPTION="My App would like to access your camera, to take photos of your documents."`

For Ionic simulators, we have had the best luck with Ionic DevApp. After downloading the application, ensure that both your computer and phone are connected to the same network. Serve the application by opening terminal, navigating to the root directory of the Nuestra Vista project, and entering `ionic serve -c`. Following this, open Ionic DevApp on the testing device and wait for your application to appear on the screen.

To run the application on an ios device, open terminal, navigate to the root directory of the Neustra Vista project and run `ionic cordova build ios`. This will generate a plethora of files in the `/platforms/ios` directory. Open `/platforms/ios/MyApp.xcodeproj` in Xcode and build the project on the testing device. Using an ios simulator will not work due to its lack of camera.

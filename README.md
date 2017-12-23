# NUESTRA VISTA

Nuestra Vista is an mobile app enabling the creation of sharable provocative side­by­side comparisons of before and after the destruction caused by Hurricane Maria. These images of the urban environment and critical infrastructure not only allow individuals to effectively share and comment upon the current state, but also to reflect upon the efforts being made to restore facilities that are underway.

From the data generated, the application will create detailed mappings of the current status through a bottom up approach. These mappings and images can be utilized in arenas from news reportage and first response efforts through to directing longer term local and federal government interventions.

It is planned that the first uses of this application will be in Puerto Rico, and that through this use a more generalized application can be built to assist in areas struck by future disasters.

The application's capabilities can be broken down into multipled categories detailed below. Additionally, after a natural disaster, having a strong WiFi connection is not a given, and thus this application supports functionality for both the presence and absence of internet connection.

### Accessing a User's Camera
The user's camera allows others to see through the eyes of a disaster victim or relief worker. Accessing the camera of a mobile device will be achieved through Ionic's ability to use a mobile device's native features. expand ...

### Using Google Streetview API
Google Streetview present an unparalleled opportunity to see images of urban and rural areas before disaster struck. Using their API ...

### Rendering Side-by-Side Images
Side-by-Side images have the highest chance of being provactive and thought-provoking. Combining the two previous sections, a user will be able to render a photo from their own camera roll next to a photo from Google Streetview before the disaster. This is achieved by ...

### Posting To a Public News Feed
A user will have the ability to post their created images to a public news feed to spread awareness of the disaster as well as relief efforts. The photo along with a caption will garner attention from peers, government officials, and news agencies. To achieve this ...

The news feed files are ...

## Online vs. Offline Protocol

As mentioned previously, this application has special functionality when a user does not have internet. The offline mode acts similarly to the online mode ... does google street view have downloadable content????!?!?! 

### How to Run (Dev)

`ionic cordova plugin add cordova-plugin-camera`
`ionic cordova plugin add cordova-plugin-statusbar`

Adds details to config.xml (now not needed but for reference.)
`cordova plugin add cordova-plugin-camera --variable CAMERA_USAGE_DESCRIPTION="My App would like to access your camera, to take photos of your documents."`


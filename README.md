# IlliniLaundry - Amazon Alexa version
Tired of checking your smartphone for laundry status? Try out IlliniLaundry, now on Amazon Alexa!

Available on the Alexa Skills Store soon!

## Requirements
1. Node.js v4.3.2

## Setup
First install NVM to download v4.3.2 of node (Other versions are not supported by AWS lambda!)
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install v4.3.2
nvm alias default v4.3.2
nvm ls
```
For local testing please use alexa-app-server.
More documentation found [here](https://github.com/alexa-js/alexa-app-server).
```sh
# installs alexa-app-server along with its dependencies
git clone https://github.com/matt-kruse/alexa-app-server.git
cd alexa-app-server
npm install
# places illini laundry in the correct repo and installs dependencies
cd examples/apps
git clone https://github.com/illiniLaundry/illiniLaundry-alexa.git
cd illiniLaundry-alexa
npm install
```

## Running Locally
Now that we have alexa-app-server set up we can run the server and test out intents
simply and easily.
```sh
# change to the examples directory (replace with whatever path you have)
cd path/to/alexa-app-server/examples
node server
# Now you can navigate to your web browser at localhost:8080/alexa/illinilaundry
```

The web server also has schemas for intents and utterances that can be copied over if you want to deploy onto your own amazon account for testing with a real alexa device.

## Contributing
PR's are encouraged. Easiest way to contribute would be to expand **'dorm_map.js'** if
you encounter any awkward ways alexa attempts to recognize dorm names.

## Special Thanks
* Minhyuk Park
* Eric Lee

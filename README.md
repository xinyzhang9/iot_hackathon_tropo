# NodejsSpeechTranslateApp

The sample code is designed to illustrate the 2 methods supported in the Microsoft Translater API
1. calling /languages to get the list of supported languages for speech, text and text to speech
2. calling /speech/translate to get the recognition and translation of an audio file.  the audio file is in PCM 16bit, 16kHz mono WAV format (with header)

## Instructions
1. To get the package dependencies, first execute "npm install"
2. Edit app.js and enter your Azure Data Market ClientID and Client Secret
var azureDataMarketClientId = '[Azure Data Market client id]';
var azureDataMarketClientSecret = '[Azure Data Market client secret]';
3. Run by executing "node app.js"

If you want to change the audio file, simply change the line 
var file = 'helloworld.wav';

## Dependencies
request, stream-buffers, websocket

####Getting Started
-You will need to setup a subscription with Microsoft Translator. [Click Here] (https://www.microsoft.com/en-us/translator/default.aspx) to get started.

-Speech API documentation can be [found here.] (https://docs.microsofttranslator.com/)
This app posts translations to a webservice. You will need a website to post to, or change the app to post locally to the UIWebView.

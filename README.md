# Public Safety Hotline Service using Cisco Tropo API

We built a public hotline service using Cisco Tropo API, which records user's speech in any language, then we decoded and detect which language the user is speaking and parsed the caller information to corresponding translators, who will response to the user back shortly. This project was the first-place price winner of iot hackathon in may 10-12, Santa Clara, CA.  

## Features
1. Automatically record user voice and save the file to the tropo ftp server
2. Automatically fetch the file to our external server to detect the language
3. Parse the audio file(.wav) to multiple Microsoft speech service APIs and pick the one with highest confidence.
4. Parse the caller information to the translator which speaks that language


## Dependencies
"body-parser": "^1.15.1",
    "ejs": "^2.4.1",
    "express": "^4.13.4",
    "fs": "0.0.2",
    "ftp": "^0.3.10",
    "multer": "^1.1.0",
    "multiparty": "^4.1.2",
    "path": "^0.12.7",
    "request": "^2.69.0",
    "stream-buffers": "^3.0.0",
    "tropo-webapi": "^1.2.0",
    "websocket": "^1.0.22"


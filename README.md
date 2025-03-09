# celestus-tools
This is a companion rules site for [Celestus vTTRPG](https://github.com/egrosenberg/celestus). This site is 

# Usage
Celestus Tools will always be available at [celestus.info](https://celestus.info), but if you want to host your own version there are two options.
## Node.js (Recomended)
One option is hosting directly with Node. To do this you will need Node.js and npm installed on your machine.
1. Download the source code from github
2. Install all prerequisite packages using `npm i`
3. Run the application using `node index.js`

The server will be running on port 7777, you will be able to access by visiting `127.0.0.1:7777` in your web browser.
## Docker
Another way to host Celestus Tools is using Docker. For this you will need Docker installed on the system you intend to run on or some other container management solution.
1. Download the [latest docker image](https://github.com/egrosenberg/celestus-tools/pkgs/container/celestus-tools).
2. Launch the freshly downloaded image through Docker or whatever your container solution is.

This respository is set to automatically publish new images to microsoft Azure. If you would like to fork this repository and maintain that functionality, you will need to set your actions secret `AZURE_WEBAPP_PUBLISH_PROFILE ` to the content of your Azure Web App's publish profile.

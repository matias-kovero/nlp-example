## Table of contents

<!-- toc -->
- [Prerequisites](#prerequisites)
- [Running the example app](#running-the-example-app)
  * [Setup](#setup)  
- [Deploying the app](#deploying-the-app)
  * [Bluemix](#bluemix)
- [Preview](#preview)
<!-- tocstop -->  
  
## Prerequisites

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [yarn](https://yarnpkg.com/en/docs/install) or [npm](https://www.npmjs.com/get-npm)

## Running the example app

This example is a simple nlp app. With little effort, you can customize the app appearance and data sources.  
_Currently the first analyze takes longer as the proxy is connecting to the backend._

### Setup

1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install), as it is required build the components locally.

2. Clone the repository

   ```
   git clone https://github.com/matias-kovero/nlp-example.git
   ```

3. Navigate into the project and install project dependencies

   ```
   cd nlp-example && yarn
   ```

4. Create an environment file

   Copy the `.env` file in your root to `.env.local`, and populate the following values on `.env.local`:
   ```
   REACT_APP_COLLECTION_ID=REPLACE_ME  
   REACT_APP_COLLECTION_FIELD=REPLACE_ME  
   REACT_APP_NAME=REPLACE_ME   
   ```

   1. `REACT_APP_COLLECTION_ID` this will be used in your request to forward them to the right collection.
   2. `REACT_APP_COLLECTION_FIELD` this will be the payload field name that contains the data.
   3. `REACT_APP_NAME` just to personalize the app. This will appear on the navbar and the page title.  

5. Personalize the app
   - Replace the default image in `/src/logo.png` (`.png` and `.svg` are valid)
   - Update image path to match your image name in `/src/App.js`
      ```js
      import logo from './logo.png'; // ./imgname.imgtype
      ```
   - Update values in `/src/config.json` defaults are:
      ```yaml
      {
        "sentences": [
          "Feel free to add as many sentences as needed.",
          "If you get transparent "legends" you need to add more *legendColors*",
          "Give a try on *appColors*"
        ],
        "legendColors": [
          "#007bff",
          "#28a745",
          "#17a2b8",
          "#ffc107",
          "#dc3545",
          "#fd7e14",
          "#6610f2",
          "#e83e8c"
        ],
        "appColors": {
          "background": "#282c34",
          "textColor": "#FFFFFF",
          "navbarColor": "#343a40",
          "navbarDark": true,
          "formColors": "#343a40"
        }
      }
      ```
5. Build the React app:

   ```
   yarn run build
   ```

6. Setup the proxy

   Create `.server-env` file to your project root with the following values:
     ```
     BASE_URL=REPLACE_ME
     TOKEN=REPLACE_ME
     ```
     - `BASE_URL` is the protocol + host + port of the location that CP4D UI is hosted (ex. `https://my-cluster-name.com:443`)
     - `TOKEN` is the Authorization token used to authorize api requests.

7. Start the example app:

   ```
   yarn run start
   ```

8. Go to [localhost:3000](localhost:3000) in your browser. If everything is working, you should see something like this:

   ![Example app](./docs/example-app.png)


## Deploying the app

### Bluemix
Before you begin, [download and install the IBM Cloud CLI.](https://cloud.ibm.com/docs/cli?topic=cli-getting-started)
1. Create `manifest.yml` on root:
    ```YAML
    ---
    applications:
    - name: your_application_name
      memory: 512M
      disk_quota: 512M
      buildpacks: 
        - nodejs_buildpack
      command: node server.js
    ```
    _More info about manifest.yml [here.](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest-attributes.html)_  

2. If you are already logged in with IBM Cloud CLI, skip to section 4, else login with:
    ```
    ibmcloud login --sso
    ```
3. Target Cloud Foundry  
    ```
    ibmcloud target --cf
    ```
4. Push and deploy the application
    ```
    ibmcloud cf push
    ```
5. Access your app by browsing to the app URL.  

## Preview

  1. Use filters by clicking the legends.
  ![Example filter](./docs/example-filter.gif)

const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your Client ID
const API_KEY = 'YOUR_API_KEY'; // Replace with your API Key
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// Load the Google API client library and OAuth2 library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        const loginButton = document.getElementById('login-button');
        
        // Check if the user is already signed in
        if (authInstance.isSignedIn.get()) {
            handleAuthSuccess();
        }

        loginButton.onclick = () => {
            authInstance.signIn().then(() => {
                handleAuthSuccess();
            });
        };
    });
}

function handleAuthSuccess() {
    const authInstance = gapi.auth2.getAuthInstance();
    const user = authInstance.currentUser.get();
    const profile = user.getBasicProfile();
    
    // Display user information
    document.getElementById('content').innerHTML = `
        <p>Welcome, ${profile.getName()}!</p>
        <p>Email: ${profile.getEmail()}</p>
        <p>ID: ${profile.getId()}</p>
    `;
}

gapi.load('client:auth2', handleClientLoad);

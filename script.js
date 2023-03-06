// Client ID and API key from the Developer Console
var CLIENT_ID = '999389648013-fh4is3jl8d44o7q9rmcmt6j8v9iadim9.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDWGM6G6i4QQWuK3HzXaMGmW5Y49_JT6so';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// ID of the Google Sheets spreadsheet
var SPREADSHEET_ID = '1tLqnG09-1tPAvWKLz_l2liyfgcRtLHNlNnWuoWip434';

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, function(error) {
    console.log(JSON.stringify(error, null, 2));
  });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // Add the form data to Google Sheets
    addDataToSheets();
  } else {
    // Sign out
    gapi.auth2.getAuthInstance().signOut();
  }
}

/**
*  Adds the form data to Google Sheets
*/
function addDataToSheets() {
    var name = $('#name').val();
    var mobile = $('#mobile').val();
    
    gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A1:B1',
    valueInputOption: 'USER_ENTERED',
    resource: {
    values: [[name, mobile]]
    }
    }).then(function(response) {
    console.log(response);
    console.log('Data added to Google Sheets!');
    alert('Data added to Google Sheets!');
    }, function(error) {
    console.log(JSON.stringify(error, null, 2));
    console.log('Error adding data to Google Sheets!');
    alert('Error adding data to Google Sheets!');
    });
}


    

<?php
$credentials_file = '"client_secret_999389648013-5al225rnq9n5iqf47h1ur9n4s27tajkh.apps.googleusercontent.com.json"';

$spreadsheet_id = '1tLqnG09-1tPAvWKLz_l2liyfgcRtLHNlNnWuoWip434';

$table_name = 'user_data';

// Get the form data
$name = $_POST['name'];
$mobile_number = $_POST['mobile_number'];

// Connect to the MySQL database
$mysqli = new mysqli('localhost', 'root', '', 'googlesheets');
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

// Insert the form data into the MySQL database
$query = "INSERT INTO $table_name (name, mobile_number) VALUES ('$name', '$mobile_number')";
if ($mysqli->query($query) === TRUE) {
    echo "New record created successfully in MySQL database<br>";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error;
}

// Connect to the Google Sheets API
require __DIR__ . '/vendor/autoload.php';
$client = new Google_Client();
$client->setApplicationName('Google Sheets Database');
$client->setScopes(Google_Service_Sheets::SPREADSHEETS);
$client->setAuthConfig($credentials_file);
$client->setAccessType('offline');
$service = new Google_Service_Sheets($client);

// Add the form data to the Google Sheet
$values = [
    [$name, $mobile_number]
];
$body = new Google_Service_Sheets_ValueRange([
    'values' => $values
]);
$params = [
    'valueInputOption' => 'USER_ENTERED'
];
$range = 'Sheet1!A2:B';
$result = $service->spreadsheets_values->append($spreadsheet_id, $range, $body, $params);
printf("New record created successfully in Google Sheet (Sheet1!A%d:B%d)<br>", $result->updates->updatedRange->getStartRowIndex(), $result->updates->updatedRange->getEndRowIndex());
?>
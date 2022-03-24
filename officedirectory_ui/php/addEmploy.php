<?php

$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);
$output;

if (mysqli_connect_errno()) {

    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}


$location;
$upload_status = 1;
if (isset($_FILES['file'])) {
    $filename = $_FILES['file']['name'];

    /* Location */
    $location = "upload/" . $filename;
    $imageFileType = pathinfo($location, PATHINFO_EXTENSION);

    $valid_extensions = array("jpg", "jpeg", "png");
    if (!in_array(strtolower($imageFileType), $valid_extensions)) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "image extention format not match";
        $output['data'] = [];

        mysqli_close($conn);
        echo json_encode($output);
        exit;
    }

    $upload_status = move_uploaded_file($_FILES['file']['tmp_name'], '../' . $location);
} else {
    $location = "upload/user.png";
}

/* Upload file */
if ($upload_status) {
    $location = './' . $location;
    $query = 'INSERT INTO personnel(firstName, lastName, jobTitle, email, departmentID, photo, jobExp, salary, dateOfJoining, manageBy,records) VALUES (' . "'$_POST[firstName]'" . ',' . "'$_POST[lastName]'" . ',' . "'$_POST[jobTitle]'" . ',' . "'$_POST[email]'" . ',' . "'$_POST[department]'" . ',' . "'$location'" . ',' . "'$_POST[jobExp]'" . ',' . "'$_POST[salary]'" . ',' . "'$_POST[dateOfJoining]'" . ',' . "'$_POST[manageBy]'" . ",'{}'" . ')';

    $result = $conn->query($query);

    if (!$result) {

        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query failed";
        $output['data'] = [[$query], [$result]];

        mysqli_close($conn);
        echo json_encode($output);
        exit;
    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
} else {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "image upload failed";
    $output['data'] = [];
}
mysqli_close($conn);
echo json_encode($output);

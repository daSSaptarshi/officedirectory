<?php

$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

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


// store previous department and dateofjoining
$query = 'SELECT `departmentID`, `dateOfJoining` FROM `personnel` WHERE `id`=' . "'$_GET[id]'";
$result = $conn->query($query);
if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = $result;
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}
$row = mysqli_fetch_assoc($result);
$pre_id = $row['departmentID'];
$pre_date = $row['dateOfJoining'];

// update all records of the employ
$current_deptId = $_GET['department'];
$query = 'UPDATE personnel SET firstName=' . "'$_GET[firstName]'" . ',lastName=' . "'$_GET[lastName]'" . ',jobTitle=' . "'$_GET[jobTitle]'" . ',email=' . "'$_GET[email]'" . ',departmentID=' . "'$current_deptId'" . ',jobExp=' . "'$_GET[jobExp]'" . ',`salary`=' . "'$_GET[salary]'" . ',`dateOfJoining`=' . "'$_GET[dateOfJoining]'" . ',`manageBy`=' . "'$_GET[manageBy]'" . ' WHERE `id`=' . "'$_GET[id]'";

$result = $conn->query($query);

if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = $result;

    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

if ($pre_id != $current_deptId) {

    // update department records 
    $query = 'SELECT `records` FROM `personnel` WHERE `id`=' . "'$_GET[id]'";
    $result = $conn->query($query);
    $arr = array(
        'id' => $pre_id,
        'date' => $pre_date
    );

    // preapir updated json
    $user = array();
    $row = json_decode(mysqli_fetch_assoc($result)['records'], true);
    foreach ($row as $value) {
        array_push($user, $value);
    }
    array_push($user, $arr);
    $r = json_encode($user);

    $query = 'UPDATE `personnel` SET `records`= ' . "'$r'" . ' WHERE id=' . "'$_GET[id]'";
    $result = $conn->query($query);

    if (!$result) {
        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "department record update failed";
        $output['data'] = $result;

        mysqli_close($conn);
        echo json_encode($output);
        exit;
    }
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $result;

mysqli_close($conn);

echo json_encode($output);

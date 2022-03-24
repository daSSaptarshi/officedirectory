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

$query = 'SELECT p.id, p.lastName, p.firstName, p.photo, p.jobTitle, p.email, d.name as department, l.name as location FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) WHERE ';
$pre = false;
if (isset($_GET['dept'])) {
    $pre = true;
    $query .= '(';
    $data = json_decode(stripslashes($_GET['dept']));
    for ($i = 0; $i < count($data); $i++) {
        if ($i != 0) {
            $query .= ' OR ';
        }
        $query .= 'p.departmentID LIKE ' . $data[$i];
    }
    $query .= ') ';
}

if (isset($_GET['expreence'])) {
    if ($pre == true) {
        $query .= ' AND ';
    }
    $pre = true;
    $query .= '(';
    $data = json_decode(stripslashes($_GET['expreence']));
    for ($i = 0; $i < count($data); $i++) {
        if ($i != 0) {
            $query .= ' OR ';
        }
        $query .= 'p.jobExp LIKE ' . $data[$i];
    }
    $query .= ') ';
}

if (isset($_GET['name'])) {
    if ($pre == true) {
        $query .= ' AND ';
    }
    $pre = true;
    $name = json_decode(stripslashes($_GET['name']));
    $query .= '(p.lastName LIKE "%' . $name . '%" OR p.firstName LIKE "%' . $name . '%") ';
}

if (isset($_GET['location'])) {
    if ($pre == true) {
        $query .= ' AND ';
    }
    $pre = true;
    $name = json_decode(stripslashes($_GET['location']));
    $query .= '(l.name LIKE "%' . $name . '%") ';
}
if ($pre == true) {
    $query .= 'AND  p.jobStatus LIKE "active" ORDER BY p.id, p.lastName, p.firstName, d.name, l.name';
} else {
    $query .= 'p.jobStatus LIKE "active" ORDER BY p.id, p.lastName, p.firstName, d.name, l.name';
}

$result = $conn->query($query);

if (!$result) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {

    array_push($data, $row);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;

mysqli_close($conn);

echo json_encode($output);

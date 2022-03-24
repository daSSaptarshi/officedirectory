function check_valid_array(arr) {
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == null || arr[i] == undefined || arr[i] == '' || arr[i] == 'null') {
            return false
        }
    }
    return true
}

function check_valid(arr, field) {
    let t = true;
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == null || arr[i] == undefined || arr[i] == '' || arr[i] == 'null') {
            $((field[i] + '_label')).show();
            t = false;
        } else {
            $((field[i] + '_label')).hide();
        }
    }
    return t
}

function check_date(input_date) {
    let b = input_date.split('-');
    let d = new Date(b[0] + '/' + b[1] + '/' + b[2]);
    return !!(d && (d.getMonth() + 1) == b[1] && d.getDate() == Number(b[2]));
}

function create_employ_id(id) {
    let str='';
    for (let i = 0; i < (6 - id.length); i++){
        str += '0';
    }
    
    return (str + id);
}
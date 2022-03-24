let profile = {}, activeId = 1, department, location_arr, employ_id_arr = [], toggel_stack = [], form_field = ['#first_name', '#last_name', '#email', '#department', '#job_title', '#jobExp', '#salary', '#manage_by', '#date', '#manage_by'];
const url = "http://localhost:8080"

$(document).ready(
    function () {
        get_all_employId();
        get_all_employ()
        add_filter();
        store_location();
    }
)

$('#dashboard').click(function () {
    $('#panel2').hide();
    $('#panel2_bar').fadeOut();
    $('#panel2_bar').hide();
    $('#panel1').show();
    $('#panel1_bar').fadeIn();
    $('#panel1_bar').show();
    $("#add_record").removeClass("active");
    $("#dashboard").addClass("active");
})
$('#add_record').click(function () {
    $('#panel1').hide();
    $('#panel1_bar').fadeOut();
    $('#panel1_bar').hide();
    $('#panel2').show();
    $('#panel2_bar').fadeIn();
    $('#panel2_bar').show();
    $("#dashboard").removeClass("active");
    $("#add_record").addClass("active");
})

// store all employ id
function get_all_employId() {
    $.ajax({
        type: "GET",
        url: url+"/getAllPersonnelId",
        success: function (res) {
            employ_id_arr = employ_id_arr.concat(res);
            console.log(employ_id_arr)
            $( "#manage_by" ).autocomplete({
                source: employ_id_arr
            });
        }
    });
}

// fetch all employ details
// call whene page load
function get_all_employ() {
    $.ajax({
        type: "GET",
        url: url+"/getAllPersonnel",
        success: function (res) {
            $('#employ_count').fadeOut()
            .fadeIn()
            .html(`${res.length} records found`);
            $('#user_cards').empty()
            res.forEach(element => {
                let re = userCard(element);
                if (re != null) {
                    let template = `<div class="col-lg-4 col-md-4 col-sm-4 col-4 sm-p-0" id="${'profile_card' + element['id']}">` + re + `</div>`;
                    $(template).hide().appendTo('#user_cards').fadeIn();
                }
            });
        },
        error: function (res) {
            console.log(res);
        }
    });
}

// add filter
function add_filter() {
    $.ajax({
        type: "GET",
        url: url+"/getAllDeparment",
        success: function (res) {
            department = res;

            let html = filter_templete('Department', res),se=`<option value=${null}>Select Department </option>`;
            $('#filter_card').append(html);

            department.forEach(element => {
                se += `<option value=${element.id}>${element.name}</option>`;
            });
            $('#department').empty();
            $('#department').append(se);
        }
    });
}

// store location
function store_location() {
    $.ajax({
        type: "GET",
        url: url+"/getAllLocation",
        success: function (res) {
            location_arr = res;
        }
    });
}
//edit employ details
async function edit_employ_details(event) {
    let eId = event.getAttribute("data-id");
    profile = await get_employ_by_id(eId);
    $("#modal_body").html(modal(profile,department,location_arr))
    $("#modalForm").modal("show")
    
    $( "#input_manageBy" ).autocomplete({
        source: employ_id_arr
    });
}

// get user details
async function get_employ_by_id(id) {
    let re;
    await $.ajax({
        type: "GET",
        url: url+"/getPersonnel/"+id,
        success: function (res) {
            re=res;
        }
    });
    return re
}

// delete employ
async function delete_employ_by_id(event) {
    if (!(confirm("Are you confirm?"))) { return}
    let eId = event.getAttribute("data-id");
    await $.ajax({
        type: "DELETE",
        url: url+"/deletePersonel/"+eId,
        cache : false,
        success: function (res) {
            location.reload();
            if (res['status']['code'] == '200') {
                alert('delete successful');
                $("#user_cards").remove("#profile_card" + eId);
                if (String(eId) == String(activeId)) 
                {
                    $('#employ_details_container').html('')
                }
            }
        }
    });
}

async function show_employ_details(event) {
    activeId = event.getAttribute("data-id");
    let id = activeId;
    let res = await get_employ_by_id(id);
    if ($(window).width() < 1050) {
        let result = mini_card(res, department);
        $(`#employ_mini_card${id}`).html(result)
        $(`#mini_card_body${id}`).slideToggle("slow", function () {});
        $(`#employ_mini_card${id}`).slideToggle("slow", function () { });
        toggel_stack.push(id);
    } else {
        $('#employ_details_container').html(employ_card(res,department))
    }
}

function restore_card(event) {
    let id = event.getAttribute("data-id");
    toggel_stack = toggel_stack.filter(item => item != id);
    $(`#mini_card_body${id}`).slideToggle("slow", function () {});
    $(`#employ_mini_card${id}`).slideToggle("slow", function () {});
}

//update details
function update_details() {
    let firstName = $.trim($('#input_first_name').val()),
        lastName = $.trim($('#input_last_name').val()),
        email = $.trim($('#input_email').val()),
        department = $.trim($('#input_department').val()),
        jobExp = $.trim($('#input_job_exp').val()),
        jobTitle = $.trim($('#input_job_title').val()),
        salary = $.trim($('#input_salary').val()),
        manageBy = $.trim($('#input_manageBy').val()),
        dateOfJoining = $.trim($('#input_date').val());
    
    if (!is_employ(manageBy)) {
        alert('Not a valid employ Id.\nPlease change employ Id');
        return;
    }
    manageBy=String(parseInt(manageBy))
    $.ajax({
        type: "get",
        url: './php/updateEmploydetails.php',
        data: 'firstName=' + firstName + '&lastName=' + lastName + '&email=' + email + '&department='+ department +  '&jobTitle='+ jobTitle + '&jobExp=' + jobExp + '&salary=' + salary + '&manageBy=' + manageBy + '&dateOfJoining=' + dateOfJoining+ '&id=' + profile['id'],
        success: function (res) {
            if (res['status']['code'] == '200') {
                update_dom_card()
            }
        }
    });
    
    $("#modalForm").modal("hide")
}
async function update_dom_card() {
    let res = await get_employ_by_id(profile['id']);
    if (String(profile['id']) == String(activeId)) {
        $('#employ_details_container').html(employ_card(res,department))
    }
    let re = userCard(res);
    if (re != null) {
        $('#profile_card' + profile['id']).html(re)
    }
}

// check valid employ id
function is_employ(eId) {
    for (let i = 0; i < employ_id_arr.length; i++){
        if (parseInt(employ_id_arr[i]) == eId) {
            return true;
        }
    }
    return false;
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// add emply
function add_employ() {
    
    let firstName = $.trim($('#first_name').val()),
        lastName = $.trim($('#last_name').val()),
        email = $.trim($('#email').val()),
        department = $.trim($('#department').val()),
        jobTitle = $.trim($('#job_title').val()),
        jobExp = $.trim($('#jobExp').val()),
        salary = $.trim($('#salary').val()),
        manageBy = parseInt($.trim($('#manage_by').val())),
        dateOfJoining = $.trim($('#date').val());
    if (!check_valid([firstName, lastName, email, department, jobTitle, jobExp, salary, manageBy], form_field)) {
        alert("Please fill-up form");
        return;
    } 
    if (!check_date(dateOfJoining)) {
        alert('Not a valid date');
        return;
    }
    // if (!is_employ(manageBy)) {
    //     alert('Not a valid employ Id.\nPlease change employ Id in "Manage By" section');
    //     $(('#manage_by_label')).show();
    //     return;
    // } else {
    //     $(('#manage_by_label')).hide();
    // }
    
    if (!(confirm("Are you confirm?"))) { return}


    let payload = {};
    payload["firstName"] = firstName;
    payload["lastName"] = lastName;
    payload["email"] = email;
    payload["departmentId"] = department;
    payload["jobTitle"] = jobTitle;
    payload["jobExp"] = jobExp;
    payload["salary"] = salary;
    payload["manageBy"] = manageBy;
    payload["dateOfJoining"] = dateOfJoining;
    payload["jobStatus"] =  "active";
    // payload["photo"] = $('#employ_image')[0].path;

        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/addPersonnel',
            data: JSON.stringify(payload),
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res['status']['code'] == '200') {
                    alert('Add successfully')
                    $("#panel2_form").trigger("reset");
                } else {
                    alert('Something went wrong')
                }
            },
            error: function (error) {
                alert('Something went wrong')
            }
        });
}


// filter data
function filter_data() {

    // get input data
    let dept = [], exprence = [],
        name = $.trim($('#search_name').val()),
        location = $.trim($('#search_location').val()), res = {};
    $("input:checkbox[name=Department]:checked").each(function () {
        dept.push($(this).val());
    });
    $("input:checkbox[name=Exprence]:checked").each(function () {
        let temp = String(($(this).val())).split('')
        temp.forEach(element => {
            exprence.push(element);
        });
    });
    exprence = [... new Set(exprence)]
    
    // filter out and make dict
    if (dept.length != 0) {
        res['dept'] = JSON.stringify(dept);
    }
    if (exprence.length != 0) {
        res['expreence'] = JSON.stringify(exprence);
    }
    if (name != null && name != '') {
        res['name'] = JSON.stringify(name);
    }
    if (location != null && location != '') {
        res['location'] = JSON.stringify(location);
    }

    //call script
    $.ajax({
        type: "get",
        url: './php/filter.php',
        data: { ...res },
        success: function (res) {
            $('#employ_count').fadeOut()
            .fadeIn()
            .html(`${res.data.length} records found`);
            $('#user_cards').empty()    
            res.data.forEach(element => {
                let re = userCard(element);
                if (re != null) {
                    let template = `<div class="col-lg-4 col-md-4 col-sm-4 col-4 sm-p-0" id="${'profile_card' + element['id']}">` + re + `</div>`;
                    $('#user_cards').append(template)
                }
            });
        }
    });
}

// get location when input department change
$('#department').change(function () {
    let search_id=$('#department').val()
    set_location_to_input(search_id);
})

// set location value
function set_location_to_input(search_id) {
    department.forEach(element => {
        if (element.id == search_id) {
            location_arr.forEach(loc => {
                if (loc.id == element.locationId) {
                    $('#job_location').val(loc.name) ;
                }
            });
        }
    });
}

$(window).resize(function () {
    if ($(window).width() > 1050) {
        while (toggel_stack.length > 0) {
            let id = toggel_stack.pop();
            $(`#mini_card_body${id}`).slideToggle("slow", function () { });
            $(`#employ_mini_card${id}`).slideToggle("slow", function () { });
        }
    }
})

function refresh_filter() {
    get_all_employ();
    $("input:checkbox[name=Exprence]:checked").each(function () {
        $(this).prop("checked", false)
    });
    $("input:checkbox[name=Department]:checked").each(function () {
        $(this).prop("checked", false)
    });
    $('#search_name').val('')
    $('#search_location').val('')
}

function cancel_add() {
    if (!(confirm("Are you confirm?"))) { return}
    $("#panel2_form").trigger("reset");
    $('#dashboard').click();
    form_field.forEach(element => {
        $((element + '_label')).hide();
    });
}
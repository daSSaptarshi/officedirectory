function modal({ firstName, lastName, email, department, jobTitle, jobExp, salary, manageBy, dateOfJoining, departmentID }, department_code,location_code) {
  let html = `
    <form class="text-center p-2">
      <div class="form-row mb-4">
        <div class="col">
          <input type="text" id="input_first_name" class="form-control" placeholder="First name" value=${firstName}>
        </div>
        <div class="col">
          <input type="text" id="input_last_name" class="form-control" placeholder="First name" value=${lastName}>
        </div>
      </div>
      <input type="email" id="input_email" class="form-control mb-4" placeholder="E-mail" value=${email}>
      <select id="input_department" class="form-control mb-4">`;
  
  department_code.forEach(element => {
    if (element.id == departmentID) {
          html+=`<option value=${element.id} selected>${element.name}</option>`
    } else {
      html += `<option value=${element.id}>${element.name}</option>`;
        }
  });

  html += `</select>
      <div class="form-row mb-4">
        <div class="col">
          <input type="text" id="input_job_title" class="form-control" placeholder="Job Title" value=${jobTitle}>
        </div>
        <div class="col">
          <input type="text" id="input_job_exp" class="form-control" placeholder="Job Exprenece" value=${jobExp}>
        </div>
      </div>
      <input type="text" id="input_salary" class="form-control mb-4" placeholder="Salary" value=${salary} >
      <input type="text" id="input_manageBy" class="form-control mb-4" placeholder="Manage By" value=${create_employ_id(manageBy)} >
      <input type="text" id="input_date" class="form-control mb-4" placeholder="Date Of Joining" value=${dateOfJoining} >
      <button type="button" class="btn btn-primary my-4 btn-block" onClick="update_details()" style="border-radius: 2px;">Update</button>
    </form>`;
    return html;
}
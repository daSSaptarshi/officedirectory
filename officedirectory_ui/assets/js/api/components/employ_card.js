function employ_card({ id, firstName, lastName, email, department, jobTitle, location, jobExp, salary, manageBy, dateOfJoining, photo, records },department_list) {
  let re = JSON.parse(records);
    let html = `
    <div class="card-container">
      <div class="card-header d-flex">
        <div class="row col-lg-12">
          <div class="card-icon mr-3" style="padding-top: 0.3rem;width: 2.55rem;">
            <div class="avatar mx-auto white">
              <img src="${photo}"
                alt="avatar mx-auto white" class="rounded-circle img-fluid">
            </div>
          </div>
          <div class="px-0">
            <small class="card-title p-0 m-0">${firstName + ' ' + lastName}</small>
            <p class="card-title" style="line-height: .5rem;">
              <small>
                <strong>${jobTitle}</strong>
              </small>
            </p>
          </div>
        </div>
      </div>
      <div class="card-body card-p-0" style="padding-left: 15px; padding-top: 0;">
        <ul class="m-0 p-0">
          <li style="margin-bottom:5px;">
            <small style="display:flex">
              <strong style="padding-right:0.4rem">Employee Id</strong> ${create_employ_id(id)}
            </small>
          </li>
          <li>
            <small style="display:flex">
              <i class="material-icons" style="font-size:1.2rem;margin-right: 0.5rem;">email</i> ${email}
            </small>
          </li>
          <li>
            <small style="display:flex">
              <i class="material-icons" style="font-size:1.2rem;margin-right: 0.5rem;">work</i> ${department}
            </small>
          </li>
          <li>
            <small style="display:flex">
              <i class="material-icons" style="font-size:1.2rem;margin-right: 0.5rem;">location_on</i> ${location}
            </small>
          </li>
          <li>
            <small style="display:flex">
              <i class="material-icons" style="font-size:1.2rem;margin-right: 0.5rem;">business_center</i> ${jobExp} expreence
            </small>
          </li>
          <li>
            <small>
              <strong style="padding-right:0.4rem">Salary </strong> ${salary}
            </small>
          </li>
          <li>
            <small>
              <strong style="padding-right:0.4rem">ManageBy </strong>  ${create_employ_id(manageBy)}
            </small>
          </li>
          <li>
            <small>
              <strong style="padding-right:0.4rem">Joining at </strong>  ${dateOfJoining}
            </small>
          </li>`;
  
  if (re.length != 0 && re.length != undefined) {
    html += `<li>
        <small>
          <strong>
            Previous departments
          </strong>
          <ul style="padding-left: 10px;">`
    
    for (let i = 0; i < re.length; i++) {

      const element = re[re.length - 1 - i];
      html += `
          <li>${i + 1}.
          <ul style="padding-left: 10px;">`;
      
      for (let index = 0; index < department_list.length; index++) {
        if (department_list[index]['id'] == element['id']) {
          html += `
            <li>
              <strong style="padding-right:0.4rem">Name </strong>  ${department_list[index]['name']}
            </li>`;
          break;
        }
      }
      html += `
            <li>
              <strong style="padding-right:0.4rem">Id </strong>  ${element['id']}
            </li>
            <li>
              <strong style="padding-right:0.4rem">Date </strong>  ${element['date']}
            </li>
          </ul>
        </li>`
    };
    
    html+=`</ul>
        </small>
      </li>`
  }
  
  html += `
      </ul>
    </div>
    </div>`;
  
    return html;
}
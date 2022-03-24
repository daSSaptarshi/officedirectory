function mini_card({ id, email, department, location, jobExp, salary, manageBy, dateOfJoining, records }, department_list) {
    let re = JSON.parse(records);
      let html = `
        <div class="card-body card-p-0" style="padding-left: 10%; padding-top: 0;" data-id="${id}" onClick="restore_card(this)">
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
      </div>`;
    
      return html;
  }
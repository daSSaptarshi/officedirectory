function userCard({ id, firstName, lastName, email, department, jobTitle, location, photo }) {
  // if (!check_valid_array([firstName, lastName, email, department, jobTitle, location])) { return null }
/* <small>
                <button type="button" class="btn btn-link" style="padding: 0.46875rem 1rem;" data-id="${id}" onClick="edit_employ_details(this)">
                  <i class="material-icons">edit</i>
                </button>
              </small> */
    let html = `
      <div class="card ">
        <div class="card-container">
          <div class="card-header d-flex">
            <div class="row col-lg-10 col-md-10 col-sm-10 col-10">

              <div class="px-0">
                <small class="card-title p-0 m-0">${firstName + ' ' + lastName}</small>
                <p class="card-title" style="line-height: .5rem;">
                  <small>
                    <strong>${jobTitle}</strong>
                  </small>
                </p>
              </div>
            </div>
            <div class="d-flex col-lg-2 col-md-2 col-sm-2 col-2">
              
              <small>
                <button type="button" class="btn btn-link" style="padding: 0.46875rem 1rem;" data-id="${id}" onClick="delete_employ_by_id(this)">
                  <i class="material-icons">delete</i>
                </button>
              </small>
            </div>
          </div>
          <div class="card-body" style="padding-left: 0; padding-top: 0;cursor:pointer" id="mini_card_body${id}" data-id="${id}" onClick="show_employ_details(this)">
            <div class="col-lg-12">
              <small>
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <td class="text-muted">Email</td>
                      <td><strong>${email}</strong></td>
                    </tr>
                    <tr>
                      <td class="text-muted">Department</td>
                      <td><strong>${department}</strong></td>
                    </tr>
                    <tr>
                      <td class="text-muted">Location</td>
                      <td><strong>${location}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </small>
            </div>
          </div>
          <div id="employ_mini_card${id}" style="display:none"></div>
        </div>
      </div>`;

    return html;
}


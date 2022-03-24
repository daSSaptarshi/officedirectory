function filter_templete(tag, data) {
  let html = `                  
    <div class="col-md-6 col-sm-6 col-6">
    <small><strong>${tag}</strong></small>
    <small>
      <table class="table table-sm table-borderless">
        <tbody>`;
  data.forEach(element => {
    html += `
      <tr>
        <td>
          <small>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input type="checkbox" class="custom-control-input" id="${tag + element.id}" value=${element.id} name=${tag}>
              <label class="custom-control-label" for="${tag + element.id}"><small>${element.name}</small></label>
            </div>
          </small>
        </td>
      </tr>`;
  });
  html += `
      </tbody>
    </table>
    </small>
    </div>`;
  
  return html;
}

const showItinerant = () => {
  let section = document.getElementById('itinerant');
    
  section.innerHTML = `
    <form id="itinerant-mileage">
    <div class="form-group form-row justify-content-center">
      <div class="col-sm-2 col-md-1">
        <input type="date" class="form-control">
      </div>
      <div class="col-sm-3 col-md-3">
        <input type="text" class="form-control" id="origin-0" placeholder="Origin: (Street Address, City, State, Zip)">
      </div>
      <div class="col-sm-3 col-md-3">
        <input type="text" class="form-control" id="destination-0" placeholder="Destination: (Street Address, City, State, Zip)">
      </div>
      <div class="col-sm-2 col-md-1">
        <input type="text" class="form-control" id="personal-0" placeholder="Personal Miles">
      </div>
      <div class="col-sm-2 col-md-1">
        <input type="text" class="form-control" id="calculated-0" placeholder="Calculated Miles" disabled>
      </div>
    </div>
    </form>
    <div class="form-group form-row justify-content-center">
      <a href='#'><i class="fa fa-plus add-row" style="color: blue;"></i></a>
      <a href='#'><i class="fa fa-minus delete-row" style="color: red;"></i></a>
    </div>
    <div class="form-group form-row justify-content-center">
      <button type="button" class="btn btn-outline-success">Calculate Mileage</button>
      <button type="button" class="btn btn-outline-danger">Clear All</button>
    </div>`;
  }

const addMileageRow = function(e) {
  if(e.target.classList.contains('add-row')) {
    const div = document.createElement('div');
    div.className = 'form-group form-row justify-content-center';

    div.innerHTML = `
        <div class="col-sm-2 col-md-1">
            <input type="date" class="form-control">
        </div>
        <div class="col-sm-3 col-md-3">
            <input type="text" class="form-control" placeholder="Origin: (Street Address, City, State, Zip)">
        </div>
        <div class="col-sm-3 col-md-3">
            <input type="text" class="form-control" placeholder="Destination: (Street Address, City, State, Zip)">
        </div>
        <div class="col-sm-2 col-md-1">
            <input type="text" class="form-control" placeholder="Personal Miles">
        </div>
        <div class="col-sm-2 col-md-1">
            <input type="text" class="form-control" placeholder="Calculated Miles" disabled>
        </div>`;

    document.querySelector('#itinerant-mileage').insertAdjacentElement('beforeend', div);
  }
}

const deleteMileageRow = function(e) {
  if(e.target.classList.contains('delete-row')) {
    const selection = document.querySelector('#itinerant-mileage');
    selection.removeChild(selection.lastChild);
  }
}
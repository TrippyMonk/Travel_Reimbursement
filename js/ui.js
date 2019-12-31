const http = new HttpRequests;

const showItinerant = () => {
  let form = document.getElementById('itinerant-mileage');
    
  form.innerHTML = `
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
    </div>`;
  }

const addMileageRow = () => {
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

const deleteMileageRow = () => {
    const selection = document.querySelector('#itinerant-mileage');
    selection.removeChild(selection.lastChild);
}

const calculateMileage = async () => {
    const originString = document.getElementById('origin-0').value.split(',');
    const destinationString = document.getElementById('destination-0').value.split(',');

    const originAdminDistrict = originString[2];
    const originLocality = originString[1];
    const originPostalCode = originString[3];
    const originAddressLine = originString[0];
    const destinationAdminDistrict = destinationString[2];
    const destinationLocality = destinationString[1];
    const destinationPostalCode = destinationString[3];
    const destinationAddressLine = destinationString[0];

    
    const origin = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=${originAdminDistrict}&locality=${originLocality}&postalCode=${originPostalCode}&addressLine=${originAddressLine}&key=AqKA56HQW8gWImgy0cCgJJVjLOWQrNjs_rjHOXjsnd_50HMFnyhRc6ofiFdY6wvP`);
    const originResponse = await origin.json();

    const originWP1 = originResponse.resourceSets[0].resources[0].point.coordinates[0];
    const originWP2 = originResponse.resourceSets[0].resources[0].point.coordinates[1];

    const destination = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=${destinationAdminDistrict}&locality=${destinationLocality}&postalCode=${destinationPostalCode}&addressLine=${destinationAddressLine}&key=AqKA56HQW8gWImgy0cCgJJVjLOWQrNjs_rjHOXjsnd_50HMFnyhRc6ofiFdY6wvP`);
    const destinationResponse = await destination.json();

    const destinationWP1 = destinationResponse.resourceSets[0].resources[0].point.coordinates[0];
    const destinationWP2 = destinationResponse.resourceSets[0].resources[0].point.coordinates[1];
  
    console.log(originWP1, originWP2, destinationWP1, destinationWP2);
}
//Show Different Travel Options
const showItinerant = () => {
  let section = document.getElementById('itinerant');
  if(section.classList.contains('d-none')) {
    section.classList.replace('d-none','d-block');
  } else {
    section.classList.replace('d-block', 'd-none');
  }
}

const showSingleDay = () => {
  let section = document.getElementById('single-day');
  if(section.classList.contains('d-none')) {
    section.classList.replace('d-none','d-block');
  } else {
    section.classList.replace('d-block', 'd-none');
  }
}

//Mileage Interactivity
const addMileageRow = () => {
  //Get mileage form, grab the last div element visible, get the ID attribute, and return the number to the right of Row-
  const prevRow = document.querySelector('.mileage-form').lastElementChild.getAttribute('id').split('-')[1];
  const prevRowNum = parseInt(prevRow);
  console.log(prevRowNum);

  //Create a new Div with an ID one number higher than last visible row
  const div = document.createElement('div');
  div.className = 'form-group form-row justify-content-center';
  div.id = `row-${prevRowNum + 1}`;

  div.innerHTML = `
    <div class="col-sm-2 col-md-1">
    <input type="date" id="date-${div.id}" class="form-control">
    </div>
    <div class="col-sm-3 col-md-3">
    <input type="text" id="origin-${div.id}" class="form-control" placeholder="Street Address, City, State, Zip">
    </div>
    <div class="col-sm-3 col-md-3">
    <input type="text" id="destination-${div.id}" class="form-control" placeholder="Street Address, City, State, Zip">
    </div>
    <div class="col-sm-2 col-md-1">
    <input type="text" id="personal-${div.id}" class="form-control" placeholder="0">
    </div>
    <div class="col-sm-2 col-md-1">
    <input type="text" id="calculated-${div.id}" class="form-control" placeholder="0" value="" disabled>
    </div>`;

  document.querySelector('.mileage-form').insertAdjacentElement('beforeend', div);
}

const deleteMileageRow = () => {
    const selection = document.querySelector('.mileage-form');
    selection.removeChild(selection.lastChild);
}

const calculateMileage = async () => {
    //Split up the addresses entered and store in appropriate variables
    const originString = document.getElementById('origin-1').value.split(',');
    const destinationString = document.getElementById('destination-1').value.split(',');

    const originAdminDistrict = originString[2];
    const originLocality = originString[1];
    const originPostalCode = originString[3];
    const originAddressLine = originString[0];
    const destinationAdminDistrict = destinationString[2];
    const destinationLocality = destinationString[1];
    const destinationPostalCode = destinationString[3];
    const destinationAddressLine = destinationString[0];

    //Find GeoCode Points for Origin and Destination Locations Entered
    const origin = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=${originAdminDistrict}&locality=${originLocality}&postalCode=${originPostalCode}&addressLine=${originAddressLine}&key=AqKA56HQW8gWImgy0cCgJJVjLOWQrNjs_rjHOXjsnd_50HMFnyhRc6ofiFdY6wvP`);
    const originResponse = await origin.json();

    const originWP1 = originResponse.resourceSets[0].resources[0].point.coordinates[0];
    const originWP2 = originResponse.resourceSets[0].resources[0].point.coordinates[1];

    const destination = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=${destinationAdminDistrict}&locality=${destinationLocality}&postalCode=${destinationPostalCode}&addressLine=${destinationAddressLine}&key=AqKA56HQW8gWImgy0cCgJJVjLOWQrNjs_rjHOXjsnd_50HMFnyhRc6ofiFdY6wvP`);
    const destinationResponse = await destination.json();

    const destinationWP1 = destinationResponse.resourceSets[0].resources[0].point.coordinates[0];
    const destinationWP2 = destinationResponse.resourceSets[0].resources[0].point.coordinates[1];

    //Use Location WayPoints to Calculate Route Distance - Round Mileage to nearest Integer
    const route = await fetch(`http://dev.virtualearth.net/REST/v1/Routes/Driving?wayPoint.0=${originWP1},${originWP2}&wayPoint.1=${destinationWP1},${destinationWP2}&distanceUnit=mi&key=AqKA56HQW8gWImgy0cCgJJVjLOWQrNjs_rjHOXjsnd_50HMFnyhRc6ofiFdY6wvP`);
    const routeResponse = await route.json();
    const travelDistance = Math.round(routeResponse.resourceSets[0].resources[0].travelDistance);

    //Check for any Personal Mileage Entered and Calculate Reimburseable Mileage
    const personalMiles = document.getElementById('personal-1').value;
    const mileage = travelDistance - personalMiles;
    //Insert Reimburseable Mileage in Form
    document.getElementById('calculated-1').value = mileage;
}

//Single Day Additional Costs Incurred
const showAdditionalCosts = () => {
  let expenseTable = document.getElementById('single-other-expense');
  if (document.getElementById('single-cb-1').checked == true) {
      expenseTable.classList.replace('d-none', 'd-block');
  } else {
      expenseTable.classList.replace('d-block', 'd-none');
  }
}
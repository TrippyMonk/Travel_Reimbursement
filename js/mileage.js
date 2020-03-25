const addRow = () => {
  //Find out which section is displayed and get Section ID
  document.querySelectorAll('section').forEach(section => {
    if (section.classList.contains('d-block')) {
      let sectionElement = section.getAttribute('id');
      //Get mileage form, grab the last div element visible, get the ID attribute, and return the number to the right of Row-
      const prevRow = document.getElementById(sectionElement + '-mileage-form').lastElementChild.getAttribute('id').split('-')[1];
      const prevRowNum = parseInt(prevRow);
      //Create a new Div with an ID one number higher than last visible row
      const div = document.createElement('div');
      div.className = 'form-group form-row justify-content-center mileage-row';
      div.id = `row-${prevRowNum + 1}`;
      div.innerHTML = `
        <div class="col-sm-2 col-md-1">
        <input type="date" id="date-${div.id.split('-')[1]}" class="form-control">
        </div>
        <div class="col-sm-3 col-md-3">
        <input type="text" id="origin-${div.id.split('-')[1]}" class="form-control mileage-input" placeholder="Street Address, City, State, Zip">
        </div>
        <div class="col-sm-3 col-md-3">
        <input type="text" id="destination-${div.id.split('-')[1]}" class="form-control mileage-input" placeholder="Street Address, City, State, Zip">
        </div>
        <div class="col-sm-2 col-md-1">
        <input type="text" id="personal-${div.id.split('-')[1]}" class="form-control mileage-input" placeholder="0">
        </div>
        <div class="col-sm-2 col-md-1">
        <input type="text" id="calculated-${div.id.split('-')[1]}" class="form-control" placeholder="0" value="" disabled>
        </div>`;
      document.getElementById(sectionElement + '-mileage-form').insertAdjacentElement('beforeend', div);
    }
  });
}

const deleteRow = () => {
  //Find out which section is displayed and get Section ID
  document.querySelectorAll('section').forEach(section => {
    if (section.classList.contains('d-block')) {
      let sectionElement = section.getAttribute('id');
      const selection = document.getElementById(sectionElement + '-mileage-form');
      selection.removeChild(selection.lastChild);
    }
  });
}

const calculate = async () => {
  //Find out which section is displayed and get Section ID
  document.querySelectorAll('section').forEach(section => {
    if (section.classList.contains('d-block')) {
      //Get Row Numbers with a class of mileage-row
      let rowIds = Array.from(section.querySelectorAll('.mileage-row'));
      rowIds.forEach(async row => {
        //Get Row Number for each row
        let rowid = row.getAttribute('id').split('-')[1];
        //Split up the addresses entered and store in appropriate variables
        const originString = document.getElementById('origin-' + rowid).value.split(',');
        const destinationString = document.getElementById('destination-' + rowid).value.split(',');
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
        const personalMiles = document.getElementById('personal-' + rowid).value;
        const mileage = travelDistance - personalMiles;
        //Insert Reimburseable Mileage in Form
        document.getElementById('calculated-' + rowid).value = mileage;
      });
    }
  });
}

const clearAll = () => {
  document.querySelectorAll('section').forEach(section => {
    if (section.classList.contains('d-block')) {
      let values = section.querySelectorAll('input');
      values.forEach(value => {
        value.value = null;
      })
    }
  });
}
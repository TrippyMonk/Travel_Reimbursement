//Event Listeners for Travel Type Buttons
document.querySelector('#itinerant-btn').addEventListener('click', showItinerant);
document.querySelector('#single-day-btn').addEventListener('click', showSingleDay);

//Control Mileage Boxes
document.querySelector('.add-row').addEventListener('click', addMileageRow);
document.querySelector('.delete-row').addEventListener('click', deleteMileageRow);
document.querySelector('#calculate-mileage').addEventListener('click', calculateMileage);

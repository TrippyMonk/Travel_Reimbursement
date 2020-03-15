const mileage = new Mileage;

//Event Listeners for Travel Type Buttons
document.querySelector('#itinerant-btn').addEventListener('click', showItinerant);
document.querySelector('#single-day-btn').addEventListener('click', showSingleDay);

// //Control Mileage Boxes
// document.querySelector('.add-row').addEventListener('click', mileage.addRow);
// document.querySelector('.delete-row').addEventListener('click', mileage.deleteRow);
// document.querySelector('#calculate-mileage').addEventListener('click', mileage.calculate);

document.querySelectorAll('.add-row').forEach(item => item.addEventListener('click', mileage.addRow));
document.querySelectorAll('.delete-row').forEach(item => item.addEventListener('click', mileage.deleteRow));

//Event Listeners for Travel Type Buttons
document.querySelector('#itinerant-btn').addEventListener('click', showItinerant);
document.querySelector('#single-day-btn').addEventListener('click', showSingleDay);

//Control Mileage Boxes
document.querySelectorAll('.add-row').forEach(item => item.addEventListener('click', addRow));
document.querySelectorAll('.delete-row').forEach(item => item.addEventListener('click', deleteRow));
document.querySelectorAll('#calculate-mileage').forEach(item => item.addEventListener('click', calculate));
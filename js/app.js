//Event Listeners for Travel Type Buttons
document.querySelector('#itinerant-btn').addEventListener('click', showItinerant);
document.querySelector('#single-day-btn').addEventListener('click', showSingleDay);

//Control Mileage Boxes
document.querySelectorAll('.add-row').forEach(item => item.addEventListener('click', addRow));
document.querySelectorAll('.delete-row').forEach(item => item.addEventListener('click', deleteRow));
document.querySelectorAll('form').forEach(form => form.addEventListener('change', function(e) {
    if(e.target.classList.contains('mileage-input')) {
    calculate();
    }
}));




document.querySelectorAll('#clear-all').forEach(button => button.addEventListener('click', clearAll));
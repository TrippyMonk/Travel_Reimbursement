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

//Single Day Additional Costs Incurred
const showAdditionalCosts = () => {
  let expenseTable = document.getElementById('single-other-expense');
  if (document.getElementById('single-cb-1').checked == true) {
      expenseTable.classList.replace('d-none', 'd-block');
  } else {
      expenseTable.classList.replace('d-block', 'd-none');
  }
}
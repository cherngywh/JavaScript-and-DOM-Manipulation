// Get references to the tbody element, input field and button
var $tbody = document.querySelector('tbody');
var $datetimeInput = document.querySelector('#datetime');
var $cityInput = document.querySelector('#city')
var $searchBtn = document.querySelector('#search');

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener('click', handleSearchButtonClick);

// Set filtereddata to dataSet initially
// dataSet comes from the data.js file
var filtereddata = dataSet;
// renderTable renders the filtereddata to the tbody
function renderTable() {
  $tbody.innerHTML = '';
  for (var i = 0; i < filtereddata.length; i++) {
    // Get get the current event object and its fields
    var event = filtereddata[i];
    var details = Object.keys(event);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < details.length; j++) {
      // For every field in the event object, create a new cell at set its inner text to be the current 
      // value at the current event's field
      var detail = details[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = event[detail];
    }
  }
}



// create dropdown list in Multi Search:
// initila 3 arrays for state, country, shape
var Astate = [];
var Acountry = [];
var Ashape = [];

// push unique value into the arrays(Astate, Acountry, Ashpae)
for (var k = 0; k < filtereddata.length; k++) {
  var box = filtereddata[k];
  if (Astate.includes(box.state)==false) {
    Astate.push(box.state);
  }
  if (Acountry.includes(box.country)==false) {
    Acountry.push(box.country);
  }
  if (Ashape.includes(box.shape)==false) {
    Ashape.push(box.shape);
  }
}

// Use for loop iterate through all arrays to show dropdowns in html
var $Astate = document.querySelector('#Astate');
for (var a =0; a < Astate.length; a++)
{
    var option = document.createElement('option');  
    option.innerHTML = Astate[a];
    $Astate.appendChild(option);
}
var $Acountry = document.querySelector('#Acountry');
for (var b =0; b < Acountry.length; b++)
{
    var option = document.createElement('option');  
    option.innerHTML = Acountry[b];
    $Acountry.appendChild(option);
}
var $Ashape = document.querySelector('#Ashape');
for (var c =0; c < Ashape.length; c++)
{
    var option = document.createElement('option');  
    option.innerHTML = Ashape[c];
    $Ashape.appendChild(option);
}



// create a function for the action when click on Search button of Multi Search
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  // get the current chosen option from the dropdowns
  var filterdatetime = $datetimeInput.value.trim().toLowerCase();
  var filtercity = $cityInput.value.trim().toLowerCase();
  var stateInput = $Astate.value;
  var countryInput = $Acountry.value;
  var shapeInput = $Ashape.value;

  // gradualliy filter all search critirias step by step from top to bottom
  firstfilter = dataSet.filter(function(event) {
    var eventdate = event.datetime.toLowerCase();
    if (filterdatetime === '') {
      return dataSet;
    }
    else {
      return eventdate === filterdatetime;
    }
  });
  secondfilter = firstfilter.filter(function(event) {
    var eventcity = event.city.toLowerCase();
    if (filtercity === '') {
      return firstfilter;
    }
    else {
      return eventcity === filtercity;
    }
  });
  thirdfilter = secondfilter.filter(function(event) {
    var eventstate = event.state.toLowerCase();
    if (stateInput === 'Choose a State...') {
      return secondfilter;
    }
    else {
      return eventstate === stateInput;
    }
  });
  forthfilter = thirdfilter.filter(function(event) {
    var eventcountry = event.country.toLowerCase();
    if (countryInput === 'Choose a Country...') {
      return thirdfilter;
    }
    else {
      return eventcountry === countryInput;
    }
  });
  filtereddata = forthfilter.filter(function(event) {
    var eventshape = event.shape.toLowerCase();
    if (shapeInput === 'Choose a Shape...') {
      return forthfilter;
    }
    else {
      return eventshape === shapeInput;
    }
  });
  renderTable();
}



// Render the table for the first time on page load
renderTable();



// import dataTables to create pagination
$(document).ready(function() {
  $('#list').DataTable( {
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
  } );
} );
var census = require('citysdk')(YOUR_API_KEY_HERE),
    async = require('async'),
    fs    = require('fs');

// run counties_of_missouri.js to get this file
var data = require('./counties_of_missouri.json');

var rawCounties = data.counties.features;
var counties = [];

for (var i = 0; i < rawCounties.length; i++) {
  var county = rawCounties[i].properties;
  var countyObject = { base_name: county.BASENAME, lat: county.CENTLAT, lng: county.CENTLON };

  counties.push(countyObject);
};

function processCounty(county, callback) {
  console.log('processing ' + county.base_name);
  console.log(JSON.stringify(county, null, 2));

  var request = {
    lat: county.lat,
    lng: county.lng,
    level: "blockGroup",
    sublevel: true,
    container: "county",
    variables: ['population', 'income', 'income_per_capita', 'employment_labor_force', 'employment_not_labor_force', 'employment_civilian_labor_force', 'employment_employed', 'employment_unemployed', 'employment_armed_forces', 'education_none', 'education_high_school', 'education_ged', 'education_associates', 'education_bachelors', 'education_masters', 'education_professional', 'education_doctorate', 'median_home_value', 'median_house_construction_year', 'median_contract_rent', 'median_gross_rent', 'commute_time', 'commute_time_solo_automobile', 'commute_time_carpool', 'commute_time_public_transport', 'commute_time_walked', 'commute_time_other', 'age', 'median_male_age', 'median_female_age', 'population_white_alone', 'population_black_alone', 'population_asian_alone', 'population_native_hawaiian_alone', 'population_other_alone', 'population_two_or_more_races', 'population_hispanic_origin', 'poverty']
  };

  census.GEORequest(request, function(response) {
    response = JSON.stringify(response, null, 2);
    fileName = county.base_name.replace(' ', '_').replace('.', '').toLowerCase();

    fs.writeFile('./counties/'+fileName+'.json', response, function(err) {
      callback(null);
    });   
  });
}

var createCountyMapQueue = async.queue(processCounty);
createCountyMapQueue.push(counties);

createCountyMapQueue.drain = function() { console.log('Done'); }

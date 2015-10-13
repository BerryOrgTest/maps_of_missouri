// include chadhuber/citysdk-node package
var census = require('citysdk')(YOUR_API_KEY_HERE),
    fs     = require('fs');

// set parameters for request
var request = { state: 'MO', level: 'state', sublevel: true, variables: ['population', 'income', 'income_per_capita', 'employment_labor_force', 'employment_not_labor_force', 'employment_civilian_labor_force', 'employment_employed', 'employment_unemployed', 'employment_armed_forces', 'education_none', 'education_high_school', 'education_ged', 'education_associates', 'education_bachelors', 'education_masters', 'education_professional', 'education_doctorate', 'median_home_value', 'median_house_construction_year', 'median_contract_rent', 'median_gross_rent', 'commute_time', 'commute_time_solo_automobile', 'commute_time_carpool', 'commute_time_public_transport', 'commute_time_walked', 'commute_time_other', 'age', 'median_male_age', 'median_female_age', 'population_white_alone', 'population_black_alone', 'population_asian_alone', 'population_native_hawaiian_alone', 'population_other_alone', 'population_two_or_more_races', 'population_hispanic_origin', 'poverty'] };

// execute request and print the response
census.GEORequest(request, function(response) { 
  response = JSON.stringify(response, null, 2);

  fs.writeFile('./counties_of_missouri.json', response);
});
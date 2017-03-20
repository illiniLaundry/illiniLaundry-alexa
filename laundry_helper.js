'use strict'
var _ = require('lodash');
var requestPromise = require('request-promise');
var prompts = require('./speech_assets');
const LAUNDRY_URL = 'http://23.23.147.128/homes/mydata/urba7723';
/*
The laundryHelper object that is populated with multiple helper methods.
These helper methods filter, parse, and convert the json retrieved from the
laundry endpoint into text that Alexa can speak.
*/
function laundryHelper() {
}

/**
 * Accesses the laundry endpoint and retrieves a GET request-promise
 * @return object holds the request-promise object
 */
laundryHelper.prototype.getLaundryStatus = function() {
    var options = {
        method: 'GET',
        uri: LAUNDRY_URL,
        json: true
    };
    return requestPromise(options)
}

/**
 * Takes in a json laundry status object and dorm name and returns the correct
 * dorm using those two parameters
 * @param  {object} fullStatus The laundry json object
 * @param  {String} dormName   The name of the requested dorm
 * @return object              The dorm object that was found or an error code
 */
laundryHelper.prototype.filterLaundryStatus = function(fullStatus, dormName) {
    //Retrieve the rooms from the unfiltered json object
    var rooms = fullStatus.location.rooms;
    //Search inside the json object to retrieve the specified dorm by name
    for(var i = 0; i < rooms.length; i++) {
        var dorm = rooms[i];
        if(dorm.name.toLowerCase() == dormName.toLowerCase()) {
            return dorm;
        }
    }
    //Return an error code if no match was found for the specified dorm name
    return -1;
}

/**
 * Takes in a dorm json object and extracts all relevant laundry information
 * such as available washers and dryers.
 * @param  {object} dorm The dorm json object with laundry information
 * @return object        An object with extracted laundry info (washers, dryers)
 */
laundryHelper.prototype.formatLaundryStatus = function(dorm) {
    //Initialize the dorm machines and the empty status object
    var machines = dorm.machines;
    var statusObj = {
        'dormName': dorm.name,
        'availWasher': 0,
        'availDryer': 0,
    }
    //Iterate through the machines
    for(var i = 0; i < machines.length; i++) {
        var currentMachine = machines[i];
        var description = currentMachine.description.toLowerCase();
        //Increment statusObj values based on the status of each laundry machine
        switch(currentMachine.status) {
            case 'In Use':
                break;
            case 'Available':
                if(description.includes("washer"))
                    statusObj['availWasher']++;
                else
                    statusObj['availDryer']++;
                break;
        }
    }
    return statusObj;
}

/**
 * Takes in a laundry status object and converts the information to a speech
 * template that Alexa can read out
 * @param  {object} statusObj Object containing dorm name and laundry info
 * @return String             Returns a string populated with laundry info
 */
laundryHelper.prototype.convertToSpeechTemplate = function(statusObj) {
    //Create and populate a template filled with the values from statusObj
    var template = _.template(prompts.laundry_template);
    return template(statusObj)
}

module.exports = laundryHelper;

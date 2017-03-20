'use strict'
var _ = require('lodash');
var requestPromise = require('request-promise');
var LAUNDRY_URL = 'http://23.23.147.128/homes/mydata/urba7723';
const ERROR = "ERRORCODE";

function laundryHelper() {
}

laundryHelper.prototype.getLaundryStatus = function() {
    var options = {
        method: 'GET',
        uri: LAUNDRY_URL,
        json: true
    };
    return requestPromise(options)
}

laundryHelper.prototype.filterLaundryStatus = function(fullStatus, dormName) {
    var rooms = fullStatus.location.rooms;
    if(rooms == null) {
        return ERROR;
    }
    for(var i = 0; i < rooms.length; i++) {
        var dorm = rooms[i];
        if(dorm.name == dormName) {
            return dorm.machines;
        }
    }
    return ERROR;
}

laundryHelper.prototype.formatLaundryStatus = function(machines) {
    //Confirm we haven't reached an ERROR
    if(machines == ERROR) {
        return "ERROR TEMPLATE";
    }
    var statusObj = {
        'availWasher': 0,
        'availDryer': 0,
    }
    for(var i = 0; i < machines.length; i++) {
        var currentMachine = machines[i];
        var description = currentMachine.description.toLowerCase();
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

var laundry = new laundryHelper();
laundry.getLaundryStatus().then(function(status) {
    console.log(laundry.formatLaundryStatus(laundry.filterLaundryStatus(status, "ISR: Townsend")));
});

module.exports = laundryHelper;

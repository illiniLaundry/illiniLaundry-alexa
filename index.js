'use strict';
//Specifies live preview when changes are made for local deployments
module.change_code = 1;
//Get dependencies and initialize a new skill using alexa-app
var _ = require('lodash');
var Alexa = require('alexa-app');
var laundryHelper = require('./laundry_helper');
var skill = new Alexa.app('illinilaundry');
var dormMap = require('./dorm_map').dormMap;
var prompts = require('./speech_assets');

//Define launch prompts and reprompts
// const reprompt = 'I didn\'t hear the dorm name correctly, can you say it again?'
// const prompt = 'To request laundry information tell me a dorm name.'

//Define event handler for the launching of the illini laundry skill
skill.launch(function(request, response) {
    response.say(prompts.launch_prompt)
            .reprompt(prompts.reprompt)
            .shouldEndSession(false);
});

//Define error utterance
// const error_prompt = 'I was not able to retrieve laundry data, please try again.';
//Define the intent handler for requesting laundry from a dorm
skill.intent('laundryIntent', {
    'slots': {
        'DORMNAME': 'DORMNAMES'
    },
    //Defines a list of sample utterances for alexa using:
    //https://github.com/alexa-js/alexa-utterances
    'utterances': ['{|laundry|washer|dryer} {|status|availability|info} {|at|for|in} {-|DORMNAME}']
}, function (request, response) {
    var dormName = request.slot('DORMNAME').toLowerCase();
    console.log(dormName);
    if(_.isEmpty(dormName)) {
        // var no_dorm_prompt = 'I didn\'t hear a dorm name. Tell me a dorm name';
        response.say(prompts.no_dorm_error)
                .reprompt(prompts.reprompt)
                .shouldEndSession(false);
        return true;
    }
    else {
        var finalDormName = dormName;
        if(dormMap.hasOwnProperty(dormName)) {
            finalDormName = dormMap[dormName];
        }
        else {
            // var no_dorm_prompt = 'I didn\'t recognize ' + dormName;
            response.say(_.template(prompts.dorm_error)({dorm_name: dormName}))
                    .reprompt(prompts.reprompt)
                    .shouldEndSession(false);
            return true;
        }
        console.log(finalDormName);
        var laundry = new laundryHelper();
        laundry.getLaundryStatus().then(function(status) {
            //Grab, filter, format, and convert laundry data to be spoken
            var filteredStatus = laundry.filterLaundryStatus(status, finalDormName);
            //If the correct dorm was not found
            if(filteredStatus === -1) {
                response.say(_.template(prompts.dorm_error)({dorm_name: dormName}))
                        .reprompt(prompts.reprompt)
                        .shouldEndSession(false);
                return true;
            }
            var formattedStatus = laundry.formatLaundryStatus(filteredStatus);
            var speechTemplate = laundry.convertToSpeechTemplate(formattedStatus);
            console.log(speechTemplate);
            response.say(speechTemplate).send();
        }).catch(function(err) {
            //Handle errors naively. Need to expand error handling :/
            console.log(err);
            response.say(prompts.network_error).shouldEndSession(false).send();
        });
        return false;
    }

});


module.exports = skill;

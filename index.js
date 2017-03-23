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

//Define event handler for the launching of the illini laundry skill
skill.launch(function(request, response) {
    response.say(prompts.launch_prompt)
            .reprompt(prompts.reprompt)
            .shouldEndSession(false);
});

//Function for handling cancelling intent
var cancelIntentFunction = function(request, response) {
    response.say(prompts.exit_template).shouldEndSession(true);
}

//Override amazon's cancel and stop intents
skill.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);
skill.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

//Override amazon's help intent
skill.intent('AMAZON.HelpIntent', {}, function(request, response) {
    response.say(prompts.help_prompt)
            .reprompt(prompts.reprompt)
            .shouldEndSession(false);
});

//Define the intent handler for requesting laundry from a dorm
skill.intent('laundryIntent', {
    'slots': {
        'DORMNAME': 'DORMNAMES'
    },
    //Defines a list of sample utterances for alexa using:
    //https://github.com/alexa-js/alexa-utterances
    'utterances': ['{|get|retrieve|fetch} {|laundry|washer|dryer} {|status|availability|info} {|at|for|in} {-|DORMNAME}']
}, function (request, response) {
    //Get the slot value of the dorm spoken by the user
    var dormName = request.slot('DORMNAME');
    console.log(dormName);

    //If no dorm was uttered, prompt and ask the user to repeat themself
    if(_.isEmpty(dormName)) {
        response.say(prompts.no_dorm_error)
                .reprompt(prompts.reprompt)
                .shouldEndSession(false);
        return true;
    }
    else {
        var dormName = dormName.toLowerCase();
        //Attempt to map the user dorm name to a corresponding API dorm name
        var finalDormName = dormName;
        if(dormMap.hasOwnProperty(dormName)) {
            finalDormName = dormMap[dormName];
        }
        //If we couldn't find the correct dorm in our map, then return an error prompt
        else {
            response.say(_.template(prompts.dorm_error)({dorm_name: dormName}))
                    .reprompt(prompts.reprompt)
                    .shouldEndSession(false);
            return true;
        }
        console.log(finalDormName);
        var laundry = new laundryHelper();
        laundry.getLaundryStatus().then(function(status) {
            //Grab the laundry data to be spoken
            var filteredStatus = laundry.filterLaundryStatus(status, finalDormName);
            //If the correct dorm was not found return an error (This should never happen)
            if(filteredStatus === -1) {
                response.say(_.template(prompts.dorm_error)({dorm_name: dormName}))
                        .reprompt(prompts.reprompt)
                        .shouldEndSession(false);
                return true;
            }
            //Format the data to get only the useful information
            var formattedStatus = laundry.formatLaundryStatus(filteredStatus);
            //Convert that information to a template that alexa can speak
            var speechTemplate = laundry.convertToSpeechTemplate(formattedStatus);
            console.log(speechTemplate);
            response.say(speechTemplate).send();
        }).catch(function(err) {
            //Handle any errors that result from trying to connect to laundry api
            console.log(err);
            response.say(prompts.network_error).shouldEndSession(false).send();
        });
        return false;
    }

});


module.exports = skill;

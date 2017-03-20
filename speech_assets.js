module.exports = {
    //Prompts to ask for user input
    launch_prompt: 'To request laundry information tell me a dorm name.',
    reprompt: 'I didn\'t hear the dorm name correctly, can you say it again?',
    //Error prompts
    network_error: 'Due to a network error I could not find the laundry information, try again.',
    dorm_error: 'I didn\'t recognize the dorm ${dorm_name}, can you repeat yourself?',
    no_dorm_error: 'I didn\'t here a dorm name. Please tell me one.',
    //Laundry prompts
    laundry_template: 'There are currently ${availWasher} washers \
    and ${availDryer} dryers available in ${dormName}.'
}

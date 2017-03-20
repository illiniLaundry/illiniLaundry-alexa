/*
Basic map that takes possible user inputs and standardizes them to values
inside of the api. This could always use expanding any help would be great :)
*/

/*
Guidelines:
All keys should be a possible lowercase input and map to a valid api dorm name,
for example when a user wants laundry data about townsend, they may say:
ISR Townsend, Townsend, or just ISR

these result in the following mappings:
'isr townsend': 'ISR: Townsend'
'townsend': 'ISR: Townsend'
'isr': 'ISR: Townsend'
 */

/*
List of all api values:
1107 West Green
300 South Goodwin
Allen
Barton-Lundgren
Bousfield Rm 103
Busey-Evans
Daniels North
Daniels South
FAR: Oglesby
FAR: Trelease
Hopkins
ISR: Townsend
ISR: Wardall
LAR: Leonard
LAR: Shelden
Nugent
Nugent Rm 126
Orchard Downs North
Orchard Downs South
PAR: Babcock
PAR: Blaisdell
PAR: Carr
PAR: Saunders
Scott
Sherman Short
Sherman Tall
Snyder
TVD: Taft
TVD: Van Doren
Wassaja Room 1109
Weston
*/


var dormMap = {
    'west green': '1107 West Green',
    'three hunded south goodwin': '300 South Goodwin',
    'allen': 'Allen',
    'barton lundgren': 'Barton-Lundgren',
    'barton': 'Barton-Lundgren',
    'lundgren': 'Barton-Lundgren',
    'barton and lundgren': 'Barton-Lundgren',
    'bousfield': 'Bousfield Rm 103',
    'busey': 'Busey-Evans',
    'busey evans': 'Busey-Evans',
    'evans': 'Busey-Evans',
    'daniels': 'Daniels North',
    'daniels north': 'Daniels North',
    'daniels south': 'Daniels South',
    'daniel': 'Daniels North',
    'daniel north': 'Daniels North',
    'daniel south': 'Daniels South',
    'oglesby': 'FAR: Oglesby',
    'trelease': 'FAR: Trelease',
    'hopkins': 'Hopkins',
    'isr': 'ISR: Townsend',
    'townsend': 'ISR: Townsend',
    'town send': 'ISR: Townsend',
    'wardall': 'ISR: Wardall',
    'ward all': 'ISR: Wardall',
    'leonard': 'LAR: Leonard',
    'shelden': 'LAR: Shelden',
    'nugent': 'Nugent',
    'nugent 126': 'Nugent Rm 126',
    'orchard downs north': 'Orchard Downs North',
    'orchard downs south': 'Orchard Downs South',
    'babcock': 'PAR: Babcock',
    'blaisdell': 'PAR: Blaisdell',
    'carr': 'PAR: Carr',
    'saunders': 'PAR: Saunders',
    'scott': 'Scott',
    'sherman short': 'Sherman Short',
    'sherman tall': 'Sherman Tall',
    'snyder': 'Snyder',
    'taft': 'TVD: Taft',
    'van doren': 'TVD: Van Doren',
    'wassaja': 'Wassaja Room 1109',
    'weston': 'Weston'
};



exports.dormMap = dormMap;

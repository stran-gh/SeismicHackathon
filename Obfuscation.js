const fs = require('fs');

// A Map to definite which fields are considered sensitive
var sensitiveInfo = new Object();
sensitiveInfo['Name'] = 'Name';
sensitiveInfo['Address'] = 'Address';
sensitiveInfo['SSN'] = 'SSN';
sensitiveInfo['Phone'] = 'Phone';
sensitiveInfo['DOB'] = 'DOB';

//Parse through the JSON
let dataSetFile = fs.readFileSync('C:/Users/stran/Coding/Seismic Hackathon/HackathonData2019/Data/json/data01.json');  
let dataSet = JSON.parse(dataSetFile);  

// A function which obfuscates a field appropriately
// ie. phone number will retain area code, name will retain initials
function obfuscateField(field, value) {
    switch(field) {
        case 'Name':
            value = 'New Name';
            break;
        case 'Address':
            value = 'New Address';
            break;
        case 'SSN':
            value = 'New SSN';
            break;
        case 'Phone':
            value = 'New Phone';
            break;
        case 'DOB':
            value = 'New Dob';
            break;
        default: 
            value = 'Need to code this Obfuscation';
    }
    return value;
}

// Go through fields of an object member to find sensitive info and obfuscate
for(var i = 0; i < dataSet.length; i++) {
    Object.keys(dataSet[i]).forEach(function(field,index) {
        if(field == sensitiveInfo[field]) {
            console.log("Sensitive Info Found: " + field);
            console.log(dataSet[0][field]);
            dataSet[0][field] = obfuscateField(field, dataSet[0][field]);
        }
    });
    
    let newData = JSON.stringify(dataSet);  
    fs.writeFileSync('data-1.json', newData); 
}
 


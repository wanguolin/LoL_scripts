var fs = require('fs');
var path = require('path');
var basePath = process.argv[2];

function GetWebP(fullName, saveInArry)
{
    if(fs.statSync(fullName).isFile()) {
        saveInArry.push(path.basename(fullName));
    }
    else {
        fs.readdirSync(fullName).forEach(function (i) {
            var NewName = fullName + '/' + i;
            GetWebP(NewName, saveInArry);
        });
    }
}

var DGC = basePath + '/DGC';
var jsonDGC = new Object();
function handleDGC(item){
    var ShowName = item.replace("【52BT论坛】【DGC系列】", "");
    jsonDGC[ShowName] = new Array();
    GetWebP(DGC + '/' + item, jsonDGC[ShowName]);
}

var DGXZ = basePath + "/DGXZ";
var jsonDGXZ = new Object();
function handleDGXZ(item){
    jsonDGXZ[item] = new Array();
    GetWebP(DGXZ + '/' + item, jsonDGXZ[item]);
}

var Gals = basePath + "/Gals";
var jsonGals = new Object();
function handleGals(item){
    var ShowName = item.replace("Gals", "").replace();
    var start = ShowName.indexOf("(");
    var end = ShowName.indexOf(")") + 1;
    ShowName = ShowName.replace(ShowName.substring(start, end), "");
    jsonGals[ShowName] = new Array();
    GetWebP(Gals + '/' + item, jsonGals[ShowName]);
}

var ROSI = basePath + "/ROSI";
var jsonROSI = new Object();
function handleROSI(item) {
    var start = item.toLowerCase().indexOf("no.");
    var ShowName = item.substr(start, 6).replace("O", "o");
    if(ShowName == "]")
        ShowName = item.replace("[ROSI]", "");
    jsonROSI[ShowName] = new Array();
    GetWebP(ROSI + '/' + item, jsonROSI[ShowName]);
}

var YS = basePath + "/YS";
var jsonYS = new Object();
function handleYS(item){
    var ShowName = item.replace("[YS Web]","");
    jsonYS[ShowName] = new Array();
    GetWebP(YS + '/' + item, jsonYS[ShowName]);
}

console.log("Scanning ... DGC");
fs.readdirSync(DGC).forEach(handleDGC);

console.log("Scanning...DGXZ");
fs.readdirSync(DGXZ).forEach(handleDGXZ);

console.log("Scanning...Gals");
fs.readdirSync(Gals).forEach(handleGals);

console.log("Scanning...ROSI");
fs.readdirSync(ROSI).forEach(handleROSI);

console.log("Scanning...YS");
fs.readdirSync(YS).forEach(handleYS);

var all_json_list = { "DGC.json" : jsonDGC, "DGXZ.json" : jsonDGXZ, "Gals.json" : jsonGals, "ROSI.json" : jsonROSI, "YS.json" : jsonYS };

all_json_list.forEach(function (item){
    fs.writeFile(item.key, JSON.stringify(item.value), function(err){
    if(err)
        console.log("Writing " + item.key + err);
    else
        console.log(item.key + " done");
   })
});

/*
fs.writeFile(writeToDGC, JSON.stringify(jsonDGC), function(err){
    if(err)
        console.log("Writing " + writeToDGC + err);
    else{
        console.log(writeToDGC + " done!");
        all_json_list.push(writeToDGC)
    }

});

fs.writeFile(writeToDGXZ, JSON.stringify(jsonDGXZ), function(err){
    if(err)
        console.log("Writing " +  writeToDGXZ  + err);
    else{
        console.log(writeToDGXZ + " done!");
        all_json_list.push(writeToDGXZ);
    }
});

fs.writeFile("Gals.json", JSON.stringify(jsonGals), function(err){
    if(err)
        console.log("Writing " + writeToGals  + err);
    else{
        console.log( writeToGals + " done!");
        all_json_list.push(writeToGals);
    }
});

fs.writeFile("ROSI.json", JSON.stringify(jsonROSI), function(err){
    if(err)
        console.log("Writing " + writeToROSI + err);
    else{
        console.log(writeToROSI + " done!");
        all_json_list.push(writeToROSI);
    }
});

fs.writeFile("YS.json", JSON.stringify(jsonYS), function(err){
    if(err)
        console.log("Writing " + writeToYS + err);
    else{
        console.log(writeToYS +" done!");
        all_json_list.push(writeToYS);
    }
});
*/
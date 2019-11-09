var makeDate = function(){
    var d = new Date();
    var formattedDate = "";
// adds month
    formattedDate += (d.getMonth() + 1) = "_";
    // adds date
    formattedDate += d.getDate() + "_";
    // add year
    formattedDate += d.getFullYear();

    return formattedDate;
};

module.exports = makeDate;
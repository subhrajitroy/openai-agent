

function testSwitch(item){
    switch(item){
        case "even" : {
            return "EVEN";
        }
        case "odd" : {
            return "ODD";
        }
        default : {
            return "UNKNOWN"
        }
    }
}

console.log(testSwitch("odd"));
console.log(testSwitch("even"))
console.log(testSwitch("blah"));
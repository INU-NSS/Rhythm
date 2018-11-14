var hh= new Date().getHours();
if(0<=hh && hh<9) {


    const today = () => {
	
    let date = new Date();
    date.setDate(date.getDate()+1);
    var d2= new Date(date.toISOString().slice(0, 10));
    var d3 = new Date(d2.valueOf() +d2.getTimezoneOffset() * 60000);   
    //console.log(d3);
    return new Date(d2.valueOf() +d2.getTimezoneOffset() * 60000)
    };

    const tomorrow = () => {
	let date = today();
	return new Date(date.setDate(date.getDate() +2));
    };


    module.exports = {
	today: today,
	tomorrow: tomorrow
    };

}

else {

    const today = () => {
        let date = new Date(new Date().toISOString().slice(0, 10));
        //console.log(date);
        return new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    };
    
    const tomorrow = () => {
        let date = today();
        return new Date(date.setDate(date.getDate() +1));
    };
    
    
    module.exports = {
        today: today,
        tomorrow: tomorrow
    };
    
}
    
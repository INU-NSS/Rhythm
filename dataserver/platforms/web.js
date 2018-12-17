const async = require('async');
const rest = {
	cloud: require('../REST/cloud.js'),
	solarx: require('../REST/solar.js'),
	solary: require('../REST/kasi.js')
};
var date = new Date();
var hh = new Date().getHours();
console.log(hh);
//if( 7<hh  || hh <15) {
if(hh >7 && hh <19){
function getData() {
	return new Promise((resolve, reject) => {
		Promise.all([rest.cloud.update(1), rest.cloud.update(0), rest.solarx.update()])
		.then((x) => {
			//console.log(x);
			resolve(calcSolRa(x));
		})
		.catch((x) => {
			reject(err(x));
			console.log(hh);
			console.log(err);
			console.log(x);
		});
	});
}
//}


function calcSolRa(data) {
	// extract useful variables
	// 'w' takes 'SKY', 'T3H', 'REH', 'VVV', 'UUU', 'WSD', 'T-3H'
	// 'a' is solar altitude in radian
	var w = [];
	for(let i=0; i<data[0].length; i++) {
		if(data[0][i].category == 'SKY') w[0] = (Math.floor(data[0][i].fcstValue/3) +1) *2 /10;
		if(data[0][i].category == 'T3H') w[1] = data[0][i].fcstValue;
		if(data[0][i].category == 'REH') w[2] = data[0][i].fcstValue;
		if(data[0][i].category == 'VVV') w[3] = data[0][i].fcstValue;
		if(data[0][i].category == 'UUU') w[4] = data[0][i].fcstValue;
		if(data[0][i].category == 'SKY') {
			if(data[0][i].fcstValue == '1') 
			{
				w[7]=0;
				//console.log(w[7]);
			}
			else if(data[0][i].fcstValue == '2')
			{
				w[7]=0.3333;
				//console.log(w[7]);
			}else if(data[0][i].fcstValue == '3')
			{
				w[7]=0.6666;
				//console.log(w[7]);
			}else if(data[0][i].fcstValue == '4')
			{
				w[7]=1;
				//console.log(w[7]);
			}
		}
	}
	w[5] = (Math.round(Math.sqrt(Math.pow(w[3], 2) + Math.pow(w[4], 2))));
	for(let i=0; i<data[1].length; i++) {
		if(data[1][i].category == 'T3H') w[6] = (data[1][i].fcstValue);
	}
	var idx = rest.solarx.getAltitudeIndex();
	var a = rest.solarx.deg2rad((Object.values(data[2])[idx +1]));

	/* regression coefficients */
	const c = [0.6144, -0.0225, -0.3088, 0.0333, -0.0024, 0.0122];
	const b = -6.9008;
	/* independent variables */
	//console.log(w[0]);
	const iv = [1, w[0], Math.pow(w[0], 2), w[1]-w[6], w[2], w[5]];
	

	/* calulate solar radiation quantity and energy */
	var temp = 0;
	for(let i=0; i<c.length; i++) temp += c[i] * iv[i];
	var solar = 1367 * Math.sin(a) * temp + b;

	/* regression coefficients -zh */
	const q = [0.5598, 0.4982, -0.6767, -0.02842, -0.00317, 0.014];
	const g = -17.853;
	const d = 0.843;
	/* independent variables -zh */
	const zhiv = [1, w[7], Math.pow(w[7], 2), w[1]-w[6], w[2], w[5]];


	/* calulate solar radiation quantity -zh */
	var temp2 = 0;
	for(let i=0; i<q.length; i++) temp2 += q[i] * zhiv[i];
	var solarzh = (1355 * Math.sin(a) * temp2 + g)/d;


	/* regression coefficients -fzh */
	const y = [0.6144, -0.0225, -0.3088, 0.0333, -0.0024, 0.0122];
	const z = -6.9008;
	
	/* independent variables -fzh */
	const fzhiv = [1, w[7], Math.pow(w[7], 2), w[1]-w[6], w[2], w[5]];


	/* calulate solar radiation quantity -fzh */
	var temp2 = 0;
	for(let i=0; i<y.length; i++) temp2 += y[i] * fzhiv[i];
	var solarfzh = 1367 * Math.sin(a) * temp2 + z;

	return { solar: solar, solarzh: solarzh, solarfzh: solarfzh, energy: solar *0.75*8*0.16 /1000};
}

}
function err(){
	var solar = 0;

	return { solar: solar, solarzh: solar*0, solarfzh: solar*0, energy: solar *0 }
}
module.exports.err =  err;
module.exports.getData = getData;



/**
 * 동네예보 API를 이용한 운량 정보 시스템
 * API 명세는 VIFFS.md 참고
 * 수정해야할 부분
 *	1. 시간 계산
 *		- 2018년 09월 28일 00시 27분에 프로그램을 실행한 경우
 *		- 2018년 09월 27일 23시 발표일자의 데이터를 가져와야 함
 *		- 2019년 1월 1일 23시 이후, 1월 2일 02시 이전에 데이터를 요청하는 경우
 *		- 2018년도 데이터를 가져와야함
 *	
 *	2. 필요한 정보만 출력
 *	3. mqtt를 이용해서 mqtt broker로 필요한 정보 전달
 *		- topic과 메시지 형식을 포함한 프로토콜 결정
 *
 *	4. 타이머 주기 변경(현재 5초)
 *	5. 기관 키 변경, 시스템 유형 변경
 **/
const config = require('../../config/config.js');
const { key : {cloudkey}}=config;
const request = require('request');
var hh = new Date().getHours();
if(7<hh && hh <20){

function update(isCurrent) {
	var date = new Date().getToday();	// 날짜 포맷을 변경 (yyyyMMdd)
	var time = new Date().getBaseTime();	// 발표일자 계산 및 포맷 변경 (hh00)

	if(isCurrent == false) time = (time == 8) ? 5 : time - 3;
	time = [(time>9 ? '':'0') + time, '00'].join('');
	
	var hh = new Date().getHours();
	if(hh >6 && hh <20) {
	//const key = '%2BvfGC7aR%2BjJVlb5gBCfDySyyPzMg2yh9kGFMJZItbGJqwPe2H%2B%2BZCiItqIg8ENiOxA%2FYJPrdtfM52JrSXJzVKg%3D%3D';
	var query = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${cloudkey}&base_date=${date}&base_time=${time}&nx=60&ny=127&_type=json`;
	//var query = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${key}&base_date=20181029&base_time=2300&nx=60&ny=127&_type=json`;

	return new Promise((resolve, reject) => {
		request(query, (err, res, body) => {
			if(err) reject(err); 
			try{
			//console.log(body);
			var data = JSON.parse(body);
			//console.log(data.response.body.items.item);
			resolve(data.response.body.items.item);
			}catch(err){
				//var data = JSON.parse(body);
				console.log(err);
				console.log(data);
				reject('error', err);
			}
		});
	});
    }
}

Date.prototype.getToday = function() {
	var mm = this.getMonth() + 1;
	var dd = this.getDate();

	return [this.getFullYear(), (mm>9 ? '':'0') + mm, (dd>9 ? '':'0') + dd].join('');
};

Date.prototype.getBaseTime = function() {
	//const base_time = [2, 5, 8, 11, 14, 17, 20, 23];	// 1일 8회 //
	//var hh = this.getHours();
	//var idx = Math.floor((hh+1) / 3) - 1;
	//if(idx < 0) idx = 7;
	//return base_time[idx];
	const base_time = [5, 8, 11, 14, 17, 20, 23];	// 1일 7회 //
	var hh = this.getHours();
	var idx = Math.floor((hh+1) / 3) - 2;
	if(idx < 0) idx = 6;
	return base_time[idx];
};

module.exports.update = update;

}

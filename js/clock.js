const time = document.querySelector(".planner-time"),
	today = document.querySelector(".planner-today");

function getNow(){
	const now = new Date();
	const month = now.getMonth() + 1;
	const date = now.getDate();
	const day = now.getDay();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	
	var weekday = new Array();
	weekday[0] = "일";
	weekday[1] = "월";
	weekday[2] = "화";
	weekday[3] = "수";
	weekday[4] = "목";
	weekday[5] = "금";
	weekday[6] = "토";
	
	today.innerText = "[ " + month + "/" + date + "(" + weekday[day] + ") ]";
	time.innerText = `${
		hours < 10 ? `0${hours}` : hours
	}:${
		minutes < 10 ? `0${minutes}` : minutes
	}`;
}

function init(){
	getNow();
	setInterval(getNow, 1000);
}

init();
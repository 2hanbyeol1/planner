const plannerForm = document.querySelector(".planner-form"),
	subjectInput = document.querySelector(".subject_input"),
	contentInput = document.querySelector(".content_input"),
	plannerTable = document.querySelector(".planner-table"),
	plannerTBody = plannerTable.querySelector("tbody"),
	none = document.querySelector(".none");

const TABLE_LOCALSTORAGE = "TABLE",
	VISIBLE_CLASSNAME = "visible";

let table = [];

function invisibleNone(){
	none.classList.remove(VISIBLE_CLASSNAME);
}

function addRow(subjectValue, contentValue, isChecked){
	invisibleNone();
	const tr = document.createElement("tr");
	const subject = document.createElement("td");
	subject.innerText = `${subjectValue}`;
	const content = document.createElement("td");
	content.innerText = `${contentValue}`;
	const check = document.createElement("td");
	const checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.checked = isChecked;
	plannerTBody.appendChild(tr);
	tr.appendChild(subject);
	tr.appendChild(content);
	tr.appendChild(check);
	check.appendChild(checkBox);
	const newRow = {
			subjectValue: subjectValue,
			contentValue: contentValue,
			isChecked: isChecked
	};
	table.push(newRow);
	saveTable();
}

function tableSubmit(){
	event.preventDefault();
	const subject = subjectInput.value;
	const content = contentInput.value;
	if(subject === "" || content === ""){ //공백확인
		alert('과목과 내용을 입력해주세요!');
	} else {
		addRow(subject, content, false);
		subjectInput.value = "";
		contentInput.value = "";
	}
}

function saveTable(){
	localStorage.setItem(TABLE_LOCALSTORAGE, JSON.stringify(table));
}

function loadTable(){
	const loadedTable = localStorage.getItem(TABLE_LOCALSTORAGE);
	if(loadedTable !== null){
		//String > Array
		const parsedTable = JSON.parse(loadedTable);
		if(parsedTable.length !== 0){
			for(var i = 0; i < parsedTable.length; i++){
				addRow(parsedTable[i].subjectValue, parsedTable[i].contentValue, parsedTable[i].isChecked);
			};
		}
	}
}

function init(){
	loadTable();
	plannerForm.addEventListener("submit", tableSubmit);
}

init();
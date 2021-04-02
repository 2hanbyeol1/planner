const plannerForm = document.querySelector(".planner-form"),
	subjectInput = document.querySelector(".subject_input"),
	contentInput = document.querySelector(".content_input"),
	plannerTable = document.querySelector(".planner-table"),
	plannerTBody = plannerTable.querySelector("tbody"),
	none = document.querySelector(".none");

const TABLE_LOCALSTORAGE = "TABLE",
	VISIBLE_CLASSNAME = "visible";

let table = [];

function visibleNone(){
	none.classList.add(VISIBLE_CLASSNAME);
}

function invisibleNone(){
	none.classList.remove(VISIBLE_CLASSNAME);
}

function deleteRow(event){
	const del = confirm("삭제하시겠습니까?");
	if(del == true){
		const td = event.target;
		const tr = td.parentNode;
		const tbody = tr.parentNode;
		tbody.removeChild(tr);
		//저장
		const newTable = table.filter(function(table){
			return table.id !== parseInt(tr.id);
		});
		table = newTable;
		saveTable();
		//nothing to do
		if(table.length === 0){
			visibleNone();
		}
	}
}

function checkBoxChange(event){
	const checkBox = event.target;
	const td = checkBox.parentNode;
	const tr = td.parentNode;
	const isChecked = checkBox.checked;
	//저장
	for(var i = 0; i < table.length; i++){
		if(table[i].id === parseInt(tr.id)){
			table[i].isChecked = isChecked;
		};
	}
	saveTable();
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
	tr.addEventListener("click", deleteRow);
	check.appendChild(checkBox);
	checkBox.addEventListener("change", checkBoxChange);
	const id = table.length + 1;
	tr.id = id;
	const newRow = {
			id: id,
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

let tds; //td 변수
let prevIndex=0, index=0; //prevIndex 블록 이전 위치, index
let front=0,back=0; //이차 배열 접근 변수
let score=0; //점수
let block;
let level;
let table= document.getElementById("table");
const color = ["red", "green","blue"] //블록 전체 색
let timerID; 
let setColor= color[Math.floor(Math.random()*3)]; //무작위 색
let nextSetColor; //다음 블록 색
let size = prompt("영역 크기를 설정하세요"); //테이블 크기 입력
size=parseInt(size); //size 정수로 변환
let arr = new Array(size); //삭제 되어야 할 블록 위치 표시 이차배열 
for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(size);
}

function setting(){ //테이블 생성
	let str="";
	for(let i=0;i<size;i++){
		str+="<tr>"
		for(let j=0;j<size;j++){
			str+="<td></td>"
		}
		str+="</tr>"
	}
	table.innerHTML=str;
	startgame();//게임 시작 함수 호출
}	
	


function initArray(){ // 이차 배열 초기화
	for(let i=0;i<size;i++){
		for(let j=0;j<size;j++){
			arr[i][j]=0;
		}
	}
}
function startgame() { // 게임시작 함수
	tds = document.getElementsByTagName("td");	
	block = document.getElementById("block");
	level = document.getElementById("level");
	for(let i=0;i<size*size;i++){ //테이블 배경색 white로 초기화
		tds[i].style.backgroundColor = "white";
	}
	tds[index].style.backgroundColor = setColor; // index위치에 색변경
	nextSetColor= color[Math.floor(Math.random()*3)]; //다음 블록 무작위 색 설정
	block.style.backgroundColor= nextSetColor; // 다음 블록 색 표시
	initArray(); // 이차 배열 초기화 호출
	timerID= setInterval("falling()",1000); //1초 간격으로 falling 호출
}
window.onkeydown = function (e) { //키입력 시 index 변화
	switch(e.code) {
		case "Space" : //space입력 시 바로 블록 내리기
			if(index/size >= (size-1)) return;
			else if(tds[index+size].style.backgroundColor != "white") return;
			while(index/size < (size-1)){
				if(tds[index+size].style.backgroundColor != "white"){
					return;
				}
				index += size;
			}
			break;
		case "ArrowLeft" : //블록 왼쪽으로 이동
			if(index%size == 0) return; // 맨 왼쪽 셀의 경우
			else if(tds[index-1].style.backgroundColor != "white") return;
			index--; 
			break;
		case "ArrowRight" : //블록 오른쪽으로 이동
			if(index%size == (size-1)) return; // 맨 오른쪽 셀의 경우
			else if(tds[index+1].style.backgroundColor != "white") return;
			index++; 
			break;
	}
	tds[index].style.backgroundColor = setColor;
	tds[prevIndex].style.backgroundColor = "white";
	prevIndex = index;
	
}

function falling(){
	if(index/size >= (size-1)){ //table 바닥에 위치시
		clearInterval(timerID);
		tds[prevIndex].style.backgroundColor = "white";
		tds[index].style.backgroundColor = setColor;
		remove(); // 블록 삭제
		gameOverCheck(); // 게임 오버인지 체크
		newNode(); //새로운 블록 생성
		return;
	}
	else if(tds[index+size].style.backgroundColor != "white"){ //다른 블록 위에 위치시
		clearInterval(timerID); 
		tds[prevIndex].style.backgroundColor = "white";
		tds[index].style.backgroundColor = setColor;
		remove(); // 블록 삭제
		gameOverCheck(); // 게임 오버인지 체크
		newNode(); //새로운 블록 생성
		return;
	}
	index += size;
	tds[index].style.backgroundColor = setColor;
	tds[prevIndex].style.backgroundColor = "white";
	prevIndex = index;
}
function newNode(){ //새로운 블록 생성
	index=0;
	prevIndex = index;
	tds[index].style.backgroundColor = block.style.backgroundColor;
	setColor= block.style.backgroundColor
	block.style.backgroundColor=color[Math.floor(Math.random()*3)]; //다음 블록 무작위 색 설정
	if(score<1000){ //점수가 1000 미만
		timerID = setInterval("falling()",1000); //1초마다
		level.innerText= "level: 1"; 
	}
	else if(score<2000){ //점수가 2000 미만
		timerID = setInterval("falling()",900); //0.9초마다
		level.innerText= "level: 2"; 
	}
	else if(score<3000){ //점수가 3000 미만
		timerID = setInterval("falling()",700); //0.7초 마다
		level.innerText= "level: 3"; 
	}
	else if(score<4000){ //점수가 4000 미만
		timerID = setInterval("falling()",600); //0.6초마다
		level.innerText= "level: 4"; 
	}
	else if(score<5000){ //점수가 5000 미만
		timerID = setInterval("falling()",500); //0.5초마다
		level.innerText= "level: 5"; 
	}
	else{ //점수가 5000이상 
		timerID = setInterval("falling()",300); //0.3초마다
		level.innerText= "level: 6"; 
	}
	
}
function remove(){ //연속되는 블록이 3이상일시 블록 제거 후 블록 재배치
	horizontalCheck();//수평선 검사
	verticalCheck(); //수직선 검사
	diagonalCheck(); //대각선 검사
	totalremove(); //블록 제거
	relocation(); //블록 공백 채우기
}
function horizontalCheck(){//수평선 검사
	let count=0; //3연속 블록 확인 변수 
	let searchColor;
	for(let m =0;m<3;m++){ //3가지 색 순차적으로 탐색
		searchColor=color[m];
		for(let horizontality =0;horizontality<size*size;horizontality+=size){
			for(let i=0; i<size;i++){
				if(tds[horizontality+i].style.backgroundColor==searchColor){// 탐색 색과 일치시
					count++;
					if((horizontality+i)%size == (size-1)){ //가장오른쪽 셀 접근시
						if(count>=3){ //3연속 이상
							for(let j=count-1;j>=0;j--){
								front=Math.floor((horizontality+i-j)/size);
								back=(horizontality+i-j)%10;
								arr[front][back] = 1;
							}
						}
					}
					else{
						if(tds[horizontality+i+1].style.backgroundColor!=searchColor && count>=3){
							//탐색 다음 블록이 탐색 색이이 아니고 3연속 이상일 시
							for(let j=count-1;j>=0;j--){
								front=Math.floor((horizontality+i-j)/size);
								back=(horizontality+i-j)%size;
								arr[front][back] = 1;
							}
						}
					}
					
				}
				else{//탐색 색과 불일치 시
					count=0; 
				}
			}
			count=0;
		}
	}
	
}
function verticalCheck(){//수직선 검사
	let count=0;//3연속 블록 확인 변수
	let searchColor;
	for(let m =0;m<3;m++){ //3가지 색 순차적으로 탐색
		searchColor=color[m];
		for(let vertical =0;vertical<size;vertical++){
			for(let i=0; i<size*size; i+=size){
				if(tds[vertical+i].style.backgroundColor==searchColor){// 탐색 색과 일치시
					count++;
					if((vertical+i)/size >= (size-1)){ //가장아래 셀 접근시
						if(count>=3){//3연속 이상
							for(let j=count-1;j>=0;j--){
								front=Math.floor((vertical+i-j*size)/size);
								back=(vertical+i-j*size)%size;
								arr[front][back] = 1;
							}
						}
					}
					else{
						if(tds[vertical+i+size].style.backgroundColor!=searchColor && count>=3){
							//탐색 다음 블록이 탐색 색이이 아니고 3연속 이상일 시
							for(let j=count-1;j>=0;j--){
								front=Math.floor((vertical+i-j*size)/size);
								back=(vertical+i-j*size)%size;
								arr[front][back] = 1;
							}
						}
					}
					
				}
				else{
					count=0;
				}
			}
			count=0;
		}
	}
	
}
function diagonalCheck(){ //대각선 검사
	let count=0;//3연속 블록 확인 변수
	let searchColor;
	for(let m =0;m<3;m++){ //3가지 색 순차적으로 탐색
		searchColor=color[m];
		for(let diagonal=(size*size)-size;diagonal>=0;diagonal-=size){ 
			//가장 왼쪽 아래 셀을 시작 기준으로 위로 탐색 
			for(let k=0;k<size*size;k+=(size+1)){
				if(tds[diagonal+k].style.backgroundColor==searchColor){ // 탐색 색과 일치시
					count++;
					if((diagonal+k)/size >= (size-1)){ //가장아래 셀 접근시
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size+1))/size);
								back=(diagonal+k-j*(size+1))%size;
								arr[front][back] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+(size+1)].style.backgroundColor!=searchColor && count>=3){
							//탐색 다음 블록이 탐색 색이이 아니고 3연속 이상일 시
							for(let j=count-1;j>=0;j--){ //3연속 이상
								front=Math.floor((diagonal+k-j*(size+1))/size);
								back=(diagonal+k-j*(size+1))%size;
								arr[front][back] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)/size >= (size-1)){ //가장아래 셀 접근시
						break;
					}
				}
			}
			count=0;
		}
		for(let diagonal=1;diagonal<size;diagonal++){
			//가장 왼쪽 다음. 가장 위 셀을 시작 기준으로 오른쪽로 탐색
			for(let k=0;k<size*size;k+=(size+1)){
				if(tds[diagonal+k].style.backgroundColor==searchColor){ // 탐색 색과 일치시
					count++;
					if((diagonal+k)%size == (size-1)){ //가장 오른쪽 셀 접근시
						if(count>=3){ //3연속 이상
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size+1)))/size;
								back=(diagonal+k-j*(size+1))%size;
								arr[front][back] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+(size+1)].style.backgroundColor!=searchColor && count>=3){
							//탐색 다음 블록이 탐색 색이이 아니고 3연속 이상일 시
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size+1))/size);
								back=(diagonal+k-j*(size+1))%size;
								arr[front][back] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)%size == (size-1)){ //가장 오른쪽 셀 접근시
						break;
					}
				}
			}
			count=0;
		}


		for(let diagonal=size*size-1;diagonal>=0;diagonal-=size){
			//가장 오른쪽 아래 셀을 시작 기준으로 위로 탐색 
			for(let k=0;k<size*size;k+=(size-1)){
				if(tds[diagonal+k].style.backgroundColor==searchColor){ // 탐색 색과 일치시
					count++;
					if((diagonal+k)/size >= (size-1)){ //가장아래 셀 접근시
						if(count>=3){ //3연속 이상
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size-1))/size);
								back=(diagonal+k-j*(size-1))%size;
								arr[front][back] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+(size-1)].style.backgroundColor!=searchColor && count>=3){
							//탐색 다음 블록이 탐색 색이이 아니고 3연속 이상일 시
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size-1))/size);
								back=(diagonal+k-j*(size-1))%size;
								arr[front][back] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)/size >= (size-1)){ //가장아래 셀 접근시
						break;
					}
				}
			}
			count=0;
		}
		for(let diagonal=(size-1);diagonal>0;diagonal--){
			//가장 오른쪽 전. 가장 위 셀을 시작 기준으로 오른쪽로 탐색
			for(let k=0;k<size*size;k+=(size-1)){
				if(tds[diagonal+k].style.backgroundColor==searchColor){
					count++;
					if((diagonal+k)%size == 0){ //가장왼쪽 셀 접근시
						if(count>=3){ //3연속 이상
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size+1))/size);
								back=(diagonal+k-j*(size+1))%size;
								arr[front][back] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+(size-1)].style.backgroundColor!=searchColor && count>=3){
							//탐색 다음 블록이 탐색 색이이 아니고 3연속 이상일 시
							for(let j=count-1;j>=0;j--){
								front=Math.floor((diagonal+k-j*(size+1))/size);
								back=(diagonal+k-j*(size+1))%size;
								arr[front][back] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)%size == 0){ //가장왼쪽 셀 접근시
						break;
					}
				}
			}
			count=0;
		}
	}
	
}
function totalremove(){ //블록 제거
	for(let i=0;i<size;i++){
		for(let j=0;j<size;j++){
			if(arr[i][j]==1){
				tds[i*size+j].style.backgroundColor="white"
				score+=100; //블록 당 100점 추가
			}
		}
	}
	scorePrint();
	initArray();
}
function relocation(){ //블록 공백 채우기
	let flag = false; //삭제 공백 있을시 true 
	let flag1 = false; //삭제 공백 있을시 true 
	do{
		flag=false;
		for(let i=size;i<size*size;i++){
			if(tds[i].style.backgroundColor=="white" && tds[i-size].style.backgroundColor!="white"){
				tds[i].style.backgroundColor=tds[i-size].style.backgroundColor;
				tds[i-size].style.backgroundColor="white";
				flag=true;
				flag1=true;
			}
		}
		
	}while(flag);//삭제 공백 없을 때 까지
	if(flag1){ //삭제 공백이 있었으면 삭제 체크
		remove(); 
	}
}
function scorePrint(){ //점수 최신화
	document.getElementById("score").innerText="점수: " + score;
}
function gameOverCheck(){ //게임오버시 alert호출 웹페이지 새로 고침
	for(let i=0;i<size;i++){
		if(tds[i].style.backgroundColor !="white"){
			alert("GAME OVER");
			window.location.reload();
		}
	}
}
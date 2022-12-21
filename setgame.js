let tds;
let prevIndex=0, index=0;
const color = ["red", "green","blue"]
let timerID = setInterval("falling()",1000);
let setColor= color[Math.floor(Math.random()*3)]; 
window.onload = function () { // 웹 페이지의 로딩 완료시 실행
	tds = document.getElementsByTagName("td");	
	
	for(let i=0;i<100;i++){
		tds[i].style.backgroundColor = "white";
	}
	tds[index].style.backgroundColor = setColor;
}
window.onkeydown = function (e) {
	switch(e.key) {
		case "ArrowDown" : 
			if(index/10 >= 9) return;
			else if(tds[index+10].style.backgroundColor != "white") return; // 맨 위 셀의 경우
			index += 10;
			break;
		case "ArrowUp" : 
			if(index/10 < 1) return; // 맨 아래 셀의 경우
			index -= 10;
			break;
		case "ArrowLeft" : 
			if(index%10 == 0) return; // 맨 왼쪽 셀의 경우
			index--; 
			break;
		case "ArrowRight" : 
			if(index%10 == 9) return; // 맨 오른쪽 셀의 경우
			index++; 
			break;
	}
	tds[index].style.backgroundColor = setColor;
	tds[prevIndex].style.backgroundColor = "white";
	prevIndex = index;
	
}

function falling(){
	if(index/10 >= 9){
		clearInterval(timerID);
		tds[prevIndex].style.backgroundColor = "white";
		tds[index].style.backgroundColor = setColor;
		remove();
		newNode();
		return;
	}
	else if(tds[index+10].style.backgroundColor != "white"){
		clearInterval(timerID);
		tds[prevIndex].style.backgroundColor = "white";
		tds[index].style.backgroundColor = setColor;
		remove()
		newNode();
		return;
	}
	index += 10;
	tds[index].style.backgroundColor = setColor;
	tds[prevIndex].style.backgroundColor = "white";
	prevIndex = index;
}
function newNode(){
	
	index=0;
	prevIndex = index;
	setColor= color[Math.floor(Math.random()*3)]; 
	tds[index].style.backgroundColor = setColor;
	timerID = setInterval("falling()",1000);
}
function remove(){
	horizontalRemove();
	verticalRemove();
	relocation();
}
function horizontalRemove(){
	let count=0;
	let searchColor;
	//let horizontality = Math.floor(index / 10) * 10
	for(let m =0;m<3;m++){
		searchColor=color[m];
		for(let horizontality =0;horizontality<100;horizontality+=10){
			for(let i=0; i<10;i++){
				if(tds[horizontality+i].style.backgroundColor==searchColor){
					count++;
					if((horizontality+i)%10 == 9){
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								tds[horizontality+i-j].style.backgroundColor="white"
							}
						}
					}
					else{
						if(tds[horizontality+i+1].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								tds[horizontality+i-j].style.backgroundColor="white"
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
function verticalRemove(){
	let count=0;
	let searchColor;
	//let vertical = index%10;
	for(let m =0;m<3;m++){
		searchColor=color[m];
		for(let vertical =0;vertical<10;vertical++){
			for(let i=0; i<100; i+=10){
				if(tds[vertical+i].style.backgroundColor==searchColor){
					count++;
					if((vertical+i)/10 >= 9){
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								tds[vertical+i-j*10].style.backgroundColor="white"
							}
						}
					}
					else{
						if(tds[vertical+i+10].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								tds[vertical+i-j*10].style.backgroundColor="white"
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
function relocation(){
	let flag=false;
	let flag1 = false;
	do{
		flag=false;
		for(let i=10;i<100;i++){
			if(tds[i].style.backgroundColor=="white" && tds[i-10].style.backgroundColor!="white"){
				tds[i].style.backgroundColor=tds[i-10].style.backgroundColor;
				tds[i-10].style.backgroundColor="white";
				flag=true;
				flag1=true;
			}
		}
		
	}while(flag);
	if(flag1){
		remove();
	}
}
let tds;
let prevIndex=0, index=0;
let ten=0,one=0;
let score=0;
let block;
let level;
const color = ["red", "green","blue"]
let timerID = setInterval("falling()",1000);
let setColor= color[Math.floor(Math.random()*3)]; 
let presetColor;
let arr = new Array(10);
for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(10);
}
function initArray(){
	for(let i=0;i<10;i++){
		for(let j=0;j<10;j++){
			arr[i][j]=0;
		}
	}
}
window.onload = function () { // 웹 페이지의 로딩 완료시 실행
	tds = document.getElementsByTagName("td");	
	block = document.getElementById("block");
	level = document.getElementById("level");
	for(let i=0;i<100;i++){
		tds[i].style.backgroundColor = "white";
	}
	tds[index].style.backgroundColor = setColor;
	presetColor= color[Math.floor(Math.random()*3)];
	block.style.backgroundColor= presetColor;
	initArray();
}
window.onkeydown = function (e) {
	switch(e.code) {
		case "Space" :
			if(index/10 >= 9) return;
			else if(tds[index+10].style.backgroundColor != "white") return;
			while(index/10 < 9){
				if(tds[index+10].style.backgroundColor != "white"){
					return;
				}
				index += 10;
			}
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
		gameOverCheck();
		newNode();
		return;
	}
	else if(tds[index+10].style.backgroundColor != "white"){
		clearInterval(timerID);
		tds[prevIndex].style.backgroundColor = "white";
		tds[index].style.backgroundColor = setColor;
		remove();
		gameOverCheck();
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
	tds[index].style.backgroundColor = block.style.backgroundColor;
	setColor= block.style.backgroundColor
	block.style.backgroundColor=color[Math.floor(Math.random()*3)];
	if(score<1000){
		timerID = setInterval("falling()",1000);
		level.innerText= "level: 1"; 
	}
	else if(score<2000){
		timerID = setInterval("falling()",900);
		level.innerText= "level: 2"; 
	}
	else if(score<3000){
		timerID = setInterval("falling()",700);
		level.innerText= "level: 3"; 
	}
	else if(score<4000){
		timerID = setInterval("falling()",600);
		level.innerText= "level: 4"; 
	}
	else if(score<5000){
		timerID = setInterval("falling()",500);
		level.innerText= "level: 5"; 
	}
	else{
		timerID = setInterval("falling()",300);
		level.innerText= "level: 6"; 
	}
	
}
function remove(){
	horizontalRemove();
	verticalRemove();
	diagonalRemove();
	totalremove();
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
								//tds[horizontality+i-j].style.backgroundColor="white"
								ten=Math.floor((horizontality+i-j)/10);
								one=(horizontality+i-j)%10;
								arr[ten][one] = 1;
							}
						}
					}
					else{
						if(tds[horizontality+i+1].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[horizontality+i-j].style.backgroundColor="white"
								ten=Math.floor((horizontality+i-j)/10);
								one=(horizontality+i-j)%10;
								arr[ten][one] = 1;
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
								//tds[vertical+i-j*10].style.backgroundColor="white"
								ten=Math.floor((vertical+i-j*10)/10);
								one=(vertical+i-j*10)%10;
								arr[ten][one] = 1;
							}
						}
					}
					else{
						if(tds[vertical+i+10].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[vertical+i-j*10].style.backgroundColor="white"
								ten=Math.floor((vertical+i-j*10)/10);
								one=(vertical+i-j*10)%10;
								arr[ten][one] = 1;
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
function diagonalRemove(){
	let count=0;
	let searchColor;
	let diagonal;
	for(let m =0;m<3;m++){
		searchColor=color[m];
		for(let diagonal=90;diagonal>=0;diagonal-=10){
			for(let k=0;k<100;k+=11){
				if(tds[diagonal+k].style.backgroundColor==searchColor){
					count++;
					if((diagonal+k)/10 >= 9){
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*11].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*11)/10);
								one=(diagonal+k-j*11)%10;
								arr[ten][one] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+11].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*11].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*11)/10);
								one=(diagonal+k-j*11)%10;
								arr[ten][one] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)/10 >= 9){
						break;
					}
				}
			}
			count=0;
		}
		for(let diagonal=1;diagonal<10;diagonal++){
			for(let k=0;k<100;k+=11){
				if(tds[diagonal+k].style.backgroundColor==searchColor){
					count++;
					if((diagonal+k)%10 == 9){
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*11].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*11))/10;
								one=(diagonal+k-j*11)%10;
								arr[ten][one] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+11].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*11].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*11)/10);
								one=(diagonal+k-j*11)%10;
								arr[ten][one] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)%10 == 9){
						break;
					}
				}
			}
			count=0;
		}


		for(let diagonal=99;diagonal>=0;diagonal-=10){
			for(let k=0;k<100;k+=9){
				if(tds[diagonal+k].style.backgroundColor==searchColor){
					count++;
					if((diagonal+k)/10 >= 9){
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*9].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*9)/10);
								one=(diagonal+k-j*9)%10;
								arr[ten][one] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+9].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*9].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*9)/10);
								one=(diagonal+k-j*9)%10;
								arr[ten][one] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)/10 >= 9){
						break;
					}
				}
			}
			count=0;
		}
		for(let diagonal=9;diagonal>0;diagonal--){
			for(let k=0;k<100;k+=9){
				if(tds[diagonal+k].style.backgroundColor==searchColor){
					count++;
					if((diagonal+k)%10 == 0){
						if(count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*11].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*11)/10);
								one=(diagonal+k-j*11)%10;
								arr[ten][one] = 1;
							}
						}
						break;
					}
					else{
						if(tds[diagonal+k+9].style.backgroundColor!=searchColor && count>=3){
							for(let j=count-1;j>=0;j--){
								//tds[diagonal+k-j*11].style.backgroundColor="white"
								ten=Math.floor((diagonal+k-j*11)/10);
								one=(diagonal+k-j*11)%10;
								arr[ten][one] = 1;
							}
						}
					}
				}
				else{
					count=0;
					if((diagonal+k)%10 == 0){
						break;
					}
				}
			}
			count=0;
		}
	}
	
}
function totalremove(){
	for(let i=0;i<10;i++){
		for(let j=0;j<10;j++){
			if(arr[i][j]==1){
				tds[i*10+j].style.backgroundColor="white"
				score+=100;
			}
		}
	}
	scorePrint();
	initArray();
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
function scorePrint(){
	document.getElementById("score").innerText="점수: " + score;
}
function gameOverCheck(){
	for(let i=0;i<10;i++){
		if(tds[i].style.backgroundColor !="white"){
			alert("GAME OVER");
			exit(true)
		}
	}
}
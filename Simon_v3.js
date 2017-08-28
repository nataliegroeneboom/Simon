
var playing = ['#green','#red','#blue','#yellow'];
var counter=0;
var timeOut;

var sound={
	sound_red:new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	sound_green:new Audio(' https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	sound_yellow:new Audio(' https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	sound_blue:new Audio(' https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
	sound_fail:new Audio('https://raw.githubusercontent.com/nataliegroeneboom/Simon/master/fail.mp3'),
	sound_win:new Audio('https://raw.githubusercontent.com/nataliegroeneboom/Simon/master/tada.mp3'),
	sound_applaud:new Audio('https://raw.githubusercontent.com/nataliegroeneboom/Simon/master/applaud.mp3')

}

var Simon = {
	on:false,
	start:false,
	strict:false,
	turn:true,
	reset:function(){
		counter=0;
		$('#count').html(counter);
		SimonAnswer.count=0;
		SimonResponse.response=[];
	}

	
  
  
};
var SimonAnswer = {
	answer:0,
	count:0,
	id:'',
	colour:''
};
var SimonResponse={
	response:[],
	play:function(){
		let randomCall = Math.floor(Math.random()*4);
		return randomCall;
	}
	
}; 



function letsGo(){
let i=0
function allFour(){
	console.log(SimonResponse.response);
  let btn=playing[SimonResponse.response[i]];
  let highlightClass = btn.slice(1);
  $(btn).addClass('active-'+highlightClass);
  switch(highlightClass){
	  case 'red':sound.sound_red.play();break;
	  case 'green':sound.sound_green.play();break;
	  case 'yellow':sound.sound_yellow.play();break;
	  case 'blue':sound.sound_blue.play();break;
	  case 'fail':sound.sound_fail.play();break;
  }
  
  let check = setTimeout(function(){
    $(btn).removeClass('active-'+highlightClass);
  },600);
  i++;
  if(i<SimonResponse.response.length){
    setTimeout(allFour,700);
  }
} 
 allFour(); 
}

function win(){
	
		
		  $('#green').addClass('active-green');	
		  $('#red').addClass('active-red');	
		  $('#yellow').addClass('active-yellow');
		$('#blue').addClass('active-blue');
		sound.sound_win.addEventListener('ended',function(){
			sound.sound_applaud.play();
			Simon.reset();
			Simon.start=false;
			$('#start').css('background-color','red');
			
		});
		sound.sound_win.play();
		var check=setTimeout(function(){
    $('#green').removeClass('active-green');	
		  $('#red').removeClass('active-red');	
		  $('#yellow').removeClass('active-yellow');
		$('#blue').removeClass('active-blue');
	
   
   },1000);
}

function nextCounter(){
	SimonResponse.response.push(SimonResponse.play());
	counter++;
	$("#count").html(counter);
	SimonAnswer.count=0;
	setTimeout(letsGo,1000);
}

function checkGame(){
	let idx = SimonAnswer.count;
	let arr = SimonResponse.response;
	let ans = SimonAnswer.answer;
if(arr.length-1===idx&&arr[idx]===ans&&counter===20){
	win();
}
else if(arr.length-1===idx&&arr[idx]===ans){
	console.log('you have correctly repeated, next level');
	nextCounter();
}else if(arr[idx]!==ans){
	
	console.log('you have made a mistake');
	if(!Simon.strict){
	SimonAnswer.count=0;
	setTimeout(letsGo,1700);
	}else{
		Simon.reset();
		  $('#green').addClass('active-green');	
		  $('#red').addClass('active-red');	
		  $('#yellow').addClass('active-yellow');
		$('#blue').addClass('active-blue');			  
		var check=setTimeout(function(){
    $('#green').removeClass('active-green');	
		  $('#red').removeClass('active-red');	
		  $('#yellow').removeClass('active-yellow');
		$('#blue').removeClass('active-blue');
	nextCounter();
   
   },1000);
	}
}else{
	SimonAnswer.count++;
}
	
}

function validate(a){
		let res;
	if(playing.indexOf(a)===SimonResponse.response[SimonAnswer.count]){
		return res=true;
	}else{
		return res=false;
	
	}
}




function highlightClicked(a,b){
	let c=a.slice(1);
  $(a).addClass('active-'+c);
  switch(b){
	  case 'red':sound.sound_red.play();break;
	  case 'green':sound.sound_green.play();break;
	  case 'yellow':sound.sound_yellow.play();break;
	  case 'blue':sound.sound_blue.play();break;
	  case 'fail':sound.sound_fail.play(); break;
  }

	  SimonAnswer.answer = playing.indexOf(a);
if(b=='fail'){
   var check=setTimeout(function(){
    $(a).removeClass('active-'+c);
   
   },1000);
}else{
	check=setTimeout(function(){
    $(a).removeClass('active-'+c);
   
   },400); 
 }
 checkGame();
	  
   
} 


$(document).ready(function(){
 
  
  /* https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, https://s3.amazonaws.com/freecodecamp/simonSound4.mp3 */
var timeEnded;

  $('.button').on('click',function(e){	  
  let id = "#"+e.target.id;
  let indx;
  if(validate(id)){
	if(SimonResponse.response-1===SimonAnswer.count&&counter===5){
		win();
	}  
  indx =e.target.id;
  highlightClicked(id,indx);
  }else{
	indx='fail';
	highlightClicked(id,indx);
  }
   
  });
  
  $('.slider').on('click',function(event){
	  if(!Simon.on){
		  Simon.on=true;
		  $('#off').removeClass('colour');
		  $('#on').addClass('colour');
		  $('#count').html('--');
	  }else{
		  Simon.reset();
		  Simon.on=false;
		  $('#on').removeClass('colour');
		  $('#off').addClass('colour');
		  $('#count').html('');
		  Simon.start=false;
		$('#start').css('background-color','red');
		  Simon.strict=false;
		$('#strict').css({'background-color':'',
						'opacity':''}); 
	  }
			
  });
  
  
  
  $("#start").on('click', function(){
	 if(Simon.on){
			Simon.reset();
			 Simon.start=true;
			 $('#start').css('background-color','green');
			 $('#count').html('0');
			 nextCounter();
		 }

	  
  });
  $('#strict').on('click', function(){
	  if(Simon.on){
		  if(!Simon.strict){
			  Simon.strict=true;
			  $('#strict').css({'background-color':'#FFFF00',
								'opacity':'1'});  
			  
		  }else{
			Simon.strict=false;
			$('#strict').css({'background-color':'',
								'opacity':''});
		  }
		  
		  
	  }
	  
	  
  });
  
});
var time = 0;
var set_timer;

var pause = true;

var block = new Array(10);


var block_direction = new Array(
  [0],
  [2,4],
  [1,3,5],
  [2,6],
  [1,5,7],
  [2,4,6,8],
  [3,5,9],
  [4,8],
  [5,7,9],
  [6,8]
);

var block_position = new Array(
  [0],
  [0,0],
  [150,0],
  [300,0],
  [0,150],
  [150,150],
  [300,150],
  [0,300],
  [150,300],
  [300,300]
);

//initialize d as default order
//0 means no block on the location
block[1] = 1;
block[2] = 2;
block[3] = 3;
block[4] = 4;
block[5] = 5;
block[6] = 6;
block[7] = 7;
block[8] = 8;
block[9] = 0;

function move(id){
  if(!pause){
    var i = 1;
    //find the location of the block in the board
    for(i=1; i< 10; ++i){
      if(block[i] == id){
        break;
      }
    }
    var target_dir = move_dir(i);
    if(target_dir != 0){
      block[i] = 0;
      block[target_dir] = id;

      document.getElementById("block"+id).style.left=block_position[target_dir][0]+"px";
      document.getElementById("block"+id).style.top=block_position[target_dir][1]+"px";

    }
  }
  var finish_flag=true;
  for(var k=1; k<9; ++k){
      if( block[k] != k){
          finish_flag=false;
          break;
        }
  }
  if(finish_flag==true){
      if(!pause)
          start();
      alert("Congratulations!!");
  }
}

function move_dir(curr_loc){
    var j = 0;
    var canMove = false;
    for(j=0; j<block_direction[curr_loc].length;++j){
      //check if there is a block occupied in the available directions
      if(block[block_direction[curr_loc][j]] == 0){
        canMove = true;
        break;
      }
    }

    if(canMove == true){
      return block_direction[curr_loc][j];
    }
    else{
      return 0;
    }
}

function timer(){
  time +=1;
  var min = parseInt(time/60);
  var sec = time%60;
  document.getElementById("timer").innerHTML = min + "min" + sec + "sec";

}

function start(){
  if(pause){
    document.getElementById("start").innerHTML = "Pause";
    pause = false;
    set_timer = setInterval(timer,1000); //execute the function every 1 sec

  }
  else{
    document.getElementById("start").innerHTML = "Start";
    pause = true;
    clearInterval(set_timer);
  }
}
function reset(){
  time = 0;
  random_block();
  if(pause){
    start();
  }
}
function random_block(){
  for(var i=9; i>1; --i){
    var random_loc = parseInt(Math.random()*(i-1)+1);
    if(block[i]!=0){
      document.getElementById("block"+block[i]).style.left=block_position[random_loc][0]+"px";
      document.getElementById("block"+block[i]).style.top=block_position[random_loc][1]+"px";

    }
    if(block[random_loc]!=0){
            document.getElementById("block"+block[random_loc]).style.left=block_position[i][0]+"px";
            document.getElementById("block"+block[random_loc]).style.top=block_position[i][1]+"px";
        }
    var temp = block[random_loc];
    block[random_loc] = block[i];
    block[i] = temp;
  }
}
window.onload=function(){
    reset();
  }

var main_svg=0;
var all_hz_svg_texts=[];
var all_vert_svg_texts=[];

var current_action=-1;//not changing squares

$(document).ready(function() //or $(function()
  {
    $(document)[0].addEventListener('mouseup', mouseUp, false);

    $('#svgbasics')[0].oncontextmenu = function() {return false;} //remove left click menu on svg part
    
    $('#svgbasics').svg({onLoad: drawGrid});
    
  }
);


function compute_hz_numbers(grid)
{
  hz_numbers=[];
  
  for (j=0;j<grid.length;j++)
  {
    line_numbers=[];
    accumulator=0;
    for (i=0;i<grid[j].length;i++)
    {
      if (grid[j][i]==1) 
      {
        accumulator+=1;
      }
      if ((grid[j][i]==0)&&(accumulator>0))
      {
        line_numbers.push(accumulator);
        accumulator=0;
      }
    }
    if (accumulator>0) line_numbers.push(accumulator);
    if (line_numbers.length==0) line_numbers.push(0);
    
    hz_numbers.push(line_numbers);
  }
  return hz_numbers;
}

function compute_vert_numbers(grid)
{
  hz_numbers=[];
  for (i=0;i<grid.length;i++)
  {
    line_numbers=[];
    accumulator=0;
    for (j=0;j<grid[i].length;j++)
    {
      if (grid[j][i]==1) 
      {
        accumulator+=1;
      }
      if ((grid[j][i]==0)&&(accumulator>0))
      {
        line_numbers.push(accumulator);
        accumulator=0;
      }
    }
    if (accumulator>0) line_numbers.push(accumulator);
    if (line_numbers.length==0) line_numbers.push(0);
    
    hz_numbers.push(line_numbers);
  }
  return hz_numbers;
}


function check_grid()
{
  console.log("Current ",current_grid);
  console.log("Solution ",grid_solution);
  for (j = 0; j < grid_cols; j++)
    for (i = 0; i < grid_cols; i++)
    {
      //console.log("Check ",current_grid[j][i]," ",grid_solution[j][i]);
      if (current_grid[j][i]!=grid_solution[j][i])
        return false;
    }
  
  alert("Fini!");
  current_action=-1;
  return true;
}

function updateSquare(square,button)
{
  var square_status=square.getAttribute("status"); 
  console.log(button);
  if (button==0)
  {
    if (square_status!=1)
    {
      square.setAttribute("status", 1); 
      square.setAttribute("fill", 'black');
      current_action=1;
      current_grid[square.getAttribute("line")][square.getAttribute("col")]=1;
    }else{
      square.setAttribute("status", 0); 
      square.setAttribute("fill", 'white');
      current_action=0;
      current_grid[square.getAttribute("line")][square.getAttribute("col")]=0;
    }
  }else{
    if (square_status!=2)
    {
      square.setAttribute("status", 2); 
      square.setAttribute("fill", 'gray');
      current_action=2;

      ///TODO: draw an x ?
    }else{
      square.setAttribute("status", 0); 
      square.setAttribute("fill", 'white');
      current_action=0;
    }
  }
  check_grid();
}

function updateSquareAction(square,action)
{
  square.setAttribute("status", action); 
  if (action==0)
    square.setAttribute("fill", 'white');
  if (action==2)
    square.setAttribute("fill", 'gray');
  if (action==1)
  {
    square.setAttribute("fill", 'black');
    current_grid[square.getAttribute("line")][square.getAttribute("col")]=1;
  }else{
    current_grid[square.getAttribute("line")][square.getAttribute("col")]=0;
  }
  
  check_grid();
}

function squareClick(evt) { 
  console.log("Click");
  updateSquare(evt.target,evt.button);
  evt.preventDefault();//to cancel select/copy
}

function mouseUp(evt) { 
  console.log("up");
  current_action=-1;
}


function squareEnter(evt) { 
  console.log("Enter");
  if (current_action>-1)
    updateSquareAction(evt.target,current_action);
  
  line=evt.target.getAttribute("line");
  for (i=0;i<all_hz_svg_texts.length;i++)
    if (all_hz_svg_texts[i].getAttribute("line")==line)
    {
      all_hz_svg_texts[i].setAttribute("stroke", "green");
    }else{
      all_hz_svg_texts[i].setAttribute("stroke", "blue");
    }

  col=evt.target.getAttribute("col");
  for (i=0;i<all_vert_svg_texts.length;i++)
    if (all_vert_svg_texts[i].getAttribute("col")==col)
    {
      all_vert_svg_texts[i].setAttribute("stroke", "green");
    }else{
      all_vert_svg_texts[i].setAttribute("stroke", "blue");
    }

}


function drawGrid(svg) {
  main_svg=svg;
  grid_solution = [[0,1,0,1,0],
                   [1,1,1,1,1],
                   [0,0,1,0,0],
                   [1,1,0,1,1],
                   [0,0,0,0,0]];
  //grid_solution = [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1], [0, 1, 1, 1, 0, 1, 1, 0, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]];

  
  grid_cols = grid_solution[0].length;
  
  current_grid=[];
  for (j = 0; j < grid_cols; j++) {
    current_grid.push([]);
    for (i = 0; i < grid_cols; i++)
      current_grid[j].push(0);
  }
      
  
  col_w_ppx = 25;//ppx = pseudo pixel
  info_size_ppx = 15*grid_cols;
  draw_size_ppx = info_size_ppx+col_w_ppx*grid_cols;
  
  
  window_size=$('#svgbasics').innerWidth();
  if ($('#svgbasics').innerHeight()<window_size)
    window_size=$('#svgbasics').innerHeight();
  scale_factor=window_size/(draw_size_ppx)*.95;
  
  
  var g = svg.group({stroke: 'black', strokeWidth: 2, transform: 'scale('+scale_factor+')'});
  
  
  for (i = 0; i <= grid_cols; i++) {
    y=info_size_ppx+col_w_ppx*i;
    var line=svg.line(g,0, y, draw_size_ppx, y);
    if (i%5==0)
      line.setAttribute("stroke", "red");
  }
  
  for (i = 0; i <= grid_cols; i++) {
    x=info_size_ppx+col_w_ppx*i;
    var line=svg.line(g,x,0, x, draw_size_ppx);
    if (i%5==0)
      line.setAttribute("stroke", "red");
  }
  
  for (j = 0; j < grid_cols; j++) {
    y=info_size_ppx+col_w_ppx*j;
    for (i = 0; i < grid_cols; i++) {
      x=info_size_ppx+col_w_ppx*i;
      var rect=svg.rect(g, x+1, y+1, col_w_ppx-2, col_w_ppx-2, {/*onclick: 'squareLeftClick(evt)',*/ fill: 'white', stroke: 'none', strokeWidth: 1});
      rect.setAttribute("status", 0);
      rect.setAttribute("line", j);
      rect.setAttribute("col", i);
      //rect.addEventListener('contextmenu', squareRightClick, false);
      rect.addEventListener('mousedown', squareClick, false);
      rect.addEventListener('mouseover', squareEnter, false);
    }
  }
  
  var text_w_pps = 30;
  
  var all_hz_texts=compute_hz_numbers(grid_solution);
  
  all_hz_svg_texts=[];
  
  //test: hz
  for (j=0;j<all_hz_texts.length;j++)
  {
    for (i=0;i<all_hz_texts[j].length;i++)
    {
      decal=0;
      if (all_hz_texts[j][i]>=10) decal=-5;
      var text=svg.text(g,info_size_ppx-(all_hz_texts[j].length-i-0.3)*text_w_pps+decal,info_size_ppx+col_w_ppx*j+col_w_ppx-6,all_hz_texts[j][i].toString());
      text.setAttribute("line", j);
      text.setAttribute("stroke", "blue");
      all_hz_svg_texts.push(text);
    }
  }
  
  var all_vert_texts=compute_vert_numbers(grid_solution);
  all_vert_svg_texts=[];

  //test: vert
  for (j=0;j<all_vert_texts.length;j++)
  {
    for (i=0;i<all_vert_texts[j].length;i++)
    {
      decal=0;
      if (all_vert_texts[j][i]>=10) decal=-5;
      var text=svg.text(g,info_size_ppx+7+decal+col_w_ppx*j,info_size_ppx-(all_vert_texts[j].length-i-1)*text_w_pps-6,all_vert_texts[j][i].toString());
      text.setAttribute("col", j);
      text.setAttribute("stroke", "blue");
      all_vert_svg_texts.push(text);
    }
  }
  
}











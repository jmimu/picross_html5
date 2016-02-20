var main_svg=0;

$(document).ready(function() //or $(function()
  {
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

function squareLeftClick(evt) { 
  console.log("Lclick");
  var square = evt.target;
  var square_status=square.getAttribute("status"); 
  if (square_status!=1)
  {
    square.setAttribute("status", 1); 
    square.setAttribute("fill", 'black');
  }else{
    square.setAttribute("status", 0); 
    square.setAttribute("fill", 'white');
  }
}

function squareRightClick(evt) { 
  console.log("Rclick");
  var square = evt.target;
  var square_status=square.getAttribute("status"); 
  if (square_status!=2)
  {
    square.setAttribute("status", 2); 
    square.setAttribute("fill", 'gray');
    ///TODO: draw an x ?
  }else{
    square.setAttribute("status", 0); 
    square.setAttribute("fill", 'white');
  }
}

function drawGrid(svg) {
  main_svg=svg;
  grid_solution = [[0,1,0,1,0],
                   [1,1,1,1,1],
                   [0,0,1,0,0],
                   [1,1,0,1,1],
                   [0,0,0,0,0]];
  grid_solution = [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1], [0, 1, 1, 1, 0, 1, 1, 0, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]];

  
  grid_cols = grid_solution[0].length;
  
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
    svg.line(g,0, y, draw_size_ppx, y);
  }
  
  for (i = 0; i <= grid_cols; i++) {
    x=info_size_ppx+col_w_ppx*i;
    svg.line(g,x,0, x, draw_size_ppx);
  }
  
  for (j = 0; j < grid_cols; j++) {
    y=info_size_ppx+col_w_ppx*j;
    for (i = 0; i < grid_cols; i++) {
      x=info_size_ppx+col_w_ppx*i;
      var rect=svg.rect(g, x, y, col_w_ppx, col_w_ppx, {onclick: 'squareLeftClick(evt)', fill: 'white', stroke: 'black', strokeWidth: 1});
      rect.setAttribute("status", 0);
      rect.addEventListener('contextmenu', squareRightClick, false);
    }
  }
  
  text_w_pps = 30;
  
  all_hz_texts=compute_hz_numbers(grid_solution);
  
  //test: hz
  for (j=0;j<all_hz_texts.length;j++)
  {
    for (i=0;i<all_hz_texts[j].length;i++)
    {
      decal=0;
      if (all_hz_texts[j][i]>=10) decal=-5;
      svg.text(g,info_size_ppx-(all_hz_texts[j].length-i-0.3)*text_w_pps+decal,info_size_ppx+col_w_ppx*j+col_w_ppx-6,all_hz_texts[j][i].toString());
    }
  }
  
  var all_vert_texts=compute_vert_numbers(grid_solution);
  //test: vert
  for (j=0;j<all_vert_texts.length;j++)
  {
    for (i=0;i<all_vert_texts[j].length;i++)
    {
      decal=0;
      if (all_vert_texts[j][i]>=10) decal=-5;
      svg.text(g,info_size_ppx+7+decal+col_w_ppx*j,info_size_ppx-(all_vert_texts[j].length-i-1)*text_w_pps-6,all_vert_texts[j][i].toString());
    }
  }
  
}











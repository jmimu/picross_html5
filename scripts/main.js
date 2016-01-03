$(document).ready(function() //or $(function()
  {
    $('#svgbasics')[0].oncontextmenu = function() {return false;} //remove left click menu on svg part
    
    $('#svgbasics').svg({onLoad: drawGrid});
    
    //$('#svg_grid').empty();
    //var svg = $('#svgbasics').svg('get');
    //$('#svgbasics').svg('get').circle(130, 75, 50, {fill: 'none', stroke: 'red', strokeWidth: 3});
    /*for (i = 0; i < 11; i++) {
      svg.circle(130, 75, 50, {fill: 'none', stroke: 'red', strokeWidth: 3});
    }*/
  }
);

function compute_hz_numbers(grid)
{
  hz_numbers=[];
  hz_numbers.push([1,1,1]);
  return hz_numbers;
}

function squareClick(evt) { 
    console.log("click");
    var square = evt.target;
    var square_status=square.getAttribute("status"); 
    if (square_status==0)
    {
      square.setAttribute("status", 1); 
      square.setAttribute("fill", 'purple');
    }else{
      square.setAttribute("status", 0); 
      square.setAttribute("fill", 'white');
    }
    
  } 

function drawGrid(svg) {
  grid_solution = [[0,0,0,0,0],
                   [1,1,1,1,1],
                   [0,1,0,1,0],
                   [0,0,1,0,0],
                   [1,1,0,1,1]];
  
  grid_cols = 5;
  
  col_w_ppx = 25;//ppx = pseudo pixel
  info_size_ppx = 18*grid_cols;
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
      var rect=svg.rect(g, x, y, col_w_ppx, col_w_ppx, {onclick: 'squareClick(evt)', fill: 'white', stroke: 'purple', strokeWidth: 1});
      rect.setAttribute("status", 0);
    }
  }
  
  text_w_pps = 30;
  
  //var all_hz_texts=[["2","4","12","5"],["2","1","12","5"],["2","12","9"]];
  all_hz_texts=compute_hz_numbers(grid_solution);
  
  //test: hz
  for (j=0;j<all_hz_texts.length;j++)
  {
    for (i=0;i<all_hz_texts[j].length;i++)
    {
      decal=0;
      if (all_hz_texts[j][i].length>1) decal=-5;
      svg.text(g,info_size_ppx-(all_hz_texts[j].length-i-0.5)*text_w_pps+decal,info_size_ppx+col_w_ppx*j+col_w_ppx-6,all_hz_texts[j][i].toString());
    }
  }
  
  var all_vert_texts=[["2","4","12","5"],["2","8","12","5"],["4","12","5"]];
  //test: vert
  for (j=0;j<all_vert_texts.length;j++)
  {
    for (i=0;i<all_vert_texts[j].length;i++)
    {
      decal=0;
      if (all_vert_texts[j][i].length>1) decal=-5;
      svg.text(g,info_size_ppx+7+decal+col_w_ppx*j,info_size_ppx-(all_vert_texts[j].length-i-1)*text_w_pps-6,all_vert_texts[j][i].toString());
    }
  }
  
}











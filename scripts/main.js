$(document).ready(function() //or $(function()
  {
    $('#svgbasics').svg({onLoad: drawGrid});
    
    //$('#svg_grid').empty();
    //var svg = $('#svgbasics').svg('get');
    //$('#svgbasics').svg('get').circle(130, 75, 50, {fill: 'none', stroke: 'red', strokeWidth: 3});
    /*for (i = 0; i < 11; i++) {
      svg.circle(130, 75, 50, {fill: 'none', stroke: 'red', strokeWidth: 3});
    }*/
  }
);


function drawGrid(svg) {
  
  
  grid_cols = 10;
  
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
  
  
  text_w_pps = 30;
  
  var all_texts=["2","4","12","5"];
  //test: hz
  for (i=0;i<all_texts.length;i++)
  {
    decal=0;
    if (all_texts[i].length>1) decal=-5;
    svg.text(g,info_size_ppx-(all_texts.length-i-0.5)*text_w_pps+decal,info_size_ppx+col_w_ppx-6,all_texts[i]);
  }
  
  //test: vert
  for (i=0;i<all_texts.length;i++)
  {
    decal=0;
    if (all_texts[i].length>1) decal=-5;
    svg.text(g,info_size_ppx+7+decal,info_size_ppx-(all_texts.length-i-1)*text_w_pps-6,all_texts[i]);
  }
  
}

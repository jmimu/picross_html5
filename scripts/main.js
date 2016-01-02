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
  draw_size_ppx = 300; //ppx = pseudo pixel
  info_size_ppx = 200;
  grid_cols = 10;
  
  col_w_ppx = draw_size_ppx/grid_cols;
  
  
  var g = svg.group({stroke: 'black', strokeWidth: 2});
  for (i = 0; i <= grid_cols; i++) {
    y=info_size_ppx+col_w_ppx*i;
    svg.line(g,0, y, draw_size_ppx+info_size_ppx, y);
  }
  
  for (i = 0; i <= grid_cols; i++) {
    x=info_size_ppx+col_w_ppx*i;
    svg.line(g,x,0, x, draw_size_ppx+info_size_ppx);
  }
  
  
  text_w_pps = 30;
  
  var all_texts=["2","4","12","5"];
  for (i=0;i<all_texts.length;i++)
  {
    svg.text(g,info_size_ppx-(all_texts.length-i)*text_w_pps,info_size_ppx+col_w_ppx,all_texts[i]);
  }
  
}

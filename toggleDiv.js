var dividoff = 'welcome';

function toggleDiv(dividon)
  {
    if(document.getElementById(dividoff).style.display == 'block') {
      document.getElementById(dividoff).style.display = 'none';
      document.getElementById(dividon).style.display = 'block';
      dividoff = dividon;
    }
    else {  
      document.getElementById(dividon).style.display = 'none';
      document.getElementById(dividoff).style.display = 'block';
    }
} 
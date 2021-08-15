function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
      document.querySelector(".projects").id = "mobile";
      document.querySelector(".sidenav").id = "mobile";
    } else {
      x.className = "topnav";
      document.querySelector(".projects").id = "";
      document.querySelector(".sidenav").id = "";
    }
    
  }

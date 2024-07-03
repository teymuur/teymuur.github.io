
installbtn =  document.getElementById("install")
codevisible = false
   installbtn.addEventListener('click', function(event) {
    if(!codevisible){
        event.preventDefault();
        
        document.getElementById("code").style = "display: default";
        codevisible = true;
    }else{
        document.getElementById("code").style = "display: none";
        codevisible = false;
    }

    });

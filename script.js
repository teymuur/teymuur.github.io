
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

    function copytoclipboard() {
        // Get the text field
        var copyText = document.getElementById("code");
      
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
      
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
      
        // Alert the copied text
        alert("Copied the text: " + copyText.value);
      }

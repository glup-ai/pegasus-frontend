
function initiateToggle(){
    document.getElementById("toggle").disabled = true;

    fetch("/toggle")
        .then(response => response.json())
        .then(data => {
            if(data.success){
                window.location.replace("/");
            }
            document.getElementById("toggle").disabled = false;
        })
        .catch((error) => {
            console.log(error);
            document.getElementById("toggle").disabled = false;
        });
    
}
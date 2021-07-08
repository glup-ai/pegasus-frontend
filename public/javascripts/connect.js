connect();

var intervalID = window.setInterval(connect, 2000);

function connect() {
    fetch("/connect")
        .then(response => response.json())
        .then(data => {
            if(data.ready){
                window.location.replace("/");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
function auth(){
  var user = document.getElementById("user").value;
  var password = document.getElementById("password").value;
  if (user == "user1" && password == "123") {
    window.location.assign("Home.html");
    alert("Login Successfully. Welcome to University of Makati (HSU) S.D.D Finder");
  } else if(user == "user2" && password == "456"){
    window.location.assign("Home.html");
    alert("Login Successfully. Welcome to University of Makati (HSU) S.D.D Finder");
  } else if(user == "user3" && password == "789") {
    window.location.assign("Home.html");
    alert("Login Successfully. Welcome to University of Makati (HSU) S.D.D Finder");
  }else{
    alert("Invalid Information. Try again.");
    return;
  }
}


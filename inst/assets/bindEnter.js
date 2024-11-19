// #190
window.onload = function() {
  val = $('#auth-language').find("option[selected]").val();
  if(val === ''){
    location.reload();
  }
};

// code included inside $(document).ready() will only run once the page is ready for JavaScript code to execute
 $(document).on("shiny:sessioninitialized", function(event) {
  // initialize a counter
  var n = 0;
  // create a click handler which listens for a click on the element with id equal to RStudio
  $("#auth-go_auth").on("click", function(){

    // increment the counter each time we click on the Rstudio logo
    n++;
    document.getElementById("auth-go_auth").disabled = true;
    console.log("Go auth!");
    // send message to Shiny
    setTimeout(() => {
        //console.log("Delayed for 1 second.");
        document.getElementById("auth-go_auth").disabled = false;
    }, 2000);
    Shiny.onInputChange("lgnclick", n, {priority: "event"});
  });
});

 Shiny.addCustomMessageHandler("enable_login", do_enable_login);

 function do_enable_login(message){
    document.getElementById("auth-go_auth").disabled = false;
  // show the messsage as an alert
  //console.log("Teste");
  //alert(message);
}



function bindEnter(ns) {
  $('#' + ns + 'user_pwd').on('keyup',function(e) {
    if(e.which == 13) {
      $('#' + ns + 'go_auth').click();
    }
  });
  $('#' + ns + 'user_id').on('keyup',function(e) {
    if(e.which == 13) {
      $('#' + ns + 'go_auth').click();
    }
  });

  $('#' + ns + 'pwd_one').on('keyup',function(e) {
    if(e.which == 13) {
      $('#' + ns + 'update_pwd').click();
    }
  });
  $('#' + ns + 'pwd_two').on('keyup',function(e) {
    if(e.which == 13) {
      $('#' + ns + 'update_pwd').click();
    }
  });
}

Shiny.addCustomMessageHandler('focus_input', function(data) {
  $('#' + data.inputId).focus();
});

Shiny.addCustomMessageHandler('update_auth_title', function(data) {
  $('#' + data.inputId).html(data.title);
});

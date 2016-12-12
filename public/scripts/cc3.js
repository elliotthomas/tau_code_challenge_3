console.log( 'js' );



$( document ).ready( function(){
  console.log( 'JQ' );

  $.ajax({
    type: "GET",
    url: "/array",
    success: function(response){
      console.log('back from post call:', response);
      for (var i = 0; i < response.length; i++) {
        $('#outputDiv').append('<strong>' + response[i].whoseJoke + ':' + '</strong>' + '<p>' + response[i].jokeQuestion +
          '</p>' + '<p class ="punchLine">' + response[i].punchLine + '</p>');
      }//end for loop
      $('.punchLine').hide();
      },
      error: function (){
        console.log('error with ajax call...');
      }
    });//end ajax call

  $('.punchLine').hide();

  $( '#addJokeButton' ).on( 'click', function(){
    console.log( 'addJokeButton on click');
    createAndSendNewObject();
    recieveNewJoke();
    clearForm();
  }); // end addJokeButton on click

  $('#showPunchline').on('click', function(){
    $('.punchLine').toggle();
  });//end show punchlines
}); // end doc ready

function createAndSendNewObject (){

  var whoseJoke = $('#whoseJokeIn').val();
  var jokeQuestion = $('#questionIn').val();
  var punchLine = $('#punchlineIn').val();

  var objectToSend = {
    whoseJoke: whoseJoke,
    jokeQuestion: jokeQuestion,
    punchLine: punchLine
  }; //end object to send

  $.ajax({
    type: 'POST',
    url: '/sendToServer',
    data: objectToSend,
    success: function(response){
      console.log('back from post call:', response);
    },
    error: function (){
      console.log('error with ajax call...');
    }
  });//end ajax call
};//end create and send object function

function recieveNewJoke () {
  $.ajax({
    type: "GET",
    url: "/recieveFromServer",
    success: function(response){
      console.log('back from post call:', response);
      displayNewJoke(response);
      },
      error: function (){
        console.log('error with ajax call...');
      }
    });//end ajax call
};//end recieve joke

function displayNewJoke (array){
    $('#outputDiv').append('<strong>' + array[array.length - 1].whoseJoke + ':' + '</strong>' + '<p>' + array[array.length - 1].jokeQuestion + '</p>' + '<p class="punchLine">' + array[array.length - 1].punchLine + '</p>');
    $('.punchLine').hide();
}; //end display joke

function clearForm (){
  $('#whoseJokeIn').val('');
  $('#questionIn').val('');
  $('#punchlineIn').val('');
}; //end clear form

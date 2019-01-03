$(document).ready(initiateApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var isClickable = true;

function initiateApp(){
  $('.card').on('click', card_clicked);
}

function card_clicked(){
  if(isClickable === true){
    $(this).find('.back').addClass('flip');

      if(first_card_clicked === null){
        first_card_clicked = $(this);
      } else if($(this)[0]['children'][1] !== first_card_clicked[0]['children'][1]){
        second_card_clicked = $(this);
        isClickable = false;

        if(first_card_clicked.find('.front > img').attr('src') === second_card_clicked.find('.front > img').attr('src')){
          match_counter++;
          console.log("You matched!");
          isClickable = true;
          if(match_counter === total_possible_matches){
            console.log('You win!')
          }
        } else {
          console.log("That is not a match");
          setTimeout(flip_back, 2000);
        }
      }
    }
}

function flip_back(){
  first_card_clicked.find('.back').removeClass('flip');
  second_card_clicked.find('.back').removeClass('flip');
  first_card_clicked = null;
  second_card_clicked = null;
  isClickable = true;
}
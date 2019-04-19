$(document).ready(initiateApp);

let first_card_clicked = null;
let second_card_clicked = null;
const total_possible_matches = 9;
let match_counter = 0;
let isClickable = true;

let matches = 0;
let attempts = 0;
let accuracy;
let games_played = 0;

let repetitions = 0;
let matched_fingerprint;

var cards = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg',
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg'
]

const initiateApp = () => {
  $('.card').on('click', card_clicked);
  $('.reset').click(reset_game);
  shuffle_cards();
}

const shuffle_cards = () => {
  for(var i = 0; i < 18; i++){
    var randomNumber = Math.floor(Math.random() * cards.length);
    $('.front > img').eq(i).attr('src', cards[randomNumber]);
    cards.splice(randomNumber, 1);
  }
}

const card_clicked = () => {
  if(isClickable === true){
    $(this).find('.back').addClass('flip');
      if(first_card_clicked === null && !$(this).find('.front').hasClass('matched')){
        first_card_clicked = $(this);
        first_card_clicked_src = first_card_clicked.find('.front > img').attr('src');
      } else if($(this)[0]['children'][1] !== first_card_clicked[0]['children'][1] && !$(this).find('.front').hasClass('matched')){
        second_card_clicked = $(this);
        second_card_clicked_src = second_card_clicked.find('.front > img').attr('src')
        attempts++;
        isClickable = false;
        if(first_card_clicked_src === second_card_clicked_src){
          first_card_clicked.find('.front').addClass('matched');
          second_card_clicked.find('.front').addClass('matched');
          match_counter++;
          matches++;
          matched_fingerprint = first_card_clicked_src[7] - 1;
          var image_src = first_card_clicked.find('.front > img').attr('src');
          setTimeout(show_response_modal(image_src), 1000);
          setTimeout(shuffle_criminals(), 1000);
          first_card_clicked = null;
          second_card_clicked = null;
          isClickable = true;
          if(match_counter === total_possible_matches){
            win_modal();
          }
        } else {
          setTimeout(flip_back, 2000);
        }
      }
    }
    display_stats();
}

const show_response_modal(image_name){
  $('.response_modal').removeClass('flip');
  $('.fingerprint').css("background-image", "url('" + image_name + "')");
}

const remove_response_modal = () => {
  $('.response_modal').addClass('flip');
  $('.match').text("");
}

const flip_back = () => {
  first_card_clicked.find('.back').removeClass('flip');
  second_card_clicked.find('.back').removeClass('flip');
  first_card_clicked = null;
  second_card_clicked = null;
  isClickable = true;
}

const display_stats = () => {
  if(matches === 0 && attempts === 0){
    accuracy = 0
  } else {
    accuracy = Math.floor(matches/attempts * 100) / 100;
  }
  $('.games_played > .value').text(games_played);
  $('.attempts > .value').text(attempts);
  $('.accuracy > .value').text(accuracy + "%");
}

const reset_stats = () => {
  accuracy = 0;
  matches = 0;
  attempts = 0;
  display_stats();
}

const reset_game = () => {
  games_played++;
  reset_stats();
  display_stats();
  $('.back').removeClass('flip');
  $('.win_modal').addClass('flip');
  shuffle_cards();
  document.getElementById("theme_song").pause();
}

const shuffle_criminals = () => {
  play_song();
  repetitions++;
  var criminals = [
    'images/blue_paint_killer.jpg',
    'images/dick_and_jane_killer.jpg',
    'images/dr_jekyll.jpg',
    'images/hannah_west.png',
    'images/jeffrey_mckeen.jpg',
    'images/lou_gedda.jpg',
    'images/miniature_killer.jpeg',
    'images/paul_millander.jpg',
    'images/sqweegel.jpg'
  ];

  if(repetitions < 50){
    var index = Math.floor(Math.random()*9);
    $('.criminal').css("background-image", "url('" + criminals[index] + "')");
    setTimeout(shuffle_criminals, 50);
  } else {
    repetitions = 0;
    var min = 95;
    var max = 100;
    var percentage = Math.floor(Math.random() * (max - min + 1)) + min;
    $('.match').text(percentage + "% Match");
    $('.criminal').css("background-image", "url('" + criminals[matched_fingerprint] + "')");
    setTimeout(remove_response_modal, 2000);
    return
  }
}

const play_song = () => {
  document.getElementById("who_are_you").play();
}

const win_modal = () => {
  console.log("You win!")
} 
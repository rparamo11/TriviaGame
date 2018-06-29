$.fn.trivia = function() {
    var taco = this;
    taco.userPick = null;
    taco.answers = {
        correct: 0,
        incorrect: 0
    };
    taco.images = null;
    taco.count = 30;
    taco.current = 0;
    taco.questions = [{
        question: "What is the biggest animal to have inhabited the earth?",
        choices: ["Giraffe", "T-Rex", "Donald Trump", "Blue Whale"],
        correct: 3

    }, {
        question: "What was tested in Bikini Atoll in the 1940s and 1950s?",
        choices: ["First Plane", "Atomic Bomb", "Fusion", "Air Bags"],
        correct: 1

    }, {
        question: "What is the device used in the study of earthquakes?",
        choices: ["Aeromology", "Earthquake-ology", "Seismograph", "Seismology"],
        correct: 3

    }, {
        question: "Who is the Tesla named after?",
        choices: ["Andrew Tesla", "Nikola Tesla", "Elon Musk", "The Tesla Coil"],
        correct: 1

    }, {
        question: "Who wrote the book 1984?",
        choices: ["George Orwell", "Orson Welles", "J.K. Rowling", "Charles Dickens"],
        correct: 0

    }, {
        question: "Who is the Olympian goddess of wisdom and war?",
        choices: ["Aphrodite", "Zeus", "Athena", "Hera"],
        correct: 2

    }, {
        question: "Who is the worlds current richest person?",
        choices: ["Bill Gates", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg"],
        correct: 2

    }, {
        question: "The 1931 painting known as The Persistence of Time was created by?",
        choices: ["Salvador Dali", "Leornardo da Vinci", "Vincent Van Gogh", "Michelangelo"],
        correct: 0
    }];
    taco.ask = function() {
        if (taco.questions[taco.current]) {
            $("#timer").html("Time remaining: " + "00:" + taco.count + " secs");
            $("#question_div").html(taco.questions[taco.current].question);
            var choicesArr = taco.questions[taco.current].choices;
            // var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(taco.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    taco.questions.length - (taco.answers.correct + taco.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    taco.timer = function() {
        taco.count--;
        if (taco.count <= 0) {
            setTimeout(function() {
                taco.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + taco.count + " secs");
        }
    };
    taco.nextQ = function() {
        taco.current++;
        clearInterval(window.triviaCounter);
        taco.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            taco.cleanUp();
            taco.ask();
        }, 1000)
    };
    taco.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + taco.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + taco.answers.incorrect);
    };
    taco.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        taco.answers[string]++;
        $('.' + string).html(string + ' answers: ' + taco.answers[string]);
    };
    return taco;
};
var Trivia;

window.onload = function() {

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});
}

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        taco = Trivia || $(window).trivia(),
        index = taco.questions[taco.current].correct,
        correct = taco.questions[taco.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        taco.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        taco.answer(true);
    }
    taco.nextQ();
});
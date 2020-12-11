const STORE = {

  questions: [
    {
      question: 'What pokémon does Pikachu evolve into?',
      answers: [
        'Pichu',
        'Plusle',
        'Raichu',
        'Raikou'
      ],
      correctAnswer: 'Raichu'
    },
    {
      question: 'What are the three types of starter pokémon?',
      answers: [
        'Ground | Ice | Fire',
        'Fire | Water | Grass',
        'Dragon | Electric | Normal',
        'Poison | Ghost | Psychic'
      ],
      correctAnswer: 'Fire | Water | Grass'
    },
    {
      question: 'What type of attack is Gyrados 4 times weak against?',
      answers: [
        'Electric',
        'Dragon',
        'Ice',
        'Grass'
      ],
      correctAnswer: 'Electric'
    },
    {
      question: 'What pokémon is Mewtwo cloned from?',
      answers: [
        'Mew',
        'Lucario',
        'Pikachu',
        'Unknown'
      ],
      correctAnswer: 'Mew'
    },
    {
      question: 'What type of attack is Hyper beam?',
      answers: [
        'Fairy',
        'Dragon',
        'Psychic',
        'Normal'
      ],
      correctAnswer: 'Normal'
    },
    {
      question: 'Which of these pokémon does Eevee NOT evolve into?',
      answers: [
        'Flareon',
        'Umbreon',
        'Sylveon',
        'Flygon'
      ],
      correctAnswer: 'Flygon'
    },
    {
      question: "What's Larvitar's fully evolved form?",
      answers: [
        'Dragonite',
        'Tyranitar',
        'Garchomp',
        'Aggron'
      ],
      correctAnswer: 'Tyranitar'
    },
    {
      question: 'Who is the god of all pokemon?',
      answers: [
        'Mew',
        'Dialga',
        'Arceus',
        'Palkia'
      ],
      correctAnswer: 'Arceus'
    },
    {
      question: 'What pokémon always intervenes in a battle between Kyogre and Groudon?',
      answers: [
        'Giratina',
        'Rayquaza',
        'Lugia',
        'Deoxys'
      ],
      correctAnswer: 'Rayquaza'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  rightAnswer: false,
  userAnswer: '',
  page: 'home',
  submittedAnswer: false
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function generateHomePage() {
  return `
  <section class='center group'>
    <div class='item'>
      <img src='images/dancing-pikachu.gif' alt='gif image of pikachu dancing' class='center'>
      <h2>Welcome to the Pokémon Quiz!</h2>
    </div>
    <div class='item'>
      <p class='pMargin'>Do you have what it takes to be a Pokémon Master?</p>
      <button id='startQuiz'>Start</button>
    </div>
  </section>
  `;
}

function generateQuestionPrompt() {
  const currentQuestion = STORE.questions[STORE.questionNumber];
  return `
  <section class='center group'>
    <h3>${currentQuestion.question}</h3>
  </section>
  `;
}

function generateAnswerPrompt() {
  let answerOptions = '';
  const answerArray = STORE.questions[STORE.questionNumber].answers;
  let i = 0;

  answerArray.forEach((answer, index) => {
    answerOptions += `
    <section class='center group'>
      <ul class='item'>
        <li><input type='radio' id='answer${index}' name='choice' value='${answer}' required><label for='option'>${answer}</label></li>
      </ul>
    </section>
    `;
    i++;
  });
  return answerOptions;
}

function questionAndScoreTracker() {
  return `
  <section class='center group'>
    <div class='item'>
      <button type='submit' id='submit-btn'>Submit</button>
      <p>Question Number: ${STORE.questionNumber + 1} of ${STORE.questions.length + 1}</p>
      <p>Score: ${STORE.score} of ${STORE.questions.length + 1}</p>
    </div>
  </section>
  `;
}

function verifyAnswer() {
  STORE.page = 'feedback';
  if (STORE.userAnswer === STORE.questions[STORE.questionNumber].correctAnswer) {
    STORE.score++;
    STORE.rightAnswer = true;
  } else {
    STORE.rightAnswer = false;
  }
}

function displayFeedback() {
  if (STORE.rightAnswer === true) {
    content = `
    <section class='center group'>
      <div class='item'>
        <img src='images/cheering-pikachu.gif' alt='gif image of Pikachu cheering' class='center'>
      </div>
      <div class='item'>
        <p class='pMargin'>Wow! You picked the right answer!</p>
        <button type='button' id='next-btn'>Next</button>
      </div>
    </section>
    `;
  } else {
    content = `
    <section class='center group'>
      <div class='item'>
        <img src='images/sad-pikachu.gif' alt='gif image of Pikachu crying' class='center'>
        <p class='pMargin'>Sorry, that wasn't the right answer! Better luck next time!</p><br>
      </div>
      <div class='item'>
        <p>Correct answer is:<br>${STORE.questions[STORE.questionNumber].correctAnswer}</p>
        <button type='button' id='next-btn'>Next</button>
      </div>    
    </section>
    `;
  }
  $('main').html(content);
}

function nextQuestion() {
  if (STORE.questionNumber < STORE.questions.length - 1) {
    STORE.submittedAnswer = false;
    STORE.page = 'questionPrompt';
    STORE.questionNumber++;
  } else {
    STORE.page = 'score';
    finalScore();
  }
}

function finalScore() {
  let content = `
  <section class='center group'>
    <div class='item'>
      <img src='images/pikachu-audience.gif' alt='gif image of multiple Pikachu clapping in an auditorium' class='center'>
    </div>
    <div class='item'>
      <p class='pMargin'>Congratulations! Your final score is ${STORE.score} out of ${STORE.questions.length + 1}!<br>You're well on your way to becoming a Pokémon Master!</p>
    </div>
    <div class='item'>
      <button type='button' id='try-again-btn'>Try Again?</button>
    </div>
  </section>
    `;
  $('main').html(content);
}

function restartQuiz() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
  STORE.page = 'home';
}

function render() {
  let content = ''
  if (STORE.page === 'home') {
    $('main').html(generateHomePage());
  } else if (STORE.page === 'questionPrompt') {
    content = generateQuestionPrompt();
    content += generateAnswerPrompt();
    content += questionAndScoreTracker();
    $('main').html(`<form>${content}</form>`);
  } else if (STORE.page === 'feedback') {
    displayFeedback();
  } else if (STORE.page === 'score') {
    finalScore();
  }
}


function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (event) {
    STORE.page = 'questionPrompt';
    render();
  })
}

function handleSubmitAnswer() {
  $('main').on('submit', 'form', function (event) {
    event.preventDefault();
    STORE.submittedAnswer = true;
    STORE.userAnswer = $(`input[name='choice']:checked`).val();
    verifyAnswer();
    render();
  });
}

function handleNextQuestion() {
  $('main').on('click', '#next-btn', function (event) {
    event.preventDefault();
    nextQuestion();
    render();
  })
}

function handleRestartQuiz() {
  $('main').on('click', '#try-again-btn', function (event) {
    restartQuiz();
    render();
  })
}

function main() {
  render();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestartQuiz();
}

$(main);
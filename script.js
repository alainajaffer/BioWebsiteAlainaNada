// document.addEventListener("DOMContentLoaded", function() {
//   let blah = document.getElementById("mapId");
//   blah.style.backgroundColor = blueviolet;

//   function changeColor(bg) {
//     document.body.style.background = bg;
//   }

//   //   blah.onmouseover = function changeColor(blah) {
//   //     backgroundColor = blueviolet;
//   //   };
// });

document.addEventListener("DOMContentLoaded", function() {
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "How many chambers of the heart are there?",
      answers: {
        a: "2",
        b: "5",
        c: "4"
      },
      correctAnswer: "c"
    },
    {
      question:
        "The movement of the blood through the heart and body is called?",
      answers: {
        a: "Circulation",
        b: "Locomotion",
        c: "Ventriculation",
        d: "Heart Pump"
      },
      correctAnswer: "a"
    },
    {
      question: "The beating sound your heart makes comes from?",
      answers: {
        a: "Blood going in the wrong direction",
        b: "Valves closing",
        c: "The heart skipping beats",
        d: "Your ears playing tricks on you"
      },
      correctAnswer: "b"
    },
    {
      question: "What separates the left side and right side of the heart?",
      answers: {
        a: "Ventricle",
        b: "Atrium",
        c: "The great wall",
        d: "Septum"
      },
      correctAnswer: "d"
    },
    {
      question: "With circulation, the heart provides your body with?",
      answers: {
        a: "Oxygen",
        b: "Nutrients",
        c: "All of the above"
      },
      correctAnswer: "c"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener("click", showResults);
});

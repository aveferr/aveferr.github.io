
class Answer {
    constructor(text, correct = false) {
        this.text = text;
        this.correct = correct;
    }

    isCorrect() {
        return this.correct;
    }
}

class Explanation {
    constructor(text) {
        this.text = text;
    }

    render() {
        const div = document.createElement('div');
        div.className = 'explanation';
        div.textContent = this.text;
        return div;
    }
}

class QuizQuestion {
    constructor(questionText, answers, explanationText) {
        this.questionText = questionText;
        this.answers = answers;
        this.explanation = new Explanation(explanationText);
        this.shuffled = false;
    }

    getShuffledAnswers() {
        if (!this.shuffled) {
            this.answers = this.answers.sort(() => Math.random() - 0.5);
            this.shuffled = true;
        }
        return this.answers;
    }

    getCorrectAnswer() {
        return this.answers.find(a => a.correct);
    }
}

const questionEntities = [
    new QuizQuestion(
        "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        [
            new Answer("Пол деревни, за раз"),
            new Answer("Полдеревни, зараз", true),
            new Answer("Пол-деревни, за раз")
        ],
        "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
    ),
    new QuizQuestion(
        "А эти слова как пишутся?",
        [
            new Answer("Капуччино и эспрессо"),
            new Answer("Каппуччино и экспресо"),
            new Answer("Капучино и эспрессо", true)
        ],
        "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
    ),
    new QuizQuestion(
        "Как нужно писать?",
        [
            new Answer("Черезчур"),
            new Answer("Черес-чур"),
            new Answer("Чересчур", true)
        ],
        "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
    ),
    new QuizQuestion(
        "Где допущена ошибка?",
        [
            new Answer("Аккордеон"),
            new Answer("Белиберда"),
            new Answer("Эпелепсия", true)
        ],
        "Верно! Это слово пишется так: «эпИлепсия»."
    )
];

const shuffledQuestions = [...questionEntities].sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let correctCount = 0;
let isAnswered = false;
let selectedQuestionBlock = null;

const quizArea = document.getElementById('quiz-area');
const endMessage = document.getElementById('end-message');
const statsDisplay = document.getElementById('stats');

function createQuestionBlock(questionEntity, index) {
    const qBlock = document.createElement('div');
    qBlock.className = 'question-block';
    qBlock.dataset.index = index;

    const header = document.createElement('div');
    header.className = 'question-header';
    header.innerHTML = `${index + 1}. ${questionEntity.questionText} <span class="marker"></span>`;
    qBlock.appendChild(header);

    const answers = questionEntity.getShuffledAnswers();

    answers.forEach(answer => {
        const aBlock = document.createElement('div');
        aBlock.className = 'answer-block';
        aBlock.textContent = answer.text;
        aBlock.dataset.correct = answer.correct;
        aBlock.addEventListener('click', () => {
            if (isAnswered) return;
            handleAnswerClick(aBlock, qBlock, answer, questionEntity);
        });

        qBlock.appendChild(aBlock);
    });

    return qBlock;
}

function showCorrectAnswer(qBlock) {
    document.querySelectorAll('.question-block').forEach(block => {
        if (block !== qBlock) {
            
            const allAnswers = block.querySelectorAll('.answer-block');
            allAnswers.forEach(answer => {
                answer.classList.add('slide-down');
            });
        }
    });

    const correctBlock = qBlock.querySelector('.answer-block[data-correct="true"]');
    if (correctBlock) {
        correctBlock.classList.remove('slide-down');

        correctBlock.style.background = '#d4edda';
        correctBlock.style.transform = 'scale(1.05)';

    }

    selectedQuestionBlock = qBlock;
}

function handleAnswerClick(clickedBlock, qBlock, answer, questionEntity) {
    if (isAnswered && currentQuestionIndex < shuffledQuestions.length) {
        return;
    }

    if (currentQuestionIndex >= shuffledQuestions.length) {
        showCorrectAnswer(qBlock, questionEntity);
        return;
    }

    isAnswered = true;
    const marker = qBlock.querySelector('.marker');
    const allAnswers = qBlock.querySelectorAll('.answer-block');

    setTimeout(() => {
        if (answer.isCorrect()) {
            correctCount++;
            marker.innerHTML = '✔';
            marker.style.color = 'green';
            clickedBlock.style.transform = 'scale(1.05)';
            clickedBlock.style.background = '#d4edda';

            const explanationElement = questionEntity.explanation.render();
            clickedBlock.appendChild(explanationElement);

            allAnswers.forEach(a => {
                if (a !== clickedBlock) {
                    a.classList.add('slide-down');
                    a.classList.add('block-events');
                }
            });

            setTimeout(() => {
                explanationElement.remove();
                clickedBlock.classList.add('slide-down');
                clickedBlock.classList.add('block-events');
            }, 1200);

        } else {
            marker.innerHTML = '✘';
            marker.style.color = 'red';
            allAnswers.forEach(a => {
                a.classList.add('slide-down');
                a.classList.add('block-events');
            });
        }

        setTimeout(loadNextQuestion, 1500);
    }, 600);
}

function loadNextQuestion() {
    isAnswered = false;
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        const nextQ = shuffledQuestions[currentQuestionIndex];
        const block = createQuestionBlock(nextQ, currentQuestionIndex);
        quizArea.appendChild(block);
    } else {
        endMessage.classList.remove('hidden');
        statsDisplay.textContent = `Правильных ответов: ${correctCount} из ${shuffledQuestions.length}`;
        statsDisplay.classList.remove('hidden');
        
         document.querySelectorAll('.answer-block').forEach(a => {
            a.classList.remove('block-events');
        });
        
    }
}


function startQuiz() {
    if (shuffledQuestions.length > 0) {
        const firstQ = shuffledQuestions[0];
        const block = createQuestionBlock(firstQ, 0);
        quizArea.appendChild(block);
    }
}

startQuiz();

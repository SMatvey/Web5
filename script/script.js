document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.querySelector('#btnOpenModal');
    const modal = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const closeButton = document.querySelector('#closeModal');
    const sendButton = document.querySelector('#send');
    
    

    const getData = () =>{
        formAnswers.textContent = 'LOAD';
      
        setTimeout(() => {
            
            const firebaseConfig = {
                apiKey: "AIzaSyCAA5t8GaDJjM4G8cKm2pbIifveDLQG1iA",
                authDomain: "testburger-9a96e.firebaseapp.com",
                databaseURL: "https://testburger-9a96e-default-rtdb.firebaseio.com",
                projectId: "testburger-9a96e",
                storageBucket: "testburger-9a96e.appspot.com",
                messagingSenderId: "182525055501",
                appId: "1:182525055501:web:bb2fbadfc129eb440b7b44",
                measurementId: "G-GJRKSQRBN4"
              };
            
              const app = initializeApp(firebaseConfig);
              firebase.initializeApp(firebaseConfig);
              app.database().ref().child("questions").once("value").then((snap) => {
                questionData = snap.val();
                formAnswers.textContent = "";
                playTest();
            })
        },1000);
    }

    closeModal.addEventListener('click', onCloseModalClick);
    openModalButton.addEventListener('click', onOpenModalBtnClick);

    function onOpenModalBtnClick() {
        modal.classList.add('d-block');
        getData();
    }
      
    function onCloseModalClick() {
        modal.classList.remove('d-block');
    }

    const playTest = (questions) => {
        let numberQuestions = 0;
        const finaleAnswers = [];

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answersItem = document.createElement('div')
                answersItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answersItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answersItem);
            });
        }

        const renderQuestions = (indexQuestions) => {
            formAnswers.innerHTML = ``;

            switch (numberQuestions) {
                case (0):
                    prevButton.classList.add('d-none');
                    console.log(numberQuestions);
                    questionTitle.textContent = `${questions[indexQuestions].question}`;
                    renderAnswers(indexQuestions);
                    break;
                case (1):
                    prevButton.classList.remove('d-none');
                    console.log(numberQuestions);
                    questionTitle.textContent = `${questions[indexQuestions].question}`;
                    renderAnswers(indexQuestions);
                    break; 
                case (questions.length):
                    nextButton.classList.add('d-none');
                    prevButton.classList.add('d-none');
                    sendButton.classList.remove('d-none')
                    formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Введіть свій номер телефону</label>
                        <input type="phone" name="form-control" id="numberPhone">
                    </div>
                    `;
                    console.log(numberQuestions);
                    break;
                case (questions.length+1):
                    formAnswers.textContent = "Спасибо";
                    setTimeout(() => {
                        modal.classList.remove('d-block');
                    }, 2000);
                    console.log(numberQuestions);
                    break;
                default:
                    questionTitle.textContent = `${questions[indexQuestions].question}`;
                    renderAnswers(indexQuestions);
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    console.log(numberQuestions);
            }
            

            // if (numberQuestions >= 0 && numberQuestions <= questions.length - 1) {
            //     questionTitle.textContent = `${questions[indexQuestions].question}`;
            //     renderAnswers(indexQuestions);
            //     prevButton.classList.remove('d-none');
            //     nextButton.classList.remove('d-none');
            //     sendButton.classList.add('d-none')
            // }

            // if (numberQuestions === 0) {
            //     prevButton.classList.add('d-none');
            // }
            // if (numberQuestions === questions.length) {
            //     nextButton.classList.add('d-none');
            //     prevButton.classList.add('d-none');
            //     sendButton.classList.remove('d-none')
            //     formAnswers.innerHTML = `
            //     <div class="form-group">
            //         <label for="numberPhone">Введіть свій номер телефону</label>
            //         <input type="phone" name="form-control" id="numberPhone">
            //     </div>
            //     `;
            // }
            // if (numberQuestions === questions.length+1) {
            //     formAnswers.textContent = "Спасибо";
            //     setTimeout(() => {
            //         modal.classList.remove('d-block');
            //       }, 2000);
            // }
        } 
        renderQuestions(numberQuestions);

        function checkAnswer() {
            const obj = {};
          
            const inputs = [...formAnswers.elements].filter(
              (input) => input.checked || input.id === 'numberPhone'
            );
            inputs.forEach((input, index) => {
              if (input.id === 'numberPhone') {
                obj['Номер телефону'] = input.value;
              } else {
                obj[`${index}_${questions[numberQuestions].question}`] = input.value;
              }
            });
            finaleAnswers.push(obj);
          }

        
        prevButton.onclick = () => {
            numberQuestions--;
            renderQuestions(numberQuestions);
        }
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestions++;
            renderQuestions(numberQuestions);
        }
        closeButton.onclick = () => {
            numberQuestions = 0;
            prevButton.classList.add('hide');
        }
        sendButton.onclick = () => {
            checkAnswer();
            numberQuestions++;
            renderQuestions(numberQuestions);
            console.log(finaleAnswers);
        }
    }
})

import { questions } from "./data.js";

export function animateFAQ(){

   
    const questionListContainer = document.querySelector(".question-list")
    const questionList = document.querySelector(".question-list")
    const POSITIONS = {
        BOTTOM: 0,
        MIDDLE: -80,
        TOP: -160,
    };
    let lastMousePosition = {x: 0, y: 0};
    let activeAward = null;
    let ticking = false;
    let mouseTimeout = null;
    let isMouseMouving = false;

    questions.forEach((question)=>{
        const questionElement = document.createElement("div")
        questionElement.className = "question"

        questionElement.innerHTML = `
        <div class="question-wrapper">
            <div class="question-name">
                <h1>${question.name}</h1>
                <h1>${question.type}</h1>
            </div>
            <div class="question-project">
            <h1>${question.project}</h1>
            <h1>${question.label}</h1>
            </div>
            <div class="question-name">
                <h1>${question.name}</h1>
                <h1>${question.type}</h1>
            </div>
            </div>

            `;

            questionListContainer.appendChild(questionElement)
    });
    const questionsElements = document.querySelectorAll(".question")

    const updateQuestions = () =>{
        if(activeAward){
            const rect = activeAward.getBoundingClientRect();
            const isStillOver = lastMousePosition.x >= rect.left && lastMousePosition.x <= rect.right && lastMousePosition.y >= rect.top && lastMousePosition.y <= rect.bottom;
            if(!isStillOver){
                const wrapper = activeAward.querySelector(".question-wrapper");
                const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
                    duration: 0.4,
                    ease: "power2.out",
                });
                activeAward = null
            }
        }
        questionsElements.forEach((question, index)=>{
            if (question === activeAward) return;

            const rect = question.getBoundingClientRect();
            const isMouseOver = lastMousePosition.x >= rect.left && lastMousePosition.x <= rect.right && lastMousePosition.y >= rect.top && lastMousePosition.y <= rect.bottom;
            if(isMouseOver){
                const wrapper = question.querySelector(".question-wrapper");
                const enterFromTop = lastMousePosition.y < rect.top + rect.height / 2;

                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: "power2.out",
                });
                activeAward = question
            }
        })
        ticking = false;
    }
    document.addEventListener("mousemove", (e)=>{
        lastMousePosition.x = e.clientX
        lastMousePosition.y = e.clientY
        isMouseMouving = true;
        if(mouseTimeout){
            clearTimeout(mouseTimeout)
        }
        const questionsListRect = questionList.getBoundingClientRect();
        const isInsideQuestionsList = lastMousePosition.x >= questionsListRect.left && lastMousePosition.x <= questionsListRect.right && lastMousePosition.y >= questionsListRect.top && lastMousePosition.y <= questionsListRect.bottom;
        if(isInsideQuestionsList){
            isMouseMouving = false;
        }
    })
 document.addEventListener("scroll", ()=>{
       if(!ticking){
        requestAnimationFrame(()=>{
            updateQuestions();
        });
        ticking = true;
       }
    }, {
        passive: true
    });
    questionsElements.forEach((question, index)=>{
        const wrapper = question.querySelector(".question-wrapper");
        let currentPosition = POSITIONS.TOP;
        question.addEventListener("mouseenter", (e)=>{
            activeAward = question;
            const rect = question.getBoundingClientRect();
            const enterFromTop = e.clientY < rect.top + rect.height / 2;
            if (enterFromTop || currentPosition === POSITIONS.BOTTOM){
                currentPosition = POSITIONS.MIDDLE;
                gsap.to(wrapper, {
                    y: POSITIONS.MIDDLE,
                    duration: 0.4,
                    ease: "power2.out",
                })
            }
        })
         question.addEventListener("mouseleave", (e)=>{
            activeAward = null;
            const rect = question.getBoundingClientRect();
            const leavingFromTop = e.clientY < rect.top + rect.height / 2;
            currentPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;

           
            gsap.to(wrapper, {
                y: currentPosition,
                duration: 0.4,
                ease: "power2.out",
            })
            
        })
    })
}
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter")
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');


const inputHandler = () => {
    //numb of characters
    const maxCharacters = 150;

    //number of characters currently typed
    const lengthCharacters = textareaEl.value.length;

    // numb of characters left

    const charactersLeft = maxCharacters - lengthCharacters;

    counterEl.innerHTML = charactersLeft
    console.log(charactersLeft)

}

textareaEl.addEventListener('input', inputHandler)

/// submit comp 



const submitHandler = (event) => {
    event.preventDefault();

    //text from the text area
    const text = textareaEl.value;

  // validate text (if # is present, text is long enough)

    if (text.includes('#') &&  text.length > 4){
        formEl.classList.add('form--valid')
        setTimeout(() => {
            formEl.classList.remove('form--valid')
        }, 2000);

    } else {
        formEl.classList.add('form--invalid')
        setTimeout(() => {
            formEl.classList.remove('form--invalid')
        }, 2000);

        //stop this function execution

        textareaEl.focus();

        return;
    }

        // extract other info from the text
        const hashtag = text.split(' ').find(word => word.includes('#'));
        const company = hashtag.substring(1);
        const badgeLetter = company.substring(0, 1).toUpperCase();
        const upvoteCount = 0;
        const daysAgo= 0;

        // new feedback item HTML

        const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">hi ${text} i like your clothes but not the website, please improve it</p>
            </div>
            <p class="feedback__date">${daysAgo}d</p>
        </li>
        `;  

        // console.log(upvoteCount, badgeLetter, company, text)

              //insert feedback in list

        feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

};

formEl.addEventListener('submit', submitHandler);


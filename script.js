const MAX_CHARS = 150;

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter")
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');

const inputHandler = () => {
    //numb of characters
    const maxCharacters = MAX_CHARS;

    //number of characters currently typed
    const lengthCharacters = textareaEl.value.length;

    // numb of characters left

    const charactersLeft = maxCharacters - lengthCharacters;

    counterEl.innerHTML = charactersLeft


}

textareaEl.addEventListener('input', inputHandler)


const showVisualIndicator = (textCheck) => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid'

    formEl.classList.add(className)
    setTimeout(() => {
        formEl.classList.remove(className)
    }, 2000);

}

/// submit comp 

const submitHandler = (event) => {
    event.preventDefault();

    //text from the text area
    const text = textareaEl.value;

    // validate text (if # is present, text is long enough)

    if (text.includes('#') && text.length > 4) {
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');

        textareaEl.focus();
        //stop this function execution
        return;
    }

    // extract other info from the text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

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
            <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}}d`}</p>
        </li>
        `;

    // console.log(upvoteCount, badgeLetter, company, text)

    //insert feedback in list

    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

    // clear text area
    textareaEl.value = ' ';

    //blur submit btn

    submitBtnEl.blur();

    //reset counter
    counterEl.textContent = MAX_CHARS;


};

formEl.addEventListener('submit', submitHandler);

// FEEDBACK LIST

fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks').then(response => {
    return response.json();
}).then(data => {

    //remove the spinner
    // spinnerEl.remove();

    //iterate over each element

    data.feedbacks.forEach(feedbackItem => {



        const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">hi ${feedbackItem.text} i like your clothes but not the website, please improve it</p>
        </div>
        <p class="feedback__date">${feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
    `;

        feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
    });
}).catch(error => {
    feedbackListEl.textContent = `Error loading data. Error message: ${error.message}`;
});


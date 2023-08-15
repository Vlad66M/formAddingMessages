const nameRegex = /^[a-zA-ZА-Яа-я]+[a-zA-ZА-Яа-я\s]*$/iu;

const messageForm = document.querySelector('#add-message');
const submitBtn = document.querySelector('#message-submit');
const nameField = document.querySelector('#message-name');
const contentField = document.querySelector('#message-content');

function addMessage(name, content){
    let element = document.createElement('div');
    element.className = 'message';
    let currentDate = new Date();
    let d= currentDate.getDate();
    let m = currentDate.getMonth()+1;
    let y = currentDate.getFullYear();
    let day = ''+d;
    let month = ''+m;
    if(d<10){
        day='0'+d;
    }
    if(m<10){
        month='0'+m;
    }
    let hours = currentDate.getHours();
    let hoursStr = ''+hours;
    let minutes = currentDate.getMinutes();
    let minutesStr = ''+minutes;
    let seconds = currentDate.getSeconds();
    let secondsStr = ''+seconds;
    if(hours==0){
        hoursStr='00';
    }
    if(hours>0&&hours<10){
        hoursStr='0'+hours;
    }

    if(minutes==0){
        minutesStr='00';
    }
    if(minutes>0&&minutes<10){
        minutesStr='0'+minutes;
    }

    if(seconds==0){
        secondsStr='00';
    }
    if(seconds>0&&seconds<10){
        secondsStr='0'+seconds;
    }

    let dateStr =hoursStr +':' + minutesStr + ':' + secondsStr + ' ' + day+'.'+month+'.'+y;
    element.innerHTML = `
    <div class="row1">
                <p>${name}</p>
                <p>${dateStr}</p>
            </div>
            <div class="row2">
                ${content}
            </div>
    `;

    document.getElementById('messages-container').appendChild(element);
}

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(extractElements(messageForm));
    addMessage(extractElements(messageForm)["name"], extractElements(messageForm)["content"]);
    messageForm.reset();
});

messageForm.addEventListener('input', () => {
    submitBtn.disabled = !messageForm.checkValidity();
});

nameField.addEventListener('input', () => {
    if(nameRegex.test(nameField.value)){
        nameField.style.borderColor = 'green';
    }
    else{
        nameField.style.borderColor = 'red';
    }
});


function extractElements(form){
    const elements = Array.from(form.elements).filter(el => {
        return el.name!='';
    });
    let result = new FormData();

    for(let el of elements){
        result[el.name]=el.type == 'checkbox' ? el.checked : el.value;
    }

    return result;
}

import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector(".form"),
}
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    let delay = Number(e.currentTarget.delay.value);
    const amount = Number(e.currentTarget.amount.value);
    const step = Number(e.currentTarget.step.value);
    let position = 0;
    for(let i = 0; i < amount; i += 1) {
      position += 1;
      createPromise(position, delay).then(result => {
        result
      })
      .catch(error => {
        error
      });
      delay = delay + step; 
     }   
  }

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout (() => {
        if (shouldResolve) {
            resolve (Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
        } else {
            reject (Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        }
        }, delay);  
  });
};





document.addEventListener('click', (e) => {
    e.preventDefault();
    let clEl = e.target;
    if (clEl.closest('[type="submit"]') && clEl.closest('form')) {
        try {
            const apiKey = document.querySelector('input.key').value.trim(),
                    hookUrl = document.querySelector('input.url').value.trim(),
                    url = 'https://api.wazzup24.com/v2/webhooks',
                    form = document.querySelector('form'),
                    data = { url: hookUrl };
            postData(url, data, apiKey)
            .then((data) => {
                if (data && data.error) { alert(`Ошибка: ${data.error["code"]}`); } else if (data.webhooksUrlChanged == true || data.webhooksUrlChanged == false) { alert('Хук зарегистрирован, делаем связку')}
            });
        } catch (e) {
             console.log(e); 
        } 
    } else if (clEl.closest('[type="button"]') && clEl.closest('form')) {
        window.open('https://new.albato.ru/user/auth/login', '_blank');
    }
});



async function postData(url, data, apiKey) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + apiKey,
        'Host': 'api.wazzup24.com'
      },
      body: JSON.stringify(data)
    });
    return await response.json(); 
}




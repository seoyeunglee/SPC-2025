// console.log('js load');

document.getElementById('jsonSendBtn').addEventListener('click', async() => {
    const data = document.getElementById('jsonInput').value;
    const res = await fetch('/api/submit-json', {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: data
    });
    // const result = await res.json();
    // console.log(result);

    const reply = await res.json();
    const output = document.getElementById('output');
    output.innerText = JSON.stringify(reply);

})

document.getElementById('formSubmit').addEventListener('click', async(ev) => {
    ev.preventDefault();

    const name = document.getElementById('formName').value;
    const age = document.getElementById('formAge').value;

    // const jsonData = {
    //     name: name,
    //     age: age
    // }
    
    // const res = await fetch('/submit-form', {
    //     method: 'POST',
    //     headers: { 'Content-Type':'application/json'},
    //     body: JSON.stringify(jsonData)
    // });

    const params = new URLSearchParams();
    params.append('name', name);
    params.append('age', age);

    const res = await fetch('/submit-form', {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: params.toString()
    });
})


document.getElementById('textSendBtn').addEventListener('click', async() => {
    console.log('textsendbtn');
    const text = document.getElementById('textInput').value;

    const res = await fetch('/submit-text', {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: text
    })
})
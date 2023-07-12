let urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams);

const screenType = params.id ? 'edit' : 'create';

window.onload = function(){
    setScreencTypeTexts();
    fillInputs();
}

function fillInputs(){
    if(screenType === 'edit'){
        fetch(`https://64ad3f79b470006a5ec59b1b.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(project => {
            document.querySelector('#title').value = project.title;
            document.querySelector('#totalCost').value = project.totalCost
            document.querySelector('#description').value = project.description
        })
    }
}

function setScreencTypeTexts(){
    //MODO EDITAR
    if(screenType == 'create'){
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    //MODO CRIAR
    if(screenType == 'edit'){
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
}

function createOrEdit(){
    let payload = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: "1"
    }
    
    fetch(`https://64ad3f79b470006a5ec59b1b.mockapi.io/api/projects${screenType === 'edit' ? ( '/' + params.id ) : ''}`,{
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        screenType === 'edit' ? alert('Editado com sucesso!') : alert('Cadastrado com sucesso!');
        window.location.href = "list.html"
    })
    .catch(error => {
        screenType === 'edit' ? alert('Erro ao editar!') : alert('Erro ao cadastrar!');
    })
}
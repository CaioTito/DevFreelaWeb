window.onload = function(){
    //Type: 'create' ou 'edit'
    const screenType = 'create';

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
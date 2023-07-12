function checkIfAnyRoleIsChecked(){
    let list = document.getElementsByName("role");
    let counter = 0;
    
    for(let radioButton of list){
        if(radioButton.checked === false){
            counter++;
        }
    }

    return counter !== list.length;
}

function cadastrar (){
    if(checkIfAnyRoleIsChecked() === false){
        alert("Marque algum perfil!")
        return;
    }

    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthDate: document.querySelector("#birthDate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    }
    
    fetch("https://64ad3f79b470006a5ec59b1b.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        localStorage.setItem("userName", response.fullName);
        localStorage.setItem("role", response.role === "dev" ? "Desenvolvedor" : "Cliente");

        alert('Cadastrado com sucesso!');

        window.location.href = "list.html";
    })
    .catch(error => {
        alert('Erro ao cadastrar!');
    })
}
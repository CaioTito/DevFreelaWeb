let list = [];

window.onload = function(){
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#role").innerText = localStorage.getItem("role");

    getProjects();
}

function getProjects(){
    fetch("https://64ad3f79b470006a5ec59b1b.mockapi.io/api/projects")
    .then(response => response.json())
    .then(response => {  
        list = response;
        buildTable();
    })
    .catch(error => {
        Swal.fire(
            'Algo deu errado!',
            'Erro ao carregar lista!',
            'error')
    })
}

function goToEdit(id){
    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id){
    fetch(`https://64ad3f79b470006a5ec59b1b.mockapi.io/api/projects/${id}`, {
        method: 'DELETE'    
    })
    .then(response => response.json())
    .then(response => { 
        list = list.filter(project => project.id != id);

        buildTable();
    })
}

function buildTable(){
    document.querySelector("#table-body").innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    list = list.filter (el => el.idClient === idClient);

    list.forEach(el => {
        let template = `
            <div class="row">
                <div class="title-description">
                    <h6 class="title">${el.title}</h6>
                    <p class="description">${el.description}</p>
                </div>
                <div class="price">R$ ${el.totalCost}</div>
                <div class="actions">
                    <span class="edit material-symbols-outlined" onclick="goToEdit(${el.id})">edit</span>
                    <span class="delete material-symbols-outlined" onclick="deleteProject(${el.id})">delete</span>
                </div>
            </div>` 
        
        document.querySelector("#table-body").insertAdjacentHTML("beforeend", template);
    });
}

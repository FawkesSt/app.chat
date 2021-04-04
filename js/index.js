let newField = (header, value = "") => `
    <div class="field">
        <button class="btn_delete" onclick="deleteField(this)">
        X
        </button>
        <p contenteditable="true">${header}</p>
        <input type="text" class=".inputcss" value="${value}"/>
        <button id="btn0" class="btn_copy" onclick="copyField(this)">
            Copiar
        </button>
    </div>`;

let macro = document.querySelector("#search-macro");
let addButton = document.querySelector(".add_button");
let saveButton = document.querySelector(".save_button");
let wrapper = document.querySelector(".field_wrapper");

function deleteField(elem) {
    const parent = elem.parentNode;
    var answer = window.confirm("Tem certeza que deseja deletar sua nota?");
        if (answer) {
            parent.parentNode.removeChild(parent);
    }
    else {
        
    }
    
}

function copyField(elem) {
    const parent = elem.parentNode;

    navigator.clipboard.writeText(
        parent.querySelector("input").value
    );
}

addButton.addEventListener("click", _ => {
    wrapper.innerHTML += newField(macro.value);
});

saveButton.addEventListener("click", _ => {
    let fields = document.querySelectorAll(".field");

    let save = [];

    fields.forEach(item => {
        save.push(
            {
                label: item.querySelector("p").innerHTML,
                content: item.querySelector("input").value
            }
        );
    });

    localStorage.setItem("chat-assistant", JSON.stringify(save));
});

function getSave() {
    let save = JSON.parse(localStorage.getItem("chat-assistant"));

    save.forEach(item => {
        wrapper.innerHTML += newField(item.label, item.content);
    });
}
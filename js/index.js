//------------------------------------- Definicion de variables

const studentsForm = document.forms['registroNotas'];
const listStudents = document.getElementById("estudiantes");
const aviseBG = document.getElementById("avisoBG");
const modal = document.getElementById("modal");
const msg = document.getElementById("msg");
const confirmBtn = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancel");
const okBtn = document.getElementById("okBtn");

//------------------------------------- Definicion de metodos

const showAvise = (confirmation, msgText) => {
    aviseBG.style.display = 'block';
    if (confirmation) {
        modal.style.display = 'block';
        const text = modal.getElementsByTagName("p")[0];
        text.innerHTML = msgText;
    } else {
        msg.style.display = 'block';
        const text = msg.getElementsByTagName("p")[0];
        text.innerHTML = msgText;
    }
};

const hideAvise = (confirmation) => {
    aviseBG.style.display = 'none';
    if (confirmation) {
        modal.style.display = 'none';
    } else {
        msg.style.display = 'none';
    }
}

const newStudentLog = (student) => {
    const row = document.createElement("tr");

    //celdas -----------------------------------------

    const codeCell = document.createElement("td");
    codeCell.textContent = student.codigo;

    const nameCell = document.createElement("td");
    nameCell.textContent = student.nombre;

    const note1Cell = document.createElement("td");
    note1Cell.textContent = student.nota1;

    const note2Cell = document.createElement("td");
    note2Cell.textContent = student.nota2;

    const note3Cell = document.createElement("td");
    note3Cell.textContent = student.nota3;

    const note4Cell = document.createElement("td");
    note4Cell.textContent = student.nota4;

    const defCell = document.createElement("td");
    defCell.textContent = student.definitiva;

    const anCell = document.createElement("td");
    anCell.textContent = student.AN;

    const btnCell = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnCell.appendChild(btnDelete);
    btnDelete.textContent = "Eliminar";
    btnDelete.addEventListener("click", () => {
        showAvise(true, "¿Esta seguro de eliminar el estudiante con codigo: <b>" + student.codigo + "</b>?");
        confirmBtn.addEventListener("click", () => {
            row.remove();
            hideAvise(true);
        });
    });

    cancelBtn.addEventListener("click", () => {
        hideAvise(true);
    });
    //---------------------------------------------------
    row.appendChild(btnCell);
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(note1Cell);
    row.appendChild(note2Cell);
    row.appendChild(note3Cell);
    row.appendChild(note4Cell);
    row.appendChild(defCell);
    row.appendChild(anCell);

    const tbody = listStudents.getElementsByTagName("tbody")[0];
    tbody.appendChild(row);
};

const verifyCode = (code) => {
    const rows = listStudents.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
            const studentCode = rows[i].getElementsByTagName("td")[1].textContent;
            const numCode = parseInt(studentCode);
            if (numCode == code) {
                showAvise(false, "El codigo <b>" + numCode + "</b> ya ha sido registrado.");
                return true;
            }
        }
    }
    return false;
};

const verifyNotes = (notes) => {
    for (const key in notes) {
        const note = notes[key];
        const numNote = parseFloat(note);
        
        if (numNote < 0 || numNote > 5) {
            showAvise(false, "<b>" + note + " (" + key + ")</b> no es una calificación valida.<br><br>Rango permitido de <b>0.0 a 5.0</b>");
            return false;
        }
    }
    return true;
};

const definitive = (notes) => {
    const nota1 = (notes.nota1*0.2);
    const nota2 = (notes.nota2*0.2);
    const nota3 = (notes.nota3*0.2);
    const nota4 = (notes.nota4*0.4);
    const def = (nota1+nota2+nota3+nota4);
    return def.toFixed(1);
};

const approval = (def) => {
    if (def >= 3) {
        return "A";
    } else {
        return "N";
    };
};

//------------------------------------- Definicion de eventos

studentsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = studentsForm["codigoInp"].value;

    if (!verifyCode(code)) {
        const notes = {
            nota1: studentsForm["nota1Inp"].value,
            nota2: studentsForm["nota2Inp"].value,
            nota3: studentsForm["nota3Inp"].value,
            nota4: studentsForm["nota4Inp"].value,
        };
    
        if (verifyNotes(notes)) {
            const def = definitive(notes);
            const student = {
                codigo: code,
                nombre: studentsForm["nombreInp"].value,
                nota1: notes.nota1,
                nota2: notes.nota2,
                nota3: notes.nota3,
                nota4: notes.nota4,
                definitiva: def,
                AN: approval(def),
            };
            newStudentLog(student);
        }
    }
});

okBtn.addEventListener("click", () => {
    hideAvise(false);
});
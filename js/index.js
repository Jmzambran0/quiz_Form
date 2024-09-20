//Definicion de variables

const studentsForm = document.forms['registroNotas'];
const listStudents = document.getElementById("estudiantes");
const modal = document.getElementById("modal");

//Definicion de metodos

const newStudentLog = (student) => {
    const row = document.createElement("tr");
    //celdas
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
        row.remove();
    });

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

const showAvise = (confirmation) => {

};

const verifyCode = (code) => {

};

const verifyNotes = (notes) => {
    for (const note in notes) {
        if (note < 0 || note > 5) {
            return false;
        };
    };
    return true;
};


const definitive = (student) => {
    const nota1 = (student.nota1*0.2);
    const nota2 = (student.nota2*0.2);
    const nota3 = (student.nota3*0.2);
    const nota4 = (student.nota4*0.4);
    const def = (nota1+nota2+nota3+nota4);
    return def;
};

//Definicion de eventos

studentsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const notes = {
        nota1: studentsForm["nota1Inp"].value,
        nota2: studentsForm["nota2Inp"].value,
        nota3: studentsForm["nota3Inp"].value,
        nota4: studentsForm["nota4Inp"].value,
    };

    if (verifyNotes(notes) == true) {
        const student = {
            codigo: studentsForm["codigoInp"].value,
            nombre: studentsForm["nombreInp"].value,
            nota1: notes.nota1,
            nota2: notes.nota2,
            nota3: notes.nota3,
            nota4: notes.nota4,
            definitiva: 0,
            AN: "",
        };
        newStudentLog(student);
    }
});

const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const message = document.getElementById("message");
const emptyMessage = document.getElementById("emptyMessage");

// Load saved students from browser storage
let students = JSON.parse(
    localStorage.getItem("students")
) || [];

// Display students
function displayStudents() {

    studentList.innerHTML = "";

    emptyMessage.style.display =
        students.length === 0 ? "block" : "none";

    students.forEach((student, index) => {

        const studentCard = document.createElement("div");

        studentCard.className = "student";

        const name = document.createElement("h3");
        name.textContent = student.name;

        const email = document.createElement("p");
        email.textContent = student.email;

        const course = document.createElement("p");
        course.textContent = student.course;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Student";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteStudent(index);
        });

        studentCard.append(name, email, course, deleteButton);

        studentList.appendChild(studentCard);
    });
}

// Add a student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;

    if (!name || !email || !course) {
        message.textContent = "Please complete all fields.";
        message.style.color = "red";
        return;
    }

    const newStudent = {
        name,
        email,
        course
    };

    students.push(newStudent);

    saveStudents();

    studentForm.reset();

    message.textContent = "Student added successfully!";
    message.style.color = "green";
});

// Save students in browser storage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Delete a student
function deleteStudent(index) {

    students.splice(index, 1);

    saveStudents();
}

// Initial display
displayStudents();

function emptyFormAlert() {
    let projectName = document.getElementById("project-name-input").value;
    let startDate = document.getElementById("start-date-input").value;
    let finishDate = document.getElementById("finish-date-input").value;
    let description = document.getElementById("description-input").value;
    let multiInput = document.querySelectorAll(".multi-input:checked");
    let image = document.getElementById("image-input").value;
    
    if(projectName == "") {
        return alert("Nama Project belum di isi");
    } else if(startDate == "") {
        return alert("star date belum di isi");
    } else if(finishDate == "") {
        return alert("finist dat belum di isi");
    } else if(description == "") {
        return alert("descripsi belum di isi");
    } else if(multiInput.length === 0) {
        return alert("technologi belum di isi");
    } else if(image == "") {
        return alert("gambar belum di pilih");
    };
};

let projectData = [];

function postProject(event) {
    event.preventDefault();

    let projectName = document.getElementById("project-name-input").value;
    let startDate = document.getElementById("start-date-input").value;
    let finishDate = document.getElementById("finish-date-input").value;
    let description = document.getElementById("description-input").value;
    let image = document.getElementById("image-input").files;

    let today = new Date().toISOString().split("T")[0];
    if (finishDate > today) {
        return alert("Tanggal tidak di temukan");
    };

    const jsIcon = '<i class="fa-brands fa-square-js fa-xl fa-fw"></i>';
    const bootstrapIcon = '<i class="fa-brands fa-bootstrap fa-xl fa-fw"></i>';
    const goIcon = '<i class="fa-brands fa-golang fa-xl fa-fw"></i>';
    const reactIcon = '<i class="fa-brands fa-react fa-xl fa-fw"></i>';

    let multiInput = document.querySelectorAll(".multi-input:checked");
    if(multiInput.length === 0) {
        return alert("pilih salah satu");
    };

    let jsIconDecide = document.getElementById("js-check").checked ? jsIcon : "";
    let bootstrapIconDecide = document.getElementById("bootstrap-check").checked ? bootstrapIcon : "";
    let goIconDecide = document.getElementById("go-check").checked ? goIcon : "";
    let reactIconDecide = document.getElementById("react-check").checked ? reactIcon : "";

    image = URL.createObjectURL(image[0]);
    console.log(image);

    const sDvalidation = new Date(startDate);
    const fDvalidation = new Date(finishDate);
    if (sDvalidation > fDvalidation) {
        return alert("harap di isi");
    };

    let projectPreviewCard = {
        projectName,
        startDate,
        finishDate,
        description,
        jsIconDecide,
        bootstrapIconDecide,
        goIconDecide,
        reactIconDecide,
        image,
    };

    projectData.push(projectPreviewCard);
    console.log(projectData);

    renderPpc();

    document.getElementById("project-name-input").value = "";
    document.getElementById("start-date-input").value = "";
    document.getElementById("finish-date-input").value = "";
    document.getElementById("description-input").value = "";
    document.getElementById("js-check").checked = false;
    document.getElementById("bootstrap-check").checked = false;
    document.getElementById("go-check").checked = false;
    document.getElementById("react-check").checked = false;
    document.getElementById("image-input").value = "";

    document.getElementById("project-form").reset();
};

const textarea = document.getElementById("description-input");
textarea.addEventListener("input", function() {
    const minChar = 10;
    const inputLength = this.value.length;

    if (inputLength < minChar) {
        textarea.setCustomValidity("Minimum " + minChar + " characters required.")
    } else {
        textarea.setCustomValidity("");
    }
});

function showFileName() {
    document.getElementById("image-file-name").innerHTML = document.getElementById("image-input").value;
};

function renderPpc() {
    document.getElementById("wrap-up-the-cards").innerHTML = "";

    for (let index = 0; index < projectData.length; index++) {
        const startDate = new Date(projectData[index].startDate);
        const finishDate = new Date(projectData[index].finishDate);
        const remainder = finishDate - startDate;
        const timeUnits = [
            {value: 365.25 * 24 * 60 * 60 * 1000, label: "year"},
            {value: 30 * 24 * 60 * 60 * 1000, label: "month"},
            {value: 7 * 24 * 60 * 60 * 1000, label: "week"},
            {value: 24 * 60 * 60 * 1000, label: "day"},
        ];

        let resultOfDuration = "";
        for (let calculation = 0; calculation < timeUnits.length; calculation++) {
            const {value, label} = timeUnits[calculation];
            const calculate = Math.floor(remainder / value);
            if (calculate > 0) {
                resultOfDuration = `${calculate} ${label}`;
                break;
            };
        };

        if (resultOfDuration === "") {
            resultOfDuration = "Less than a day";
        };

        document.getElementById("wrap-up-the-cards").innerHTML += `
        <div class="project-preview-card">
            <img src="${projectData[index].image}" alt="User Image"/>
            <a href="#">
                <h4>${projectData[index].projectName}</h4>
            </a>
            <p class="duration"> duration : ${resultOfDuration}</p>
            <p class="description">${projectData[index].description}</p>
            <div class="tech-icons">
                ${projectData[index].jsIconDecide}
                ${projectData[index].bootstrapIconDecide} 
                ${projectData[index].goIconDecide}
                ${projectData[index].reactIconDecide}
            </div>
            <div class="card-buttons">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        </div>
        `;
    };

    document.getElementById("wrap-up-the-scroll").scrollIntoView({behavior: 'smooth'});
};
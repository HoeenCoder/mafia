var classesDiv, settingsDiv;

var result = {classes: {}, settings: {}};

function createClassDiv(classData) {
    var classDiv = document.createElement('div');
    classDiv.setAttribute('class','mafiaclass');
    classDiv.innerHTML = '<div style="text-align:center;"><img src="images/' + classData.id + '.png"></div><div class="classname">' + classData.name + '</div><input type="number" name="' + classData.id + '" value="0" min="0" max="25"></div>';
    classesDiv.appendChild(classDiv);
}

function generateClasses() {
    classesDiv = document.getElementById('classes');

    for (var i = 0; i < Data.classes.length; i++) {
        createClassDiv(Data.classes[i]);
    }
}

function updateResult() {
    var resultElem = document.getElementById('results');
    resultElem.innerHTML = JSON.stringify(result);
}

function changeClass(element) {
    if (element.value) {
        result.settings[element.name] = element.value;
    } else if (result.settings[element.name]) {
        delete result.settings[element.name];
    }

    updateResult();
}

function changeSetting(element) {
    if (element.checked) {
        result.settings[element.name] = true;
    } else if (result.settings[element.name]) {
        delete result.settings[element.name];
    }

    updateResult();
}

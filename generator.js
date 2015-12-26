var classesDiv, settingsDiv;


function createClassDiv(classData) {
    var classDiv = document.createElement('div');
    classDiv.setAttribute('class','mafiaclass');
    classDiv.setAttribute('id',classData.id);
    classDiv.innerHTML = '<div style="text-align:center;"><img src="images/' + classData.id + '.png"></div><div class="classname">' + classData.name + '</div><input type="number" name="' + classData.id + 'num" value="0" min="0" max="25"></div>';
    classesDiv.appendChild(classDiv);
}

function generateClasses() {
    classesDiv = document.getElementById('classes');

    for (var i = 0; i < Data.classes.length; i++) {
        createClassDiv(Data.classes[i]);
    }
}

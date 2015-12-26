var classesDiv, settingsDiv;


function createClassDiv(classData) {
    var classDiv = document.createElement('div');
    classDiv.setAttribute('class','mafiaclass');
    classDiv.setAttribute('id',classData.id);
    classDiv.innerHTML = '<table><tr><td style="text-align:center;"><img src="images/' + classData.id + '.png"></td><td class="classname">' + classData.name + '</td><td><input type="number" name="' + classData.id + 'num" value="0" min="0" max="25"></td></tr></table>';
    classesDiv.appendChild(classDiv);
}

function generateClasses() {
    classesDiv = document.getElementById('classes');

    for (var i = 0; i < Data.classes.length; i++) {
        createClassDiv(Data.classes[i]);
    }
}

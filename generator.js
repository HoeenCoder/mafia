var classesDiv = document.getElementById('classes');
var settingsDiv = document.getElementById('settings');


function createClassDiv(classData) {
    var classDiv = document.createElement('div');
    classDiv.setAttribute('class','mafiaclass');
    classDiv.setAttribute('id',classData.id);
    classDiv.innerHTML = '<table><tr><td style="text-align:center;"><img src="images/' + classData.id + '.png"></td><td style="width:80%;">' + classData.name + '</td><td><input type="number" name="' + classData.id + 'num" value="0" min="0" max="25"></td></tr></table>';
    classesDiv.appendChild(classDiv);
}

function generateClasses() {
    for (var i = 0; i < classData.classes.length; i++) {
        createClassDiv(classData.classes[i]);
    }
}

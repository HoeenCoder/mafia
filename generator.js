var classesDiv = document.getElementById('classes');
var settingsDiv = document.getElementById('settings');


function createClassDiv(class) {
    var classDiv = document.createElement('div');
    classDiv.setAttribute('class','mafiaclass');
    classDiv.setAttribute('id',class.id);
    classDiv.innerHTML = '<table><tr><td style="text-align:center;"><img src="images/' + class.id + '.png"></td><td style="width:80%;">' + class.name + '</td><td><input type="number" name="' + class.id + 'num" value="0" min="0" max="25"></td></tr></table>';
    classesDiv.appendChild(classDiv);
}

function generateClasses() {
    var classData = JSON.parse(Data);

    for (var i = 0; i < classData.classes.length; i++) {
        createClassDiv(classData.classes[i]);
    }
}

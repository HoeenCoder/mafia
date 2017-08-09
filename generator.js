var addDiv, settingsDiv, side = "town";

var result = {rolelist: [], settings: {}};

function generate() {
    addDiv = document.getElementById('addRole');
    
    var out = '<details id="addRoleDetail"><summary cursor="pointer">Add a role</summary><br/>';
    
    out += '<br/>Choose an Alignment <b>(will reload chooseable roles and modifiers)</b>: <select id="alignSelect" onChange="updateAvaliableOptions(this)">';
    for (var k = 0; k < Data.alignments.length; k++) {
        out += '<option value="' + Data.alignments[k].id + '">' + Data.alignments[k].name + '</option>';
    }
    
    out += '</select><br/><br/>Choose a role: <select id="roleSelect">';
    out += roleSelectHTML();
    
    out += '</select><br/><br/>Choose Modifiers (if any, max of 5)<br/><b>Set Shot value to 0 for unlimited use</b><form id="modifiersForm">';
    out += modifiersHTML();
    
    out += '</form><br/>How many to add:<form><input id="roleNum" type="number" value="1" min="1" max="25"></form><br/>';
    out += 'Name of role (leave blank for default, I recommend you name the roles you use):<form><input id="roleNameInput" type="text" size="40"/></form><br/>';
    
    out += '<button onClick="addRole()">Add Role(s)</button></details>';
    
    addDiv.innerHTML = out;
}

function updateAvaliableOptions(element) {
    if (!element.value) return;
    side = element.value;
    var roleSelect = document.getElementById('roleSelect');
    roleSelect.innerHTML = roleSelectHTML();
    var modifiersForm = document.getElementById('modifiersForm');
    modifiersForm.innerHTML = modifiersHTML();
}

function roleSelectHTML() {
    var out = '';
    for (var i = 0; i < Data.classes.length; i++) {
        if (side === 'wildcard' && Data.classes[i].id !== 'wildcard') continue; // Special rules for Wild Card
        if (Data.classes[i].show) {
            if (Data.classes[i].show.indexOf(side) === -1) continue;
        }
        if (Data.classes[i].noShow) {
            if (Data.classes[i].noShow.indexOf(side) > -1) continue;
        }
        out += '<option value="' + Data.classes[i].id + '">' + Data.classes[i].name + '</option>';
    }
    return out;
}

function modifiersHTML() {
    var out = '<details><summary cursor="pointer">Modifiers</summary>';
    for (var j = 0; j < Data.modifiers.length; j++) {
        if (side === 'wildcard') return '<br/><b>No modifiers avaliable for Wild Card</b>';
        if (Data.modifiers[j].show) {
            if (Data.modifiers[j].show.indexOf(side) === -1) continue;
        }
        if (Data.modifiers[j].noShow) {
            if (Data.modifiers[j].noShow.indexOf(side) > -1) continue;
        }
        out += '<input type="checkbox" name="' + Data.modifiers[j].id + '"/>';
        if (!Data.modifiers[j].noShotLimit) {
            out += '<input name="' + Data.modifiers[j].id + '" type="number" value="0" min="0" max="25"/>-Shot ' + Data.modifiers[j].name + '<br/>';
        } else {
            out += Data.modifiers[j].name + '<br/>'
        }
    }
    out += '</details>';
    return out;
}

function defaultName(role) {
    var out = '';
    for (let i in role.modifiers) {
        if (role.modifiers[i]) {
            out += role.modifiers[i] + '-Shot ' + i + ' ';
        } else {
            out += i + ' ';
        }
    }
    out += role.role;
    return out;
}

function addRole() {
    var role = {
        num: parseInt(document.getElementById('roleNum').value),
        role: document.getElementById('roleSelect').value,
        side: document.getElementById('alignSelect').value,
        name: document.getElementById('roleNameInput').value.trim(),
        modifiers: {}
    };
    if (isNaN(role.num)) role.num = 1;
    var form = document.getElementById('modifiersForm'), numMods = 0;
    for (let m = 0; m < form.length; m++) {
        let mod = form[m];
        if (mod.type === 'checkbox') {
            if (mod.checked) {
                role.modifiers[mod.name] = 0;
                numMods++;
            }
        } else {
            if (role.modifiers.hasOwnProperty(mod.name)) role.modifiers[mod.name] = parseInt(mod.value);
        }
        if (numMods > 5) {
            alert('You cannot have more than 5 role modifiers on a single role!');
            return;
        }
    }
    if (!role.name) role.name = defaultName(role);
    role.id = role.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    for (var i = 0; i < result.rolelist.length; i++) {
        if (result.rolelist[i].id === role.id) {
            alert('You can\'t have two roles with the same name! (' + role.name + ') If you want to add more of this role, use the buttons in the rolelist.');
            return;
        }
    }
    console.log(role);
    result.rolelist.push(role);
    updateResult();
    updateRoles();
    document.getElementById('addRoleDetail').removeAttribute("open");
    generate();
}

function incrementRole(el, amount) {
    var id = el.id
    amount = parseInt(amount);
    if (isNaN(amount) || amount < -10 || amount > 10 || amount === 0) return;
    for (var i = 0; i < result.rolelist.length; i++) {
        if (result.rolelist[i].id === id) {
            result.rolelist[i].num += amount;
            if (result.rolelist[i].num < 1) result.rolelist[i].num = 1;
            break;
        }
    }
    updateResult();
    updateRoles();
}

function removeRole(el) {
    var id = el.id;
    for (var i = 0; i < result.rolelist.length; i++) {
        if (result.rolelist[i].id === id) {
            result.rolelist.splice(i, 1);
            break;
        }
    }
    updateResult();
    updateRoles();
}

function updateResult() {
    var resultElem = document.getElementById('results');
    if (result.rolelist.length) {
        resultElem.innerHTML = "/mafia setroles " + JSON.stringify(result);
    } else {
        resultElem.innerHTML = "Please select classes to use.";
    }
}

function changeSetting(element) {
    if (element.checked) {
        result.settings[element.name] = true;
    } else if (result.settings[element.name]) {
        delete result.settings[element.name];
    }

    updateResult();
}

function updateRoles() {
    let roles = document.getElementById('roles');
    let out = '';
    for (var i = 0; i < result.rolelist.length; i++) {
        out += '<div><b>' + result.rolelist[i].num + ' ' + result.rolelist[i].name + '</b> <button id="' + result.rolelist[i].id + '" onClick="incrementRole(this, 1)">Add one</button> ';
        if (result.rolelist[i].num > 1) out += '<button id="' + result.rolelist[i].id + '" onClick="incrementRole(this, -1)">Remove one</button> ';
        out += '<button id="' + result.rolelist[i].id + '" onClick="removeRole(this)">Remove this role</button></div>';
    }
    roles.innerHTML = out;
}

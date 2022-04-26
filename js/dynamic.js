function Switch(id)
{
    document.getElementById(id).classList.toggle('hidden');
    return false;
}

function switch_theme_list() 
{
    document.getElementById("theme_list").classList.toggle("hidden");
    return false;
}

function open_theme_editor () {
    document.getElementById("theme_editor").classList.remove("hidden");
    fill_theme_editor()
    return false;
}
function close_theme_editor () {
    document.getElementById("theme_editor").classList.add("hidden");
    return false
}

function Switch_editbar() {
    if (document.getElementById("Editbar").classList.contains("hidden")) {
        editbarOpen()
    }
    else {
        editbarClose()
        filterbarClose()
    }
}

function editbarOpen()
{
    document.getElementById("Editbar").classList.remove("hidden");
    Switch('setting_menu');
    genEditOrder();
    return false;
}

function editbarClose()
{
    if (there_are_changes) {
        if (confirm('Вы не применили последние изменения и при следующей перезагрузке ' + 
                    'страницы они будут утеряны. Применить сейчас?')) {
            save_settings()
            there_are_changes = false
        }
    }
    document.getElementById("Editbar").classList.add("hidden");
    document.getElementById("Filterbar").classList.add("hidden");
    return false;
}

function filterbarShow(listName)
{
    document.getElementById("Filterbar").classList.remove("hidden");
    genFilterList(listName);
    return false;
}

function filterbarClose()
{
    document.getElementById("Filterbar").classList.add("hidden");
    return false;
}

function switch_issue_report () {
    if (document.getElementById("issue_form").classList.contains("hidden")) {
        open_issue_report()
    }
    else close_issue_report()
}

function open_issue_report () {
    document.getElementById("issue_form").classList.remove("hidden");
    fid = 'start';
    AF_selected = '';
    AF_value = '';
    AF_count = '';
    for (key in issue_report) delete issue_report[key]
    generate_form(fid);
    return false;
}

function close_issue_report () {
    document.getElementById("issue_form").classList.add("hidden");
    document.getElementById("issue_form").innerHTML = '';
    return false;
}

function switch_event_list () {
    document.getElementById("EventList").classList.toggle("hidden");
}

auto_alt_click = false
function switch_alt_click () {
    auto_alt_click = !auto_alt_click
    if (auto_alt_click) document.getElementsByClassName('enable_alt_click')[0].setAttribute('style', 'background: var(--color-hover_1)')
    else document.getElementsByClassName('enable_alt_click')[0].removeAttribute('style')
    return false;
}

close_this = false
function open_favorite_list () {
    if (!close_this) {
        document.getElementById('favorite_content').classList.remove("hidden");
        fill_favorite_list();
    }
    close_this = false
    return false;
}

function close_favorite_list () {
    document.getElementById('favorite_content').classList.add("hidden");
    close_this = true
    return false;
}

function open_print_page () {
    window.open(document.location.href.replace(document.location.search, '?print_group_name=' + get_current_group_name().replaceAll(' ', '_')), '_blank');
}


function dragElement(elem, dragable_subelem = null) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (dragable_subelem != null) {
        if (typeof dragable_subelem == 'number') elem.children[dragable_subelem].onmousedown = dragMouseDown;
        else document.getElementById(dragable_subelem).onmousedown = dragMouseDown;
    } 
    else elem.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elem.style.top = (elem.offsetTop - pos2) + "px";
    elem.style.left = (elem.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function Switch(id, to = null)
{
    switch (to) {
        case true:
        case 'true':
        case 'enabled':
            document.getElementById(id).classList.remove('hidden');
            break

        case false:
        case 'false':
        case 'disabled':
            document.getElementById(id).classList.add('hidden');
            break

        default:
            document.getElementById(id).classList.toggle('hidden');
            break
    }

    return false;
}

function switch_theme_list() 
{
    document.getElementById("theme_list").classList.toggle("hidden");
    return false;
}

function open_theme_editor () {
    let elem = document.getElementById("theme_editor")
    elem.classList.remove("hidden")
    elem.innerHTML = '<div style="margin: 10px 10px 0 10px">Настройки темы</div><a class="asidebar-close" onclick="close_theme_editor();">'
    fill_theme_editor(elem)
    return false;
}
function close_theme_editor () {
    document.getElementById("theme_editor").classList.add("hidden");
    return false
}

function switch_comparing() {
    let comparing_panel = document.getElementById("ComparePanel")
    if (comparing_panel.classList.contains('hidden')) Switch('setting_menu', to = false);
    comparing_panel.classList.toggle("hidden")
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

function SwitchImportPanel() {
    if (document.getElementById("ImportPanel").classList.contains("hidden")) {
        ImportPanelOpen()
    }
    else ImportPanelClose()
}

function ImportPanelOpen()
{
    document.getElementById("ImportPanel").classList.remove("hidden");
    return false;
}

function ImportPanelClose()
{
    document.getElementById("ImportPanel").classList.add("hidden");
    return false;
}

function ExportPanelOpen()
{
    if (there_are_changes) {
        if (confirm('Вы не применили последние изменения и они не будут внесены ' + 
                    'в строку для экспорта. Применить сейчас?')) {
            save_settings()
            there_are_changes = false
        }
    }
    fill_export_panel()
    document.getElementById("ExportPanel").classList.remove("hidden");
    return false;
}

function ExportPanelClose()
{
    document.getElementById("ExportPanel").classList.add("hidden");
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
    try {
        document.querySelector('#invitation_editor > textarea').value = invitation_preset
    } catch {}
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

function open_week_list () {
    let weekbar = document.getElementById('Weekbar')
    weekbar.classList.remove('hidden')
    generate_weekbar(weekbar_type)
}

function close_week_list () {
    let weekbar = document.getElementById('Weekbar')
    weekbar.classList.add('hidden')
}

function switch_week_list () {
    let weekbar = document.getElementById('Weekbar')
    if (weekbar.classList.contains('hidden')) open_week_list()
    else close_week_list()
}


function init_compare_panel () {
    let panel = document.getElementById('ComparePanel')

    panel.innerHTML = `
    <p class="export_panel-title">Сравнение расписания</p>
    <a class="asidebar-close" onclick="switch_comparing()"></a>

    <div class="hidden" style="display: none !important;">
        <div id="Compare_list">
            <div class="compared_group_elem" id="pre_cmp_${main_rasp.name}" onclick="main_rasp.highlight_own_group()">
                <div style="background-color: var(--color-error); opacity: .1"></div>
                <label>${main_rasp.name}</label>
            </div>
        </div>
    </div>

    <div style="overflow-y: auto">
        <div id='ComparePanel-add'>
            <input type='text' placeholder='Введите имя...' id='compare_name_input' onchange='document.getElementById("compare_name_enter").removeAttribute("class")' onkeypress='add_compare_group_by_enter(event.key)'>
            <input type='button' value='Добавить' id='compare_name_enter' onclick='main_rasp.compare_to(document.getElementById("compare_name_input").value)'>
        </div>

        <table id="ComparePanel-table">
            <tbody>
            </tbody>
        </table>

        <input type='button' id="copy_compare_link" value='Скопировать ссылку' onclick='main_rasp.clipboard_link()'>
    </div>
    `

    let table = panel.querySelector('#ComparePanel-table')
        
    if (table != null) {
        table = table.children[0]

        let tr = document.createElement('tr')
        tr.setAttribute('id', 'cmp_' + main_rasp.name)
        tr.style.borderBottom = '10px solid var(--color-background)'

        let td = document.createElement('td')
        td.innerText = '×'
        td.style.color = 'var(--color-halftone_text)'
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerText = main_rasp.name
        td.onclick = function () { main_rasp.highlight_own_group() }
        tr.appendChild(td)

        td = new_clr_input(cmp_clr_input_width, rec_themes[MODE]['vars']['--color-error'], main_rasp.name, true, 3, 3, cmp_clr_input_height)
        td.style.width = cmp_clr_input_width.toString() + 'px'
        let check_input = td.children[0]
        let div         = td.children[1]
        let clr_input   = td.children[2]

        let preview = panel.querySelector('#pre_cmp_' + main_rasp.name)
        let preview_clr = preview.children[0]

        clr_input.title = ''
        clr_input.oninput = function () {
            div.style.backgroundColor = clr_input.value
            preview_clr.style.backgroundColor = clr_input.value
            main_rasp.colour_own_group(clr_input.value)
            check_input.checked = true
        }
        clr_input.onchange = null
        check_input.onchange = function () {
            if (check_input.checked) {
                main_rasp.colour_own_group(clr_input.value)
                preview_clr.style.opacity = '1'
            }
            else {
                main_rasp.decolour_own_group()
                preview_clr.style.opacity = '.1'
            }
        }
        check_input.checked = false
        tr.appendChild(td)

        table.appendChild(tr)
    }

    main_rasp.build_compare_panels()
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

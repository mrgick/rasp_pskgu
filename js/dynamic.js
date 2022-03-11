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
        if (confirm('Вы не применили последние изменения и при следующей перезагрузке страницы они будут утеряны. Применить сейчас?')) {
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
}

function close_issue_report () {
    document.getElementById("issue_form").classList.add("hidden");
    document.getElementById("issue_form").innerHTML = '';
}

auto_alt_click = false
function switch_alt_click () {
    auto_alt_click = !auto_alt_click
    if (auto_alt_click) document.getElementsByClassName('enable_alt_click')[0].setAttribute('style', 'background: var(--color-light)')
    else document.getElementsByClassName('enable_alt_click')[0].removeAttribute('style')
    return false
}

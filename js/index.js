
async function main(find_name, group_name) {

    if (find_name) {
        return await loadSearch(find_name);
    } else if (group_name) {
        return await loadGroup(group_name);
    }
    else {
        return await loadBlank();
    }
}

// Главная страница
async function loadBlank()
{
    generate_main_page();
}

// Поисковая страница
async function loadSearch(find_name)
{
    generate_search_page(find_name);

    let list_names = await get_list_groups();
    groups_found = find_substr_in_array_of_str(list_names, find_name);
    if (groups_found.length == 1)
    {
        window.history.pushState(document.URL, "", document.URL.split('?')[0] + "?group_name=" + groups_found[0]);
        loadGroup(groups_found[0]);
    }
    else if (groups_found.length > 1)
    {
        document.getElementById("Groups_List").innerHTML='';
        generate_list(groups_found, document.getElementById('Groups_List'));
    }
    else
    {
        document.getElementById("Groups_List").innerHTML='<p class="groups-text groups-text-error">Соответствий не найдено!</p>'
    }
}

// Страница расписания
async function loadGroup(group_name)
{

    let group = await get_group_info(group_name)

    generate_rasp_page(group);
    // Вставка имени группы

    let days_length = Object.keys(group.days).length

    // Проверка на пустоту
    if (days_length == 0) {
        rasp_add_empty()
        return
    }

    // Генерация таблиц
    let first_date = Object.keys(group.days)[0]
    let last_date = new Date(Object.keys(group.days)[days_length - 1])
    let day = get_monday(first_date)

    let week = 0;
    
    while (new Date(day) <= last_date) {
        generate_table(group, day, ++week);
        day = get_next_day(day, 7);
    }
    
    generate_css_classes()
    renew_table_time_status()
    
    if (document.URL.split("#")[1] != undefined)
    {
        document.getElementById(document.URL.split("#")[1]).scrollIntoView();
    }
    else
    {
        document.getElementById(`Week_${getCurrentWeek(first_date)}`).scrollIntoView();
    }
}

async function loadList()
{
    STRUCT = await get_list_groups('structure');
    generate_groups_list();
    genPossibilities(null, 'Education_Form');
}

var STRUCT
var MODE;
var tracking_status;
window.onload = async function ()
{
    let settings = readCookie("mode")
    if (settings) [MODE, tracking_status] = settings.split('|');
    else [MODE, tracking_status] = ['light', 'false']
    if (tracking_status == 'false') tracking_status = false
    else tracking_status = true

    SetTheme();
    if (window.location.search == "?list")
    {
        await loadList();
        return;
    }
    const params = new URLSearchParams(window.location.search);
    await main(params.get("find_group_name"), params.get("group_name"));
}

function ChangeTheme()
{
    if (MODE == "dark")
    {
        MODE = "light";
    }
    else // if (MODE = "light")
    {
        MODE = "dark";
    }
    createCookie("mode", MODE+'|'+tracking_status.toString(), 30);
    SetTheme();
    return false;
}

function change_tracking_status () {
    tracking_status = !tracking_status
    createCookie("mode", MODE+'|'+tracking_status.toString(), 30);
    renew_table_time_status()
}

function SetTheme()
{
    if (MODE == "dark")
    {
        document.getElementById("CSS-Theme").setAttribute("href", "styles/dark-style.css");
        update_base_styles();
    }
    else // if (MODE = "light" or null)
    {
        MODE = "light"
        document.getElementById("CSS-Theme").setAttribute("href", "styles/light-style.css");
        update_base_styles();
    }
}

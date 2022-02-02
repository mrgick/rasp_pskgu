
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
    generate_search_page();

    let list_names = await get_list_groups();
    groups_found = find_substr_in_array_of_str(list_names, find_name);
    if (groups_found.length == 1)
    {
        loadGroup(groups_found[0]);
    }
    else if (groups_found.length > 1)
    {
        document.getElementById("Groups_List").innerHTML='';
        generate_list(groups_found, document.getElementById('Groups_List'));
    }
    else
    {
        document.getElementById("Groups_List").innerHTML='<p class="groups-text groups-text-error">Соответсвий не найдено!</p>'
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
}

var MODE;
window.onload = async function ()
{
    SetTheme();
    const params = new URLSearchParams(window.location.search)
    await main(params.get("find_group_name"), params.get("group_name"))
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
    createCookie("mode",MODE,7);
    SetTheme();
    return false;
}
function SetTheme()
{
    MODE = readCookie("mode");
    if (MODE == "dark")
    {
        document.getElementById("CSS-Theme").setAttribute("href", "styles/dark-style.css");
    }
    else // if (MODE = "light")
    {
        document.getElementById("CSS-Theme").setAttribute("href", "styles/light-style.css");
    }
}
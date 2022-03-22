
async function main(find_name, group_name, print_group_name) {

    if (find_name) {
        return await loadSearch(find_name);
    } else if (group_name) {
        return await loadGroup(group_name);
    } else if (print_group_name) {
        return await load_print_page(print_group_name);
    } else {
        return await loadBlank();
    }
}

// Главная страница
async function loadBlank()
{
    generate_main_page();
    insert_themes()
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
    insert_themes()
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
        used_class_names = create_used_class_names()
        insert_date_of_last_update('', new Date(group.last_updated))
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
    
    insert_themes()
    generate_css_classes()
    insert_recomended_styles()
    renew_table_time_status()
    insert_date_of_last_update(last_date, new Date(group.last_updated))
    if (check_is_favorite()) is_favorite()
    dragElement(document.getElementById('Editbar'), 0)
    dragElement(document.getElementById('Filterbar'), 0)
    
    if (document.location.hash != '')
    {
        document.getElementById(document.location.hash.split('#')[1]).scrollIntoView();
    }
    else try
    {
        document.getElementById(`Week_${getCurrentWeek(first_date)}`).scrollIntoView();
    }
    catch {}
}

async function loadList()
{
    STRUCT = await get_list_groups('structure');
    generate_groups_list();
    genPossibilities(null, 'Education_Form');
    insert_themes();
}


async function load_print_page (group_name) {
    let group = await get_group_info(group_name)

    document.documentElement.style.setProperty('--table-inline', '1')

    document.documentElement.style.setProperty('--table-page_width' , '297mm')
    document.documentElement.style.setProperty('--table-page_height', '210mm')

    document.documentElement.style.setProperty('--table-font_size', '8pt')

    document.documentElement.style.setProperty('--table-side_padding'  , '5mm')
    document.documentElement.style.setProperty('--table-top_padding'   , '5mm')
    document.documentElement.style.setProperty('--table-bottom_padding', '5mm')

    generate_print_preview(group);

    let days_length = Object.keys(group.days).length

    // Проверка на пустоту
    if (days_length == 0) {
        rasp_add_empty()
        used_class_names = create_used_class_names()
        return
    }

    // Генерация таблиц
    let first_date = Object.keys(group.days)[0]
    let last_date = new Date(Object.keys(group.days)[days_length - 1])
    let day = get_monday(first_date)

    let week = 0;
    
    while (new Date(day) <= last_date) {
        generate_printable_table(group, day, ++week);
        day = get_next_day(day, 7);
    }
    try {document.getElementById('Week_' + week).setAttribute('style', 'margin-bottom: 0px')}
    catch {}
    
    generate_css_classes()
    set_clr_theme('light', true, false)
    dragElement(document.getElementById('print_panel'), 'PP_rec')

    let styles = document.getElementsByTagName('style')
    for (style of styles) {
        if (ignored_styles.indexOf(style.getAttribute('id')) !== -1) continue
        style.setAttribute('media', '1')
    }
}


var STRUCT;
var tracking_status;
window.onload = async function ()
{
    need_up_warning = check_for_cookies();
    let settings = readCookie("mode")
    if (settings) tracking_status = settings.split('|')[1];
    else tracking_status = 'false'
    if (tracking_status == 'false') tracking_status = false
    else tracking_status = true

    set_clr_theme(MODE, true)

    if (window.location.search == "?list")
    {
        await loadList();
        return;
    }
    const params = new URLSearchParams(window.location.search);
    await main(params.get("find_group_name"), params.get("group_name"), params.get("print_group_name"));
    
    if (need_up_warning) up_warning('Пользуясь данным сайтом, вы автоматически соглашаетесь с ' + 
                                    'политикой использования Cookie файлов на этом сайте. ' + 
                                    'Они используются для хранения Ваших персональных настроек.', 
                                    'Cookies');
}

function change_tracking_status () {
    tracking_status = !tracking_status
    createCookie("mode", MODE+'|'+tracking_status.toString(), 30);
    renew_table_time_status()
}

function up_warning (warning_text, warning_header = 'Предупреждение') {
    document.getElementById('AW_header').innerHTML = `<h1>${warning_header}</h1>`
    document.getElementById('AW_content').innerHTML = `<p>${warning_text}</p>`
    document.getElementById("aside_warning").classList.remove("hidden")
}

function check_for_cookies () {
    if (readCookie('Cookies_enabled')) return false
    else {
        createCookie('Cookies_enabled', 'true', 180)
        if (readCookie('Cookies_enabled')) {
            return true
            }
        else return false
    }
}

function adapt_search_text () {
    let input = document.getElementsByClassName('search-form-input')[0]
    input.value = input.value.replaceAll(' ', '_')
}

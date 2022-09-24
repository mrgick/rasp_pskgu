
async function parse_params () {
    let params = new URLSearchParams(window.location.search)

    switch (params.get("from")) {
        case "vk.com":
            window.location.search
            window.location = decode_win1251(window.location.toString().replace('from=vk.com', ''))
            params = new URLSearchParams(window.location.search)
            break
    }

    switch ('string') {
        case typeof params.get('list'            ): load = 'list'  ; break
        case typeof params.get('event'           ): load = 'event' ; break
        case typeof params.get('find_group_name' ): load = 'search'; break
        case typeof params.get('group_name'      ): load = 'rasp'  ; break
        case typeof params.get('print_group_name'): load = 'print' ; break

        default: load = 'blank'
    }

    await main(load, params)
}

async function main(page, params = null) {
    if (params === null) params = new URLSearchParams(window.location.search)

    switch (page) {
        case 'list'  : await loadList(); break
        case 'event' : await add_event_from_link(params.get('event')); break
        case 'search': await loadSearch(params.get('find_group_name')); break
        case 'rasp'  : await loadGroup(params.get('group_name'), params.get('compare_to')); break
        case 'print' : await load_print_page(params.get('print_group_name')); break

        default: await loadBlank()
    }
}

// Главная страница
async function loadBlank()
{
    generate_main_page();
    insert_themes();
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
        generate_list(groups_found);
    }
    else
    {
        document.getElementById("Groups_List").innerHTML='<p class="groups-text groups-text-error">Соответствий не найдено!</p>'
    }
    insert_themes()
}

let main_rasp = null
let first_day = '9999-01-01'
let last_day = '2000-01-01'

// Страница расписания
async function loadGroup(group_name, compare_to = null)
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
    main_rasp = new full_rasp(group)

    first_day = main_rasp.first_day
    last_day  = main_rasp.last_day

    create_class('compare', '')
    if (compare_to != null) {
        for (let group of compare_to.split(',')) main_rasp.compare_to(group)
        switch_comparing()
    }
    
    used_class_names = create_used_class_names()
    insert_themes()
    generate_css_classes()
    insert_recomended_styles()
    renew_table_time_status()
    insert_date_of_last_update(new Date(main_rasp.last_day), new Date(group.last_updated))
    if (check_is_favorite()) is_favorite()
    prepare_for_week_cal()
    dragElement(document.getElementById('Editbar'), 0)
    dragElement(document.getElementById('Filterbar'), 0)
    dragElement(document.getElementById('Weekbar'))
    dragElement(document.getElementById('ComparePanel'), 0)
    
    if (document.location.hash != '') try {
        document.getElementById(document.location.hash.split('#')[1]).scrollIntoView();
    } catch {}
    else try {
        main_rasp.get_table_now().html.scrollIntoView();
    } catch {}
    load_events_from_cookie()
    load_invitation_preset()
}

async function loadList()
{
    STRUCT = await get_list_groups('structure');
    generate_groups_list();
    genPossibilities(null, 'Education_Form');
    insert_themes();
}


async function load_print_page (group_name) {
    send_action('Открыта страница для печати', group_name)

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
var tracking_status = true;
var collecting_data = true;
var weekbar_type = 'cal';

function load_mode_from_cookie () {
    let result = readCookie("mode")
    if (result) {
        let settings = result.split('|')
        switch (settings.length) {
            case 4:
                weekbar_type = settings[3]
                if (available_weekbar_types.indexOf(weekbar_type) === -1) weekbar_type = 'cal'

            case 3:
                collecting_data = settings[2]
                if (collecting_data == 'false') collecting_data = false
                else collecting_data = true

            case 2:
                tracking_status = settings[1]
                if (tracking_status == 'false') tracking_status = false
                else tracking_status = true

            case 1:
                MODE = settings[0]
                if (!rec_themes[MODE]) MODE = 'light'
        } 
    }
}

function save_mode_to_cookie () {
    createCookie("mode", MODE+'|'+
                         tracking_status.toString()+'|'+
                         collecting_data.toString()+'|'+
                         weekbar_type, 90);
}

window.onload = async function ()
{
    let need_up_warning = check_for_cookies();
    load_mode_from_cookie()
    save_mode_to_cookie()

    set_clr_theme(MODE, true)

    await parse_params()
    
    if (need_up_warning) up_warning('Пользуясь данным сайтом, вы автоматически соглашаетесь с ' + 
                                    'политикой использования Cookie файлов на этом сайте. ' + 
                                    'Они используются для хранения Ваших персональных настроек.', 
                                    'Cookies');

    if (!readCookie('unique') && collecting_data) 
        up_warning('Для повышения качества сайта ведётся сбор некоторой ' +
                   'неперсонализированной информации об использовании функций.\n ' +
                   'Подробнее о собираемой информации можно узнать в руководстве "Сбор ' +
                   'данных сайтом", которое можно найти в справке в меню действий.\n ' +
                   'Если Вы не хотите, чтобы сайт собирал информацию, ' +
                   'отключить её можно в меню действий в пункте "Разрешить ' + 
                   'сбор информации"');

    send_action('')
}

function change_tracking_status () {
    tracking_status = !tracking_status
    save_mode_to_cookie()
    renew_table_time_status()
}

function switch_collecting_data () {
    if (collecting_data) {
        document.getElementsByClassName('switcher-collect_data'
             )[0].setAttribute('class', 'switcher-collect_data--rejected')
    }
    else {
        document.getElementsByClassName('switcher-collect_data--rejected'
             )[0].setAttribute('class', 'switcher-collect_data')
    }
    collecting_data = !collecting_data
    save_mode_to_cookie()
}

let warning_id = 0
let active_warnings_id = []

function up_warning (warning_text, warning_header = 'Предупреждение') {
    document.getElementById("aside_warning_list").innerHTML += `
        <div class='aside_warning' id='aside_warning_${warning_id}'>
            <div class='AW_header'><h1>${warning_header}</h1></div>
            <div class='AW_content'><p>${warning_text.replaceAll('\n', '</p><p>')}</p></div>
            <div class='AW_OK'><button onclick='close_warning(${warning_id})'>хорошо</button></div>
        </div>
        `
    active_warnings_id.push(warning_id)
    warning_id++
}

function close_warning (wid) { document.getElementById("aside_warning_" + wid).remove() }

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


const tracking_form_url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf-c1T4dl9eKHMawEL4Mv1nodbI6H93aFEwdhB6M6qMXkefWw/formResponse'
let sended_actions = 0

function send_action (heading, text = '') {
    return
    if (!collecting_data) return

    let u_check = ''
    let d_check = ''
    let o_check = ''

    let user_theme = -1

    if (heading == '') {
        if (!readCookie('unique')) {u_check = 'checked'; createCookie('unique', '6'   , 365*5       )}
        if (!readCookie('day'   )) {d_check = 'checked'; createCookie('day'   , 'true', 1           )}
        if (!readCookie('opened')) {o_check = 'checked'; createCookie('opened', 'true', 1/24/60 * 15)}
        if (u_check == '' && d_check == '' && o_check == '') return

        if (d_check === 'checked') {
            let value = readCookie('unique')
            switch (value) {
                case '-1': break

                case '0':
                    user_theme = Object.keys(rec_themes).indexOf(MODE)
                    createCookie('unique', '-1', 365*5)
                    break

                default:
                    createCookie('unique', (value - 1).toString(), 365*5)
                    break
            }
        }
    }
    
    sended_actions++

    let imit_form = document.createElement('div')
    imit_form.setAttribute('id', 'tracking_form_div_' + sended_actions)
    imit_form.setAttribute('style', 'display: none')
    imit_form.innerHTML = `
    <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe>
    <form
    id='tracking_form_${sended_actions}'
    action="${tracking_form_url}"
    method="POST"
    target="dummyframe"
    style='display: none'
    >
        <input id='tracking_form_${sended_actions}_submit' type="submit" value="отправить"/> 

        <fieldset>
            <input type='checkbox' name='entry.1581939518' ${u_check} value='уникальное посещение'>
            <input type='checkbox' name='entry.1581939518' ${d_check} value='дневное посещение'>
            <input type='checkbox' name='entry.1581939518' ${o_check} value='открытие сайта'>
        </fieldset>

        <fieldset>
            <input type='checkbox' name='entry.1610034384' ${user_theme == 0? 'checked' : ''} value='светлая'>
            <input type='checkbox' name='entry.1610034384' ${user_theme == 1? 'checked' : ''} value='розовая'>
            <input type='checkbox' name='entry.1610034384' ${user_theme == 2? 'checked' : ''} value='чёрная'>
            <input type='checkbox' name='entry.1610034384' ${user_theme == 3? 'checked' : ''} value='тёмная'>
            <input type='checkbox' name='entry.1610034384' ${user_theme == 4? 'checked' : ''} value='пользовательская'>
        </fieldset>

        <fieldset>
            <input type='checkbox' name='entry.1262453540' checked value='__other_option__'>
            <input type='text' name='entry.1262453540.other_option_response' value='${heading}'>
        </fieldset>

        <fieldset>
            <textarea name='entry.546127804'>${text}</textarea>
        </fieldset>
    </form>
    `

    document.getElementsByTagName('body')[0].appendChild(imit_form)
    imit_form.children[1].submit()
    //imit_form.remove()
}

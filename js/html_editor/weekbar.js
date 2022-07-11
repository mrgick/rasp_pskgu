let week_cal_offset = 0
let wco_min_value = -2
let wco_max_value = 2

const cal_monthes = [               'январь' , 'февраль', 
                        'март'    , 'апрель' , 'май'    , 
                        'июнь'    , 'июль'   , 'август' , 
                        'сентябрь', 'октябрь', 'ноябрь' , 
                        'декабрь' ]

function prepare_for_week_cal () {
    wco_min_value = 3 - weeks_between(first_day, new Date())
    wco_max_value = weeks_between(new Date(), last_day) - 3

    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.setAttribute('id', 'style_cal_filters')
    document.getElementsByTagName('head')[0].appendChild(style)

    fill_cal_filters()
    generate_weekbar(weekbar_type)
}

let cal_filters = ['', '', '', '', '', '', '']
function fill_cal_filters () {
    let clr = document.documentElement.style.getPropertyValue('--color-special')
    clr = [ convert_sys_to_10(clr.slice(1,3).toLowerCase(), 16), 
            convert_sys_to_10(clr.slice(3,5).toLowerCase(), 16),
            convert_sys_to_10(clr.slice(5,7).toLowerCase(), 16)].join(', ')

    let style = document.getElementById('style_cal_filters')
    if (style) {
        style.innerHTML = ''
    
        for (let i = 0; i < cal_filters.length; i++) {
            cal_filters[i] = `rgba(${clr}, ${0.16 * i})`
            style.innerHTML += `.cal_filter_${i} {background-color: ${cal_filters[i]}}`
        }
    }
}

const available_weekbar_types = ['cal', 'list']

function generate_weekbar (generate = 'cal') {
    if (available_weekbar_types.indexOf(generate) === -1) generate = 'cal'

    weekbar_type = generate
    save_mode_to_cookie()

    if (generate == 'list') {
        document.getElementById('Weekbar').innerHTML = `
        <div id='week_list'>
            <label>
                <span onclick='generate_weekbar("cal")'> &#10094; </span>
                Список недель
                <span onclick='generate_weekbar("cal")'> &#10095; </span>
            </label>
            <table>
                <tbody id='Weekbar_List'>
                </tbody>
            </table>
        </div>
        `
        let list = document.getElementById("Weekbar_List")
        let week_count = weeks_between(first_day, last_day)
        let day = new Date(first_day)
        for (let week_number = 1; week_number <= week_count; week_number++) {
            const dayDate = day.getDate();
            const dayMonth = monthNames[day.getMonth()];
            const nextDayDate = new Date(get_next_day(day, 6)).getDate();
            const nextDayMonth = monthNames[new Date(get_next_day(day, 6)).getMonth()];
            list.innerHTML += `
            <tr onclick='move_to_week("${week_number}")'>
                <td>${week_number}:</td>
                <td>${dayDate}</td>
                <td>${dayMonth}</td>
                <td>-</td>
                <td>${nextDayDate}</td>
                <td>${nextDayMonth}</td>
            </tr>
            `
            day.setDate(day.getDate() + 7)
        }
        try {list.children[getCurrentWeek(first_day)-1].setAttribute('style', 'font-weight: bold')}
        catch {}
    }

    else if (generate = 'cal') {
        document.getElementById('Weekbar').innerHTML = `
        <table id='week_cal'>
            <caption>
                <span onclick='generate_weekbar("list")'> &#10094; </span>
                Календарь
                <span onclick='generate_weekbar("list")'> &#10095; </span>
            </caption>
            <thead>
                <tr>
                    <td title='Порядковый номер недели расписания'><label>№</label></td>
                    <td title='понедельник' ><label>пн</label></td>
                    <td title='вторник'     ><label>вт</label></td>
                    <td title='среда'       ><label>ср</label></td>
                    <td title='четверг'     ><label>чт</label></td>
                    <td title='пятница'     ><label>пт</label></td>
                    <td title='суббота'     ><label>сб</label></td>
                    <td title='воскресенье' ><label>вс</label></td>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <td style='position: relative; width: 30px; height: 15px;'>
                        <div style='position: absolute; top: 0; left: 0px ; width: 15px; cursor: pointer;' onclick='try_offset_cal({"wheelDeltaY": 1})'>▲</div>
                        <div style='position: absolute; top: 0; left: 15px; width: 15px; cursor: pointer;' onclick='try_offset_cal({"wheelDeltaY":-1})'>▼</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <table id='week_cal-monthes'>
            <caption>1</caption>
            <thead><tr><td><label> </label></td></tr></thead>
            <tbody></tbody>
            <tfoot><tr><td> </td></tr></tfoot>
        </table>
        <div style='margin: 10px'>
            <div id='WC_filters'>
                <label for='cal_filter'>Фильтр: </label>
                <select id='WC_input' name='cal_filter' onchange='set_cal_filter(this)'>
                    <option value='none'>без фильтра</option>
                </select>
            </div>
            <div id='WC_extra_filters' class='hidden'>
                <div>
                    <span name='WC_adding' onclick='WC_add_filter(this)' new>×</span>
                    <div class='hidden'>
                        <select onchange='WC_renew_second_list(this)'></select>
                        <select style='width: fit-content' onchange='WC_set_new_extra_filters()'>
                            <option value='='>=</option>
                            <option value='!='>&#8800;</option>
                        </select>
                        <select onchange='WC_set_new_extra_filters()'><option value="none" selected>-</option></select>
                    </div>
                </div>
            </div>
        </div>
        `

        let filter_list = document.getElementById('WC_input')
        for (filter in cal_filters_functions) {
            let option = document.createElement('option')
            option.setAttribute('value', filter)
            option.innerText = cal_filters_functions[filter]['name']
            filter_list.appendChild(option)
        }

        let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset
        add_to_cal_week(crnt_week-2)
        add_to_cal_week(crnt_week-1)
        add_to_cal_week(crnt_week  )
        add_to_cal_week(crnt_week+1)
        add_to_cal_week(crnt_week+2)
    }
}

//========================================================================================== offset

function offset_up () {
    week_cal_offset--
    let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset
    clear_week_cal()
    add_to_cal_week(crnt_week-2)
    add_to_cal_week(crnt_week-1)
    add_to_cal_week(crnt_week  )
    add_to_cal_week(crnt_week+1)
    add_to_cal_week(crnt_week+2)
}

function offset_down () {
    week_cal_offset++
    let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset
    document.getElementById('week_cal').children[2].children[0].remove()
    document.getElementById('week_cal-monthes').children[2].children[0].remove()
    add_to_cal_week(crnt_week + 2)
}

function try_offset_cal (event) {
    if      (event.wheelDeltaY > 0 && week_cal_offset > wco_min_value) offset_up  () // ^^^
    else if (event.wheelDeltaY < 0 && week_cal_offset < wco_max_value) offset_down() // vvv
}

//========================================================================================== editing cal

function clear_week_cal () {
    let week_cal   = document.getElementById('week_cal').children[2]
    let week_cal_m = document.getElementById('week_cal-monthes').children[2]
    while (week_cal.childElementCount > 0) {
        week_cal.children[0].remove()
        week_cal_m.children[0].remove()
    }
}

function add_to_cal_week (week_number) {
    if (week_number < 1 || week_number > weeks_between(first_day, last_day)) return

    let need_insert_month = 0

    let table = document.getElementById('week_cal').children[2]
    table.setAttribute('onwheel', 'try_offset_cal(event)')
    let current_day = new Date(first_day)
    current_day.setDate(current_day.getDate() + (week_number - 1)*7 - 1)

    let tr = document.createElement('tr')
    tr.setAttribute('id', 'week_cal_' + week_number)


    let td = document.createElement('td')
    td.setAttribute('onclick', `move_to_week("${week_number}")`)
    if (week_number == weeks_between(first_day, new Date())) {
        td.setAttribute('active', '')
        tr.setAttribute('this_week', '')
    }
    td.innerText = week_number

    tr.appendChild(td)

    for (let i = 1; i <= 7; i++) {
        current_day.setDate(current_day.getDate() + 1)
        td = document.createElement('td')

        td.setAttribute('onclick', `move_to_week("${week_number}", "${i}")`)
        if (date_to_str(current_day) == date_to_str(new Date())) td.setAttribute('active', '')

        if (current_day.getDate()-1 < 7) {
            td.style.borderTop = '3px solid var(--color-error)'
            if (i == 1) tr.children[0].style.borderTop = '3px solid var(--color-error)'
            if (i == 7) need_insert_month = 1
            else need_insert_month = 2
        }
        if (current_day.getDate() == 1  && i != 1) {
            td.style.borderLeft = '3px solid var(--color-error)'
        }

        td.innerText = current_day.getDate()

        tr.appendChild(td)
    }

    table.appendChild(tr)

    tr = document.createElement('tr')
    let month = get_cal_month(week_number)
    switch (need_insert_month) {
        case 0: tr.innerHTML = '<td></td>'; break;
        case 1: tr.innerHTML = `<td month_top>${cal_monthes.at(month)}</td>`; try_insert_month_before(month); break;
        case 2: tr.innerHTML = '<td month_imitate></td>'; break;
    }
    document.getElementById('week_cal-monthes').children[2].appendChild(tr)
    
    set_cal_filter(document.getElementById('WC_input'))
}

//========================================================================================== utils

function get_cal_month (week_number) {
    let a = new Date(first_day)
    a.setDate(a.getDate() + (week_number - 1)*7 + 6)
    return a.getMonth()
}

function try_insert_month_before (next_month) {
    let week_cal_m = document.getElementById('week_cal-monthes').children[2]

    if (week_cal_m.childElementCount > 0) {
        week_cal_m.children[week_cal_m.childElementCount-1].innerHTML = `
        <tr><td month_bottom>${cal_monthes.at(next_month-1)}</td></tr>
        `
    }
}

let last_animated_tr = null
function move_to_week (week_number, day = -1) {
    document.location.hash = ''
    document.location.hash = '#Week_' + week_number
    if (1 <= day && day <= 7) {
        let tr = document.getElementById('Week_' + week_number).children[1].children[0].children[day]
        if (last_animated_tr != null) last_animated_tr.removeAttribute('class')
        last_animated_tr = tr
        tr.setAttribute('class', 'temporary_highlighted')
    }
}

//========================================================================================== filters

const cal_filters_functions = {
    'load': {
        'name': 'загруженность',
        'function': day => {
            let day_workload = 0
            for (let lesson = 1; lesson < day.childElementCount; lesson++) {
                if (day.children[lesson].childElementCount > 0 && 
                    check_lesson_with_extra_filters(day.children[lesson])) day_workload++
            }
            if (day_workload > 6) day_workload = 6
            return day_workload
        },
        'tips': ['0', '1', '2', '3', '4', '5', '6+'],
        'extra_tip': 'Количество пар: ',
        'extra_filters': true
    },

    'time': {
        'name': 'время начала',
        'function': day => {
            for (let lesson = 1; lesson < day.childElementCount-1; lesson++) {
                if (day.children[lesson].childElementCount > 0 && 
                    check_lesson_with_extra_filters(day.children[lesson])) return lesson
            }
            return 0
        },
        'tips': ['-', '8:30', '10:15', '12:30', '14:15', '16:00', '18:00'],
        'extra_tip': 'Первое занятие в ',
        'extra_filters': true
    },
    
    'time_last': {
        'name': 'время завершения',
        'function': day => {
            for (let lesson = day.childElementCount-1; lesson > 1; lesson--) {
                if (day.children[lesson].childElementCount > 0 && 
                    check_lesson_with_extra_filters(day.children[lesson])) return lesson
            }
            return 0
        },
        'tips': ['-', '10:00', '11:45', '14:00', '15:45', '17:30', '19:30'],
        'extra_tip': 'Последнее занятие заканчивается в ',
        'extra_filters': true
    },
    
    'variety': {
        'name': 'места проведения',
        'function': day => {
            let pre_rooms = get_rasp_element_from('day', day, 'room')
            let rooms = {}
            let variety = []
            let id = day.children[0].getAttribute('id') + '-'
            for (lesson in pre_rooms) {
                rooms[lesson] = []
                for (block in pre_rooms[lesson]) rooms[lesson].push(...pre_rooms[lesson][block])
            }

            for (let lesson = 1; lesson < day.childElementCount-1; lesson++) {
                if (rooms[id + lesson] && check_lesson_with_extra_filters(day.children[lesson])) {
                    for (room of rooms[id + lesson]) {
                        if (variety.indexOf(room) === -1) variety.push(room)
                    }
                }
            }
            if (variety.length > 6) return 6
            else return variety.length
        },
        'tips': ['0', '1', '2', '3', '4', '5', '6+'],
        'extra_tip': 'Разных мест проведения (корпусов и т.п.): ',
        'extra_filters': true
    },

    'events': {
        'name': 'события',
        'function': day => {
            let day_workload = 0
            for (let lesson = 1; lesson < day.childElementCount; lesson++) {
                if (day.children[lesson].childElementCount > 0 &&
                    day.children[lesson].lastChild.classList.contains('block_event')) day_workload++
            }
            if (day_workload > 6) day_workload = 6
            return day_workload
        },
        'tips': ['0', '1', '2', '3', '4', '5', '6+'],
        'extra_tip': 'Количество событий: ',
        'extra_filters': true
    },
}

function set_cal_filter (input) {
    decolourize_cal()
    if (input.value == 'none') {
        document.getElementById('WC_extra_filters').classList.add('hidden')
        return
    }
    else if (cal_filters_functions[input.value]) set_week_cal_filter(cal_filters_functions[input.value])
}

function decolourize_cal () {
    let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset

    for (let i = crnt_week - 2; i <= crnt_week + 2; i++) try {
        let cal_id  = document.getElementById('week_cal_' + i)

        for (let day = 1; day <= 7; day++) {
            cal_id.children[day].setAttribute('class', '')
            cal_id.children[day].setAttribute('title', '')
        }
    } catch {}

    document.getElementById('week_cal').children[3].innerHTML = `
    <tr>
        <td style='position: relative; width: 30px; height: 15px;'>
            <div style='position: absolute; top: 0; left: 0px ; width: 15px; cursor: pointer;' onclick='try_offset_cal({"wheelDeltaY": 1})'>▲</div>
            <div style='position: absolute; top: 0; left: 15px; width: 15px; cursor: pointer;' onclick='try_offset_cal({"wheelDeltaY":-1})'>▼</div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `
}

function set_week_cal_filter (filter, week_number = null) {
    let crnt_week = 0
    let from = -2
    let to = 2

    if (week_number == null) crnt_week = weeks_between(first_day, new Date()) + week_cal_offset
    else {
        crnt_week = week_number
        from = 0
        to = 0
    }

    for (let i = crnt_week + from; i <= crnt_week + to; i++) try {
        let cal_id  = document.getElementById('week_cal_' + i)
        let week_id = document.getElementById('Week_' + i).children[1].children[0] // tbody

        for (let day = 1; day <= 7; day++) {
            let level = filter['function'](week_id.children[day])
            cal_id.children[day].classList.add('cal_filter_' + level)
            cal_id.children[day].setAttribute('title', filter['extra_tip'] + filter['tips'][level])
        }   
    } catch {}
    
    document.getElementById('week_cal').children[3].innerHTML = `
    <tr>
        <td style='position: relative; width: 30px; height: 15px;'>
            <div style='position: absolute; top: 0; left: 0px ; width: 15px; cursor: pointer;' onclick='try_offset_cal({"wheelDeltaY": 1})'>▲</div>
            <div style='position: absolute; top: 0; left: 15px; width: 15px; cursor: pointer;' onclick='try_offset_cal({"wheelDeltaY":-1})'>▼</div>
        </td>
        <td class='cal_filter_0'>${filter['tips'][0]}</td>
        <td class='cal_filter_1'>${filter['tips'][1]}</td>
        <td class='cal_filter_2'>${filter['tips'][2]}</td>
        <td class='cal_filter_3'>${filter['tips'][3]}</td>
        <td class='cal_filter_4'>${filter['tips'][4]}</td>
        <td class='cal_filter_5'>${filter['tips'][5]}</td>
        <td class='cal_filter_6'>${filter['tips'][6]}</td>
    </tr>
    `

    if (filter['extra_filters']) document.getElementById('WC_extra_filters').classList.remove('hidden')
}

//========================================================================================== extra filters

function WC_add_filter (input, num) {
    let WC_EF = document.getElementById('WC_extra_filters')

    if (input.hasAttribute('new')) {
        input.removeAttribute('new')
        input.setAttribute('delete', '')

        WC_EF.children[WC_EF.childElementCount-1].children[1].classList.remove('hidden')

        let class_selector = WC_EF.children[WC_EF.childElementCount-1].children[1].children[0]
        class_selector.innerHTML = '<option value="none">-</option>'
        for (class_name in used_class_names) {
            if (Object.keys(used_class_names[class_name]).length == 0) continue
            class_selector.innerHTML += `<option value="${class_name}">${class_name}</option>`
        }

        let div = document.createElement('div')
        div.innerHTML += `
            <span name='WC_adding' onclick='WC_add_filter(this)' new>×</span>
            <div class='hidden'>
                <select onchange='WC_renew_second_list(this)'></select>
                <select style='width: fit-content' onchange='WC_set_new_extra_filters()'>
                    <option value='='>=</option>
                    <option value='!='>&#8800;</option>
                </select>
                <select onchange='WC_set_new_extra_filters()'><option value="none" selected>-</option></select>
            </div>
        `
        WC_EF.appendChild(div)
    }
    else {
        for (let i = 0; i < WC_EF.childElementCount-1; i++) {
            if (WC_EF.children[i].children[0] == input) {
                WC_EF.children[i].remove()
                WC_set_new_extra_filters()
                return
            }
        }
        input.removeAttribute('delete')
        input.setAttribute('new', '')
        document.getElementById('WC_EF_' + num).children[1].classList.add('hidden')
        WC_set_new_extra_filters()
    }
}

function WC_renew_second_list (input) {
    let WC_EF = document.getElementById('WC_extra_filters')
    
    for (let i = 0; i < WC_EF.childElementCount-1; i++) {
        if (WC_EF.children[i].children[1].children[0] === input) {
            let subclass_selector = WC_EF.children[i].children[1].children[2]
            subclass_selector.innerHTML = '<option value="none" selected>-</option>'
            if (input.value != 'none') for (subclass_name in used_class_names[input.value]) {
                subclass_selector.innerHTML += `<option value="${subclass_name}">${subclass_name}</option>`
            }
            return
        }
    }
}

let WC_extra_filters = []
function WC_set_new_extra_filters () {
    WC_extra_filters = []
    let WC_EF = document.getElementById('WC_extra_filters')

    for (let i = 0; i < WC_EF.childElementCount-1; i++) {
        let block = WC_EF.children[i].children[1]
        if (block.children[0].value != 'none' && block.children[2].value != 'none') {
            WC_extra_filters.push([block.children[0].value, block.children[2].value, block.children[1].value])
        }
    }

    set_cal_filter(document.getElementById('WC_input'))
}

function check_day_with_extra_filters (day) {
    for (filter of WC_extra_filters) {
        if (!check_day_with_extra_filter (day, filter)) return false
    }
    return true
}

function check_day_with_extra_filter (day, filter) {
    let class_name = used_class_names[filter[0]][filter[1]]

    for (let i = 1; i < day.childElementCount; i++) {
        let lesson = day.children[i] // blocks
        if (!check_lesson_with_extra_filter(lesson, filter)) return false
    }

    if (filter[2] == '=') return false
    else return true
}

function check_lesson_with_extra_filters (lesson) {
    for (filter of WC_extra_filters) {
        if (!check_lesson_with_extra_filter (lesson, filter)) return false
    }
    return true
}

function check_lesson_with_extra_filter (lesson, filter) {
    let class_name = used_class_names[filter[0]][filter[1]]

    for (let i2 = 0; i2 < lesson.childElementCount; i2++) {
        let block = lesson.children[i2] // block_0 and other

        for (let i3 = 0; i3 < block.childElementCount; i3++) {
            let div = block.children[i3]
            if (div.getAttribute('class').split(' ')[1] == class_name) {
                if (filter[2] == '=') return true
                else return false
            }
        }
    }
 
    if (filter[2] == '=') return false
    else return true
}

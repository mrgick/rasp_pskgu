let week_cal_offset = 0

function prepare_for_week_cal () {
    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.setAttribute('id', 'style_cal_filters')
    document.getElementsByTagName('head')[0].appendChild(style)

    fill_cal_filters()
}

const available_weekbar_types = ['cal', 'list']

function generate_weekbar (generate = 'cal') {
    if (available_weekbar_types.indexOf(generate) === -1) generate = 'cal'

    weekbar_type = generate
    save_mode_to_cookie()

    let weekbar = document.getElementById('Weekbar')
    if (weekbar == null) return

    let now = new Rasptime()
    let lesson_now = now.get_lesson()

    weekbar.innerHTML = `
    <div id="weekbar_header">
        <div style="float: left" onclick="main_rasp.go_to('${now.date}', false)">
            ${now.get_rasp_date()}
        </div>
        <div id="WBH_extra" style="float: right">
            <div id="WBH_extra-lessons"></div>
            <div id="WBH_extra-time_to" class="hidden"></div>
        </div>
    </div>
    `

    //========================== header

    let header = weekbar.querySelector('#weekbar_header > #WBH_extra')
    let workload = main_rasp.get_day_workload()
    for (let lesson = 0; lesson < workload.length; lesson++) {
        let div = document.createElement('div')
        if      (workload[lesson] === 1) div.classList.add('WBH_have_lesson')
        if      (lesson < lesson_now   ) div.classList.add('WBH_passed_lesson')
        else if (lesson == lesson_now  ) div.classList.add('WBH_ongoing_lesson')
        div.innerText = (lesson + 1).toString()
        header.children[0].appendChild(div)
    }

    let div_1 = header.querySelector('#WBH_extra-lessons')
    let div_2 = header.querySelector('#WBH_extra-time_to')

    div_1.onclick = function () {
        div_1.classList.add('hidden')
        div_2.classList.remove('hidden')

        if (main_rasp == null || main_rasp.first_day == null) {
            header.children[1].style.background = 'var(--color-background)'
            header.children[1].innerText = 'Занятий нет'
            return
        }

        let now = new Date()
        let crnt_datetime  = Rasptime.datetime_from_obj(now)

        let next_lesson = main_rasp.get_next_lesson_from_now()
        let prev_lesson = main_rasp.get_prev_lesson_from_now()

        if (next_lesson == null) {
            header.children[1].style.background = 'var(--color-background)'
            header.children[1].innerText = 'Занятий больше нет'
            return
        }

        let nl_datetime = Rasptime.datetime_from_lid(main_rasp.lid_from_lesson(next_lesson))
        let pl_datetime = prev_lesson == null? 
            main_rasp.first_day.date + ' ' + '00:00'
            : 
            Rasptime.datetime_from_lid(main_rasp.lid_from_lesson(prev_lesson))
        
        let something = 'Занятие'

        if (nl_datetime == pl_datetime) {
            nl_datetime = Rasptime.datetime_from_lid(main_rasp.lid_from_lesson(next_lesson), true)
            something = 'Перерыв'
        }

        let minutes_all  = Rasptime.minutes_between_datetimes(pl_datetime  , nl_datetime)
        let minutes_left = Rasptime.minutes_between_datetimes(crnt_datetime, nl_datetime)

        let p = (1 - minutes_left / minutes_all) * 100
        header.children[1].style.background = `linear-gradient(to right, var(--color-time_tracking) ${p}%, var(--color-light) ${p}%)`
        header.children[1].innerText = `${something} через ${Math.floor(minutes_left/60)} ч. ${minutes_left%60} мин.`
    }

    div_2.onclick = function () {
        div_1.classList.remove('hidden')
        div_2.classList.add('hidden')
    }

    //========================== list

    if (generate == 'list') {
        let week_list = document.createElement('div')
        week_list.setAttribute('id', 'week_list')
        week_list.innerHTML += `
        <label class='weekbar_switcher'>
            <span onclick='generate_weekbar("cal")'> &#10094; </span>
            Список недель
            <span onclick='generate_weekbar("cal")'> &#10095; </span>
        </label>
        <table>
            <tbody id='Weekbar_List'>
            </tbody>
        </table>
        `

        let list = week_list.querySelector("#Weekbar_List")
        let was = list.style.display

        list.style.display = 'none'
        main_rasp.fill_week_list(list)
        list.style.display = was

        weekbar.appendChild(week_list)
    }

    //========================== calendar

    else if (generate == 'cal') {
        let week_cal = document.createElement('div')
        week_cal.setAttribute('id', 'week_list')
        week_cal.innerHTML += `
        <label class='weekbar_switcher'>
            <span onclick='generate_weekbar("list")'> &#10094; </span>
            Календарь
            <span onclick='generate_weekbar("list")'> &#10095; </span>
        </label>

        <table id='week_cal'>

            <caption style='position: relative'>
                <div id='week_cal-arrows'>
                    <div onclick='try_offset_cal(+1)'>↑</div>
                    <div onclick='try_offset_cal(-1)'>↓</div>
                </div>

                <table id='week_cal-monthes'>
                    <thead><tr><td><label> </label></td></tr></thead>
                    <tbody></tbody>
                </table>
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
                    <td>
                        <div style='left: 0  ' onclick='try_offset_cal(+1)'>▲</div>
                        <div style='left: 50%' onclick='try_offset_cal(-1)'>▼</div>
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

        <div id="cal_filter_block">
            <div id='WC_filters'>
                <label for='cal_filter'>Фильтр: </label>
                <select id='WC_input' name='cal_filter' onchange='set_cal_filter(this.value)'>
                    <option value='none'>без фильтра</option>
                </select>
            </div>
            <div id='WC_extra_filters' class='hidden'>
                <div>
                    <span name='WC_adding' onclick='WC_add_filter(this)' new>×</span>
                    <div class='hidden'>
                        <select onchange='WC_renew_second_list(this)'></select>
                        <select style='width: 50px' onchange='WC_set_new_extra_filters()'>
                            <option value='='>=</option>
                            <option value='!='>&#8800;</option>
                        </select>
                        <select onchange='WC_set_new_extra_filters()'><option value="none" selected>-</option></select>
                    </div>
                </div>
            </div>
        </div>
        `

        week_cal.querySelector('#week_cal > tbody').addEventListener('wheel', (event) => {
            try_offset_cal(event.wheelDeltaY)
            event.stopPropagation()
        }, {'passive': true})

        let filter_list = week_cal.querySelector('select#WC_input')
        for (filter in cal_filters_functions) {
            let option = document.createElement('option')
            option.setAttribute('value', filter)
            option.innerText = cal_filters_functions[filter]['name']
            filter_list.appendChild(option)
        }

        weekbar.appendChild(week_cal)

        let crnt_week = main_rasp.week_now + week_cal_offset
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
    let crnt_week = main_rasp.week_now + week_cal_offset
    if (crnt_week < 0) { week_cal_offset++; return }
    clear_week_cal()
    add_to_cal_week(crnt_week-2)
    add_to_cal_week(crnt_week-1)
    add_to_cal_week(crnt_week  )
    add_to_cal_week(crnt_week+1)
    add_to_cal_week(crnt_week+2)
}

function offset_down () {
    week_cal_offset++
    let crnt_week = main_rasp.week_now + week_cal_offset
    if (crnt_week > main_rasp.weeks_total + 1) { week_cal_offset--; return }
    document.getElementById('week_cal').querySelector(':scope > tbody').children[0].remove()
    document.getElementById('week_cal-monthes').querySelector('tbody').children[0].remove()
    add_to_cal_week(crnt_week + 2)
}

function try_offset_cal (direction) {
    if      (direction > 0) offset_up  () // ^^^
    else if (direction < 0) offset_down() // vvv
}

//========================================================================================== editing cal

function clear_week_cal () {
    let week_cal   = document.getElementById('week_cal').querySelector(':scope > tbody')
    let week_cal_m = document.getElementById('week_cal-monthes').querySelector('tbody')
    while (week_cal.childElementCount > 0) {
        week_cal.children[0].remove()
        week_cal_m.children[0].remove()
    }
}

function add_to_cal_week (week_number) {
    let table = document.getElementById('week_cal').querySelector(':scope > tbody')
    
    let need_insert_month = 0

    let out_of_rasp = (week_number < 1 || week_number > main_rasp.weeks_total)
    let current_day = main_rasp.get_monday_at_week(week_number)
    let month = (current_day.month + 1)%12
    let now = Rasptime.date_now()

    let tr = document.createElement('tr')
    tr.setAttribute('id', 'week_cal_' + week_number.toString())

    let td = document.createElement('td')
    td.innerText = week_number.toString()
    if (week_number == main_rasp.week_now) {
        td.setAttribute('active', '')
        tr.setAttribute('this_week', '')
    }
    if (out_of_rasp) tr.setAttribute('style', 'opacity: .3')
    else td.setAttribute('onclick', `main_rasp.go_to("Week_${week_number}")`)

    tr.appendChild(td)

    for (let i = 1; i <= 7; i++) {
        td = document.createElement('td')

        if (!out_of_rasp) td.setAttribute('onclick', `main_rasp.go_to("${current_day.date}")`)
        if (current_day.date == now) td.setAttribute('active', '')

        if (current_day.day-1 < 7) {
            td.style.borderTop = cal_month_border
            if (i == 1) tr.children[0].style.borderTop = cal_month_border
            if (i == 7) need_insert_month = 1
            else need_insert_month = 2
        }
        if (current_day.day == 1  && i != 1) {
            td.style.borderLeft = cal_month_border
        }

        td.innerText = current_day.day.toString()

        tr.appendChild(td)
        current_day.next_day()
    }
    table.appendChild(tr)

    tr = document.createElement('tr')
    switch (need_insert_month) {
        case 0: tr.innerHTML = '<td></td>'; break;
        case 1: tr.innerHTML = `<td month_top>${cal_monthes.at(month)}</td>`; try_insert_month_before(month); break;
        case 2: tr.innerHTML = '<td month_imitate></td>'; break;
    }
    document.getElementById('week_cal-monthes').querySelector('tbody').appendChild(tr)
    
    set_cal_filter(document.getElementById('WC_input').value)
}

//========================================================================================== utils

function try_insert_month_before (next_month) {
    let week_cal_m = document.getElementById('week_cal-monthes').querySelector('tbody')

    if (week_cal_m.childElementCount > 0) {
        week_cal_m.children[week_cal_m.childElementCount-1].innerHTML = `
        <tr><td month_bottom>${cal_monthes.at(next_month-1)}</td></tr>
        `
    }
}

//========================================================================================== filters

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

function set_cal_filter (value = 'none') {
    if (value == 'none') {
        document.getElementById('WC_extra_filters').classList.add('hidden')
        remove_cal_filter()
        return
    }
    else if (cal_filters_functions[value]) {
        let filter = cal_filters_functions[value]

        let table = document.getElementById('week_cal')
        let tbody = table.querySelector(':scope > tbody')

        for (let i = 0; i < tbody.childElementCount; i++) {
            let cal_tr  = tbody.children[i]
            let cal_num = Number(cal_tr.id.split('_').at(-1)) // week num

            let date = main_rasp.get_monday_at_week(cal_num)
            for (let day = 1; day <= 7; day++) {
                let level = filter['function'](main_rasp.get_lessons_on_day(date))
                cal_tr.children[day].setAttribute('class', 'cal_filter_' + level)
                cal_tr.children[day].setAttribute('title', filter['extra_tip'] + filter['tips'][level])
                date.next_day()
            }   
        }
        
        table.querySelector(':scope > tfoot').innerHTML = `
        <tr>
            <td>
                <div style='left: 0  ' onclick='try_offset_cal(+1)'>▲</div>
                <div style='left: 50%' onclick='try_offset_cal(-1)'>▼</div>
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
}

function remove_cal_filter () {
    let table = document.getElementById('week_cal')
    let tbody = table.querySelector(':scope > tbody')

    for (let i = 0; i <= tbody.childElementCount; i++) try {
        let cal_elem  = tbody.children[i]

        for (let day = 1; day <= 7; day++) {
            cal_elem.children[day].setAttribute('class', '')
            cal_elem.children[day].setAttribute('title', '')
        }
    } catch {}

    table.querySelector(':scope > tfoot').innerHTML = `
    <tr>
        <td>
            <div style='left: 0  ' onclick='try_offset_cal(+1)'>▲</div>
            <div style='left: 50%' onclick='try_offset_cal(-1)'>▼</div>
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
                <select style='width: -moz-fit-content; width: fit-content' onchange='WC_set_new_extra_filters()'>
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

    set_cal_filter(document.getElementById('WC_input').value)
}


function check_lesson_with_extra_filters (lesson) {
    for (let filter of WC_extra_filters) {
        if (!check_lesson_with_extra_filter (lesson, filter)) return false
    }
    return true
}

function check_lesson_with_extra_filter (block, filter) {
    let class_name = used_class_names[filter[0]][filter[1]]

    for (let i = 0; i < lessons_count; i++) {
        for (let i2 = 0; i2 < block.childElementCount; i2++) {
            let div = block.children[i2]
            if (div.getAttribute('class').split(' ')[1] == class_name) {
                if (filter[2] == '=') return true
                else return false
            }
        }
    }
 
    if (filter[2] == '=') return false
    else return true
}

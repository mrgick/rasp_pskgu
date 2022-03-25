let week_cal_offset = 0
let wco_min_value = -2
let wco_max_value = 2

function prepare_for_week_cal () {
    wco_min_value = 3 - weeks_between(first_day, new Date())
    wco_max_value = weeks_between(new Date(), last_day) - 3

    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.setAttribute('id', 'style_cal_filters')
    document.getElementsByTagName('head')[0].appendChild(style)

    fill_cal_filters()
    generate_weekbar()
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

function generate_weekbar () {
    document.getElementById('Weekbar').innerHTML = `
    <table id='week_cal'>
        <caption>Календарь</caption>
        <thead>
            <tr>
                <td><label>№</label></td>
                <td><label>пн</label></td>
                <td><label>вт</label></td>
                <td><label>ср</label></td>
                <td><label>чт</label></td>
                <td><label>пт</label></td>
                <td><label>сб</label></td>
                <td><label>вс</label></td>
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
    <label for='cal_filter'>Фильтр: </label>
    <select id='WC_input' name='cal_filter' onchange='set_cal_filter(this)'>
        <option value='none'>без фильтра</option>
        <option value='load'>загруженность</option>
        <option value='time'>время начала</option>
    </select>
    `

    let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset
    add_to_cal_week(crnt_week-2)
    add_to_cal_week(crnt_week-1)
    add_to_cal_week(crnt_week  )
    add_to_cal_week(crnt_week+1)
    add_to_cal_week(crnt_week+2)
}

function offset_up () {
    week_cal_offset--
    let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset
    document.getElementById('week_cal').children[2].children[0].remove()
    document.getElementById('week_cal').children[2].children[0].remove()
    document.getElementById('week_cal').children[2].children[0].remove()
    document.getElementById('week_cal').children[2].children[0].remove()
    document.getElementById('week_cal').children[2].children[0].remove()
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
    add_to_cal_week(crnt_week + 2)
}

function try_offset_cal (event) {
    if      (event.wheelDeltaY > 0 && week_cal_offset > wco_min_value) offset_up  () // ^^^
    else if (event.wheelDeltaY < 0 && week_cal_offset < wco_max_value) offset_down() // vvv
}

function add_to_cal_week (week_number) {
    if (week_number < 1 || week_number > weeks_between(first_day, last_day)) return

    let table = document.getElementById('week_cal').children[2]
    table.setAttribute('onwheel', 'try_offset_cal(event)')
    let current_day = new Date(first_day)
    current_day.setDate(current_day.getDate() + (week_number - 1)*7 - 1)

    let tr = document.createElement('tr')
    tr.setAttribute('id', 'week_cal_' + week_number)


    let td = document.createElement('td')
    let this_week = false
    td.setAttribute('onclick', `move_to_week("${week_number}")`)
    if (week_number == weeks_between(first_day, new Date())) {
        td.setAttribute('active', '')
        this_week = true
    }
    td.innerText = week_number

    tr.appendChild(td)

    for (let i = 1; i <= 7; i++) {
        current_day.setDate(current_day.getDate() + 1)
        td = document.createElement('td')

        td.setAttribute('onclick', `move_to_week("${week_number}", "${i}")`)
        if (this_week) td.setAttribute('this_week', '')
        if (date_to_str(current_day) == date_to_str(new Date())) td.setAttribute('active', '')

        if (current_day.getDate()-1 < 7 && table.childElementCount > 0) {
            td.style.borderTop = '3px solid var(--color-error)'
            if (i == 1) tr.children[0].style.borderTop = '3px solid var(--color-error)'
        }
        if (current_day.getDate() == 1  && i != 1) {
            td.style.borderLeft = '3px solid var(--color-error)'
        }

        td.innerText = current_day.getDate()

        tr.appendChild(td)
    }

    table.appendChild(tr)
    
    set_cal_filter(document.getElementById('WC_input'))
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

const cal_filters_functions = {
    'load': {
        'name': 'загруженность',
        'function': day => {
            let day_workload = 0
            for (let lesson = 1; lesson < day.childElementCount; lesson++) {
                if (day.children[lesson].childElementCount > 0) day_workload++
            }
            if (day_workload > 6) day_workload = 6
            return day_workload
        },
        'tips': ['0', '1', '2', '3', '4', '5', '6+']
    },
    'time': {
        'name': 'время начала',
        'function': day => {
            let day_workload = 0
            for (let lesson = 1; lesson < day.childElementCount-1; lesson++) {
                if (day.children[lesson].childElementCount > 0) return lesson
            }
            return 0
        },
        'tips': ['-', '8:30', '10:15', '12:30', '14:15', '16:00', '18:00']
    }
}

function set_cal_filter (input) {
    decolourize_cal()
    if (input.value == 'none') return
    else if (cal_filters_functions[input.value]) set_week_cal_filter(cal_filters_functions[input.value])
}

function decolourize_cal () {
    let crnt_week = weeks_between(first_day, new Date()) + week_cal_offset

    for (let i = crnt_week - 2; i <= crnt_week + 2; i++) try {
        let cal_id  = document.getElementById('week_cal_' + i)

        for (let day = 1; day <= 7; day++) {
            cal_id.children[day].setAttribute('class', '')
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
            cal_id.children[day].classList.add('cal_filter_' + filter['function'](week_id.children[day]))
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
}

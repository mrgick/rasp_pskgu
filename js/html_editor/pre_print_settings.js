function switch_print_panel (button) {
    let content = document.getElementById('PP_content')
    if (content) {
        if (content.classList.contains('hidden')) {
            button.innerHTML = '&#9660;'
            content.classList.remove('hidden')
        }
        else {
            button.innerHTML = '&#9650;'
            content.classList.add('hidden')
        }
    }
}

function set_table_padding (side, input) {
    if (input.value < 0 ) input.value = 0
    if (input.value > 20) input.value = 20
    document.documentElement.style.setProperty(`--table-${side}_padding`, input.value+"mm")
    document.getElementById(side+'_padding_setter-range').value = input.value
    document.getElementById(side+'_padding_setter-input').value = input.value
}

function switch_theme_using (input) {
    if (input.checked) set_clr_theme('light', true, false)
    else {
        MODE = readCookie('mode')
        if (MODE) MODE = MODE.split('|')[0]
        else MODE = 'light'
        set_clr_theme(MODE, true, false)
    }
}

function switch_filters_using (input) {
    let styles = document.getElementsByTagName('style')

    if (input.checked) for (style of styles) {
        if (ignored_styles.indexOf(style.getAttribute('id')) !== -1) continue
        style.removeAttribute('media')
    }
    else for (style of styles) {
        if (ignored_styles.indexOf(style.getAttribute('id')) !== -1) continue
        style.setAttribute('media', '1')
    }
}

function switch_group_name_display (input) {
    let group_names = document.getElementsByClassName('rasp-group')

    if (input.checked) for (group of group_names) group.classList.remove('rasp-group--hidden')
    else for (group of group_names) group.classList.add('rasp-group--hidden')
}

function set_page_width (input) {
    input.value = input.value.replaceAll('-', '')
    document.documentElement.style.setProperty(`--table-page_width` , input.value+"mm")
}
function set_page_height (input) {
    input.value = input.value.replaceAll('-', '')
    document.documentElement.style.setProperty(`--table-page_height`, input.value+"mm")
}

function set_special_page_size (input) {
    let x = input.value.split('x')[0]
    let y = input.value.split('x')[1]
    document.getElementById('width_of_page' ).value = x
    document.getElementById('height_of_page').value = y
    document.documentElement.style.setProperty(`--table-page_width`, x+"mm")
    document.documentElement.style.setProperty(`--table-page_height`, y+"mm")
}

function set_inline (input) {
    if (input.value < 1) input.value = 1
    document.documentElement.style.setProperty(`--table-inline`, input.value)
}

function set_font_size (input) {
    if (input.value < 1) input.value = 1
    document.documentElement.style.setProperty(`--table-font_size`, input.value+"pt")
}

function switch_day_displaying (input) {
    input.toggleAttribute('active')
    let timetables = document.getElementsByClassName('rasp-table')

    let day = 1 + Object.values(document.getElementById('all_days_displaying').children).indexOf(input)

    if (input.hasAttribute('active')) for (timetable of timetables) {
        timetable.children[0].children[day].classList.remove('hidden')
    }
    else for (timetable of timetables) {
        timetable.children[0].children[day].classList.add('hidden')
    }
}

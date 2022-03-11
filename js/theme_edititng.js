rec_themes = {
    'light': {
        'text': 'светлый',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 20 20' height='36px' viewBox='0 0 20 20' width='36px' fill='%23000000'%3E%3Crect fill='none' height='20' width='20'/%3E%3Cpath d='M10,7.5c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5S7.5,11.38,7.5,10S8.62,7.5,10,7.5z M10,6c-2.21,0-4,1.79-4,4s1.79,4,4,4 s4-1.79,4-4S12.21,6,10,6L10,6z M3.75,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2C1.34,9.25,1,9.59,1,10 s0.34,0.75,0.75,0.75H3.75z M18.25,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2c-0.41,0-0.75,0.34-0.75,0.75 s0.34,0.75,0.75,0.75H18.25z M9.25,3.75C9.25,4.16,9.59,4.5,10,4.5c0.41,0,0.75-0.34,0.75-0.75v-2C10.75,1.34,10.41,1,10,1 S9.25,1.34,9.25,1.75V3.75z M13.89,5.05c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06c0.29-0.29,0.29-0.77,0-1.06 c-0.29-0.29-0.77-0.29-1.06,0L13.89,5.05z M3.99,14.95c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06 c0.29-0.29,0.29-0.77,0-1.06c-0.29-0.29-0.77-0.29-1.06,0L3.99,14.95z M5.05,6.11c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 L5.05,3.99c-0.29-0.29-0.77-0.29-1.06,0s-0.29,0.77,0,1.06L5.05,6.11z M14.95,16.01c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 l-1.06-1.06c-0.29-0.29-0.77-0.29-1.06,0c-0.29,0.29-0.29,0.77,0,1.06L14.95,16.01z M9.25,18.25C9.25,18.66,9.59,19,10,19 c0.41,0,0.75-0.34,0.75-0.75v-2c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75V18.25z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-primary'      : '#000000',
            '--color-secondary'    : '#666666',
            '--color-additionaly'  : '#CCCCCC',
            '--color-light'        : '#DDDDDD',
            '--color-link'         : '#000066',
            '--color-hover'        : '#0000CC',
            '--color-unchoiced'    : '#EEEEFF',
            '--color-background'   : '#FFFFFF',
            '--color-error'        : '#CC0000',
            '--color-time_tracking': '#AAEEDD'
        }
    },
    'darkest': {
        'text': 'полностью чёрный',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M15.5,22c1.05,0,2.05-0.16,3-0.46c-4.06-1.27-7-5.06-7-9.54s2.94-8.27,7-9.54C17.55,2.16,16.55,2,15.5,2 c-5.52,0-10,4.48-10,10S9.98,22,15.5,22L15.5,22z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
        'vars': {
            '--color-primary'      : '#CCCCCC',
            '--color-secondary'    : '#999999',
            '--color-additionaly'  : '#666666',
            '--color-light'        : '#333333',
            '--color-link'         : '#00CC00',
            '--color-hover'        : '#00FF00',
            '--color-unchoiced'    : '#333F35',
            '--color-background'   : '#000000',
            '--color-error'        : '#CC6666',
            '--color-time_tracking': '#697fb6'
        }
    },
    'dark': {
        'text': 'тёмный',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 20 20' height='36px' viewBox='0 0 20 20' width='36px' fill='%23000000'%3E%3Crect fill='none' height='20' width='20'/%3E%3Cpath d='M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-primary'      : '#DDDDDD',
            '--color-secondary'    : '#AAAAAA',
            '--color-additionaly'  : '#777777',
            '--color-light'        : '#444444',
            '--color-link'         : '#00CC00',
            '--color-hover'        : '#00FF00',
            '--color-unchoiced'    : '#333F35',
            '--color-background'   : '#1F2020',
            '--color-error'        : '#CC6666',
            '--color-time_tracking': '#697fb6'
        }
    },
    'custom': {
        'text': 'пользовательский',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-primary'      : '#000000',
            '--color-secondary'    : '#666666',
            '--color-additionaly'  : '#CCCCCC',
            '--color-light'        : '#DDDDDD',
            '--color-link'         : '#000066',
            '--color-hover'        : '#0000CC',
            '--color-unchoiced'    : '#EEEEFF',
            '--color-background'   : '#FFFFFF',
            '--color-error'        : '#CC0000',
            '--color-time_tracking': '#AAEEDD'
        }
    }
}

let property_text = {
    '--color-primary'      : 'Основной цвет',
    '--color-secondary'    : 'Второстепенный цвет',
    '--color-additionaly'  : 'Дополнительный цвет',
    '--color-light'        : 'Тусклый цвет',
    '--color-link'         : 'Цвет ссылок',
    '--color-hover'        : 'Цвет при наведении',
    '--color-unchoiced'    : 'Цвет невыбранных блоков',
    '--color-background'   : 'Цвет фона',
    '--color-error'        : 'Цвет выделения',
    '--color-time_tracking': 'Цвет отслеживания времени'
}

let using_svg = `
.editbar-switcher svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 20 20' height='36px' viewBox='0 0 20 20' width='36px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='20' width='20'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M10,2c-4.41,0-8,3.59-8,8s3.59,8,8,8c1.1,0,2-0.9,2-2c0-0.49-0.18-0.96-0.51-1.34c-0.24-0.3-0.02-0.66,0.3-0.66h1.42 c2.65,0,4.8-2.15,4.8-4.8C18,5.23,14.41,2,10,2z M13.2,12.5h-1.42c-1.05,0-1.9,0.85-1.9,1.9c0,0.47,0.19,0.92,0.47,1.25 c0.34,0.39,0.02,0.85-0.36,0.85c-3.58,0-6.5-2.92-6.5-6.5S6.42,3.5,10,3.5s6.5,2.56,6.5,5.7C16.5,11.02,15.02,12.5,13.2,12.5z'/%3E%3Ccircle cx='14.5' cy='9.5' r='1.25'/%3E%3Ccircle cx='12' cy='6.5' r='1.25'/%3E%3Ccircle cx='5.5' cy='9.5' r='1.25'/%3E%3Ccircle cx='8' cy='6.5' r='1.25'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.timetrack-switcher svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'/%3E%3C/svg%3E");
}
.weekbar-switcher svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z'/%3E%3C/svg%3E");
}
.issue_form-switcher svg {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-4 4v3c0 .22-.03.47-.07.7l-.1.65-.37.65c-.72 1.24-2.04 2-3.46 2s-2.74-.77-3.46-2l-.37-.64-.1-.65C8.03 15.48 8 15.23 8 15v-4c0-.23.03-.48.07-.7l.1-.65.37-.65c.3-.52.72-.97 1.21-1.31l.57-.39.74-.18c.31-.08.63-.12.94-.12.32 0 .63.04.95.12l.68.16.61.42c.5.34.91.78 1.21 1.31l.38.65.1.65c.04.22.07.47.07.69v1zm-6 2h4v2h-4zm0-4h4v2h-4z'/%3E%3C/svg%3E");
}
.editbar-close, .filterbar-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E");
}
`

let MODE = ''
let settings = readCookie("mode")
if (settings) MODE = settings.split('|')[0];
else MODE = 'light'
if (!rec_themes[MODE]) MODE = 'light'

let custom_theme = readCookie('custom_theme')
if (custom_theme) {
    settings = custom_theme.split('|')
    for (set of settings) rec_themes['custom']['vars'][set.split(':')[0]] = set.split(':')[1]
}

let style = document.createElement('style')
style.setAttribute('type', 'text/css')
style.setAttribute('id', 'style_svgs')
document.getElementsByTagName('head')[0].appendChild(style)

delete custom_theme
delete settings
delete style


function adapt_svg_clr (svg_txt, theme = MODE) {
    return svg_txt.replaceAll('%23000000', rec_themes[theme]['vars']['--color-primary'].replace('#', '%23'))
}

function update_svgs (theme = MODE) {
    let style = document.getElementById('style_svgs')
    style.innerHTML = ''
    for (i_theme in rec_themes) {
        style.innerHTML += `
        #theme_div-${i_theme} svg {${adapt_svg_clr(rec_themes[i_theme]['svg'])}}
        `
    }

    style.innerHTML += `
    .mode-switcher svg {${adapt_svg_clr(rec_themes[theme]['svg'])}}
    `
    style.innerHTML += adapt_svg_clr(using_svg)
}


function insert_themes () {
    let theme_list = document.getElementById('theme_list')
    theme_list.innerHTML = '<div name="123"></div>'
    theme_list = theme_list.children[0]

    theme_list.innerHTML += `
            <div id='theme_div-' class="mode-switcher">
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
            </div>
        `

    for (theme in rec_themes) {
        theme_list.innerHTML += `
            <div id='theme_div-${theme}' onclick='set_clr_theme("${theme}")'>
                <label>${rec_themes[theme]['text']}</label>
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
            </div>
        `
    }
}


function set_clr_theme (theme, only_uploading = false) {
    MODE = theme
    createCookie("mode", MODE+'|'+tracking_status.toString(), 30);

    if (!only_uploading) {
        if (theme == 'custom') {
            open_theme_editor()
        }
        else close_theme_editor()
    }

    for (property in rec_themes[theme]['vars']) {
        document.documentElement.style.setProperty(property, rec_themes[theme]['vars'][property])
    }

    update_svgs();
    update_base_styles();
}

function fill_theme_editor () {
    let theme_editor = document.getElementById('theme_editor')
    theme_editor.innerHTML = `
    <div id='TE_header'>
        <p>Настройки темы</p>
        <a class="editbar-close" onclick="close_theme_editor();">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
    </div>
    `

    let div = document.createElement('div')
    div.setAttribute('id', 'TE_content')
    for (property in rec_themes['custom']['vars']) {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <label>${property_text[property]}</label>
        </td>
        <td>
            <input type='color' value='${rec_themes['custom']['vars'][property]}' onchange='set_theme_property("${property}", this)'>
        </td>
        `
        div.appendChild(row)
    }
    theme_editor.appendChild(div)

    div = document.createElement('div')
    div.setAttribute('id', 'TE_set_base')

    let button = document.createElement('button')
    button.setAttribute('onclick', 'set_custom_as_base_theme()')
    button.innerText = 'Установить как'
    div.appendChild(button)

    let select = document.createElement('select')
    select.setAttribute('id', 'TE_selection_of_base')
    for (theme in rec_themes) {
        if (theme == 'custom') continue
        let option = document.createElement('option')
        option.setAttribute('value', theme)
        option.innerText = rec_themes[theme]['text']
        select.appendChild(option)
    }
    div.appendChild(select)

    theme_editor.appendChild(div)
}

function set_theme_property (property, clr_input) {
    rec_themes['custom']['vars'][property] = clr_input.value
    document.documentElement.style.setProperty(property, clr_input.value)
    save_custom_theme()
    if (property == '--color-primary') update_svgs()
}

function set_custom_as_base_theme () {
    let s_mode = TE_selection_of_base.value
    for (property in rec_themes['custom']['vars']) {
        rec_themes['custom']['vars'][property] = rec_themes[s_mode]['vars'][property]
        document.documentElement.style.setProperty(property, rec_themes[s_mode]['vars'][property])
    }
    save_custom_theme()
    fill_theme_editor()
    update_svgs()
}

function save_custom_theme () {
    let cookie_text = ''
    for (property in rec_themes['custom']['vars']) {
        cookie_text += property + ':' + rec_themes['custom']['vars'][property] + '|'
    }
    createCookie('custom_theme', cookie_text.slice(0, -1), 180)
}

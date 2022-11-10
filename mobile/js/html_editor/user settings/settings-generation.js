function genEditOrder() {
    let panel = open_popup_panel('Настройка фильтров', 'editbar')
    panel.innerHTML = `
    <div class="editbar-main">
        <div class="editbar-main-menu">
            <div>
                <a class="editbar-main-menu__button editbar-main-menu__button--accept"          onclick="save_settings()">Применить</a>
                <a class="editbar-main-menu__button editbar-main-menu__button--import"          onclick="insert_import()">Импорт</a>
                <a class="editbar-main-menu__button editbar-main-menu__button--export"          onclick="insert_export()">Экспорт</a>
            </div>
            <div>
                <a class="editbar-main-menu__button editbar-main-menu__button--cancel"          onclick="load_settings()"        >Отменить</a>
                <a class="editbar-main-menu__button editbar-main-menu__button--recommendations" onclick="insert_recomendations()">Наборы</a>
                <a class="editbar-main-menu__button editbar-main-menu__button--clear"           onclick="set_clear_styles()"     >Сбросить</a>
            </div>
        </div>

        <div class="editbar-main-choice" id="EditOrder">
        </div>
    </div>
    <div id='editbar_extend'>
        <p id='editbar_welcome' onclick="open_info_panel('filters')">Выберите подгруппу сверху для открытия их фильтров. Они будут отображены здесь, на месте этого текста, и доступны для редактирования. Если не понимаете что такое фильтры, нажмите на этот текст для открытия инструкции.</p>
    </div>
    `

    let eleo = panel.querySelector("#EditOrder");
    if (!eleo) return
    eleo.innerHTML='';

    i = 1;
    let options = ''
    for (let class_name in used_class_names) {
        options += `
        <option value="${i}">${i}</option>`
        i++;
    }

    i = 1;
    for (let class_name_i in used_class_names) {
        let class_name = class_name_i.replaceAll(' ', '_')
        let opacity = ''
        let onclick = `onclick="genFilterList('${class_name_i}');"`
		if (Object.keys(used_class_names[class_name_i]).length == 0) {
            opacity = 'style="opacity: 0.5"'
            onclick = ''
        }

        eleo.insertAdjacentHTML("beforeend",`
            <div class="editbar-main-choice__item" name='${class_name_i}'>
                <select id="editbar-main-choice_ans_${class_name}" was="${i}" onchange="editbar_replace(this)">
                    ${options}
                </select>
                <div class="editbar-main-choice__item_content" ${onclick}>
                    <label ${opacity} class="editbar-main-choice__item-name">${class_name_i}</label>
                </div>
            </div>
        `)
        eleo.querySelector(`#editbar-main-choice_ans_${class_name} > option[value="${i}"]`).setAttribute('selected', '')

        i++
	}
}

function editbar_replace (sender) {
    let panel = document.getElementById('EditOrder')
    if (!panel) return

    let replaced = panel.querySelector(`select[was="${sender.value}"]`)

    replaced.value = sender.getAttribute('was')
    replaced.setAttribute('was', replaced.value)
    sender.setAttribute('was', sender.value)
}

let clrinput_titles = { 'color'           : 'Выберите цвет для текста.', 
                        'background-color': 'Выберите цвет для заднего фона текста.', 
                        'border'          : 'Выберите цвет для границы блока текста.'}
let checkbox_titles = { 'color'           : 'Вкл/выкл. постоянный цвет текста. Если выключен, цвет будет зависеть от выбранной цветовой темы.', 
                        'background-color': 'Вкл/выкл. отображение заднего фона текста. Если выключить, фон будет прозрачным.', 
                        'border'          : 'Вкл/выкл. отображение границы блока текста.'}

function new_clr_input (width, style_class, attrib, with_checkbox = false, Lmargin = 3, Rmargin = 3, height = 18) {
    let attrib_colour = ''
    let id_str = ''
    switch (attrib) {
        case 'color':
            attrib_colour = get_css_attribute(attrib, style_class)
            id_str = 'txtclr_of_' + style_class
            break
        case 'background-color':
            attrib_colour = get_css_attribute(attrib, style_class)
            id_str = 'bgrclr_of_' + style_class
            break
        case 'border':
            attrib_colour = get_css_attribute(attrib, style_class).split(' ')[2]
            id_str = 'brdclr_of_' + style_class
            break
        default:
            attrib_colour = style_class
            id_str = attrib
    }

    let td = document.createElement('td')
    td.setAttribute('style', `position: relative`)

    let clr_input = document.createElement('input')
    clr_input.setAttribute('type'    , 'color')
    clr_input.setAttribute('value'   , attrib_colour)
    clr_input.setAttribute('id'      , id_str + '_input')
    clr_input.setAttribute('onchange', "set_attrib_from_editor('"+id_str+"_input')")
    clr_input.setAttribute('title'   , clrinput_titles[attrib])
    clr_input.setAttribute('style'   , '')
    clr_input.style['position'     ] = 'absolute'
    clr_input.style['left'         ] = with_checkbox? (Lmargin+height)+'px' : Lmargin+'px'
    clr_input.style['top'          ] = '0px'
    clr_input.style['margin'       ] = '0px'
    clr_input.style['margin-top'   ] = '1px'
    clr_input.style['margin-bottom'] = '1px'
    clr_input.style['width'        ] = (with_checkbox? width-height-(Lmargin+Rmargin) : width-(Lmargin+Rmargin)).toString() + 'px'
    clr_input.style['height'       ] = height+'px'
    clr_input.style['opacity'      ] = '0'

    let div = document.createElement('div')
    div.setAttribute('id', id_str + '_div')
    div.setAttribute('style', '')
    div.style['background-color'] = attrib_colour
    div.style['position'        ] = 'absolute'
    div.style['left'            ] = with_checkbox? (Lmargin+height)+'px' : Lmargin+'px'
    div.style['top'             ] = '0px'
    div.style['margin'          ] = '0px'
    div.style['margin-top'      ] = '1px'
    div.style['margin-bottom'   ] = '1px'
    div.style['width'           ] = (with_checkbox? width-height-(Lmargin+Rmargin) : width-(Lmargin+Rmargin)).toString() + 'px'
    div.style['height'          ] = (height-2)+'px'
    div.style['border'          ] = '1px solid #888888'
    div.style['border-radius'   ] = with_checkbox? '0px 8px 8px 0px' : '8px'

    clr_input.oninput = function () {div.style.backgroundColor = clr_input.value}

    if (with_checkbox) {
        let checked = true
        switch (attrib) {
            case 'color':
                checked = check_for_css_attribute('color', style_class)
                break
            case 'background-color':
                checked = (attrib_colour !== 'transparent')
                break
            case 'border':
                checked = (get_css_attribute(attrib, style_class).split(' ')[0] == '1px')
                break
        }

        let checkbox = document.createElement('input')
        checkbox.setAttribute('type'    , 'checkbox')
        if (checked) checkbox.setAttribute('checked', '')
        checkbox.setAttribute('id'      , id_str + '_checkbox')
        checkbox.setAttribute('onchange', "set_attrib_from_editor('"+id_str+"_checkbox')")
        checkbox.setAttribute('title'   , checkbox_titles[attrib])
        checkbox.setAttribute('style'   , '')
        checkbox.style['position'     ] = 'absolute'
        checkbox.style['left'         ] = Lmargin+'px'
	    checkbox.style['top'          ] = '0px'
        checkbox.style['margin'       ] = '0px'
        checkbox.style['margin-top'   ] = '1px'
        checkbox.style['margin-bottom'] = '1px'
        checkbox.style['width'        ] = height+'px'
        checkbox.style['height'       ] = height+'px'

        td.appendChild(checkbox)
    }
    td.appendChild(div)
    td.appendChild(clr_input)

    return td
}

let CBtitles = {'font-style'  : 'Выделить текст курсивом.', 
                'font-weight' : 'Выделить текст жирным.', 
                'underline'   : 'Выделить текст подчёркиванием.', 
                'line-through': 'Выделить текст зачёркиванием.'}

function new_checkbox (style_class, attrib, height = 18) {
    let td = document.createElement('td')

    let id_str = ''
    let checked = true
    switch (attrib) {
        case 'font-style':
            checked = (get_css_attribute(attrib, style_class) == 'italic')
            id_str = 'fstyle_of_' + style_class
            break
        case 'font-weight':
            checked = (get_css_attribute(attrib, style_class) == 'bold')
            id_str = 'weight_of_' + style_class
            break
        case 'underline':
            checked = (get_css_attribute('text-decoration', style_class).indexOf(attrib) !== -1)
            id_str = 'underl_of_' + style_class
            break
        case 'line-through':
            checked = (get_css_attribute('text-decoration', style_class).indexOf(attrib) !== -1)
            id_str = 'linetr_of_' + style_class
            break
    }

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type' , 'checkbox')
    if (checked) checkbox.setAttribute('checked', '')
    checkbox.setAttribute('id'   , id_str + '_checkbox')
    checkbox.setAttribute('onchange', "set_attrib_from_editor('"+id_str+"_checkbox')")
    checkbox.setAttribute('title', CBtitles[attrib])
    checkbox.setAttribute('style', '')
    checkbox.style['margin'  ] = '1px'
    checkbox.style['width'   ] = height+'px'
    checkbox.style['height'  ] = height+'px'

    td.appendChild(checkbox)

    return td
}

let current_filter_list = ''
function genFilterList(class_name) {
    current_filter_list = class_name
    let elfl = document.getElementById("editbar_extend")
    elfl.innerHTML = ''

    let wrap = document.createElement('div')
    wrap.setAttribute('id', 'editbar_wrap')

    for (subclass_name in used_class_names[class_name]) {
        let style_class = used_class_names[class_name][subclass_name]

        let div = document.createElement('div')
        div.setAttribute('class', 'editbar_itembox')

        let height = 40

        div.innerHTML = `
        <div class="editbar_itembox-content">
            <p class="${style_class}">${subclass_name}</p>
        </div>
        <div class="editbar_itembox-edit">
            <table class="editbar_itembox-edit-colour">
                <thead>
                    <tr>
                        <th>Цвет текста</th>
                        <th>Цвет фона</th>
                        <th>Цвет рамки</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="height: ${height}px;"></tr>
                </tbody>
            </table>
            <table class="editbar_itembox-edit-style">
                <thead>
                    <tr>
                        <th style='font-style: italic'>Курсив</th>
                        <th style='font-weight: bold'>Жирный</th>
                        <th style='text-decoration: underline'>Подчёрк.</th>
                        <th style='text-decoration: line-through'>Зачёрк.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="height: ${height}px;"></tr>
                </tbody>
            </table>
        </div>
        `

        let edit_panel = div.querySelector('.editbar_itembox-edit-colour tbody tr')

        edit_panel.appendChild(new_clr_input(150, style_class, 'color'           , true, 3, 3, height - 4))
        edit_panel.appendChild(new_clr_input(150, style_class, 'background-color', true, 3, 3, height - 4))
        edit_panel.appendChild(new_clr_input(150, style_class, 'border'          , true, 3, 3, height - 4))
        
        edit_panel = div.querySelector('.editbar_itembox-edit-style tbody tr')

        edit_panel.appendChild(new_checkbox(style_class, 'font-style'  , height - 4))
        edit_panel.appendChild(new_checkbox(style_class, 'font-weight' , height - 4))
        edit_panel.appendChild(new_checkbox(style_class, 'underline'   , height - 4))
        edit_panel.appendChild(new_checkbox(style_class, 'line-through', height - 4))

        wrap.appendChild(div)
	}

    elfl.appendChild(wrap)
}

function insert_recomendations () {
    current_filter_list = ''
    let editbar = document.getElementById("editbar_extend")
    editbar.innerHTML = `
    <div id="editbar-main-menu__rec_list">
    </div>
    `
    let block = editbar.children[0]

    for (rec_style in recomended_styles) {
        let div = document.createElement('div')
        div.setAttribute('class', 'editbar-main-menu__rec')
        div.setAttribute('onclick', `set_rec_style('${rec_style}')`)
        div.innerHTML = `
        <h1>${rec_style}</h1>
        <p>${recomended_styles_descr[rec_style]}</p>
        `
        block.appendChild(div)
    }
}

function insert_import () {
    current_filter_list = ''
    let editbar = document.getElementById("editbar_extend")
    editbar.innerHTML = `
    <div class='import_panel' id='ImportPanel'>
        <p class="import_panel-title">Импорт фильтров</p>
        <a class="asidebar-close" onclick='ImportPanelClose()'>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
        <div>
            <textarea id='import_textarea' placeholder='Вставьте сюда экспортируемую строку...'></textarea>
            <br>
            <button class='event_panel_button' onclick='import_filters()'>Импортировать</button>
            <button class='event_panel_button' onclick='import_filters(true)'>Импортировать с очисткой</button>
        </div>
    </div>
    `    
}

function insert_export () {
    current_filter_list = ''
    let editbar = document.getElementById("editbar_extend")
    editbar.innerHTML = `
    <div class='export_panel' id='ExportPanel'>
        <p class="export_panel-title">Экспорт фильтров</p>
        <a class="asidebar-close" onclick='ExportPanelClose()'>
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
        <table id='export_panel-table'>
            <tbody>
            </tbody>
        </table>
        <div>
            <p>Выберите, какие фильтры хотите экспортировать (на прямоугольники тоже можно 
            нажимать). Если хотите экспортировать всё - просто игнорируйте выбор.
            </p>
            <p>
            Точками показаны фильтры чего-либо, что не представлено в 
            открытом сейчас расписании группы/преподавателя. К сожалению, 
            посмотреть их все сразу технически не реализуемо на данный момент.</p>
            <br>
            <button class='event_panel_button' onclick='export_filters()'>Экспорт по коду</button>
            <button class='event_panel_button' onclick='safe_export()'>Экспорт по ссылке</button>
            <br>
            <textarea id='export_textarea' class='hidden'></textarea>
        </div>
    </div>
    `

    if (there_are_changes) {
        if (confirm('Вы не применили последние изменения и они не будут внесены ' + 
                    'в строку для экспорта. Применить сейчас?')) {
            save_settings()
            there_are_changes = false
        }
    }
    fill_export_panel()
}
function genEditOrder() {
    let eleo = document.getElementById("EditOrder");
    eleo.innerHTML='';
    for (class_name in used_class_names) {
        let opacity = ''
        let onclick = `onclick="filterbarShow('${class_name}');"`
		if (Object.keys(used_class_names[class_name]).length == 0) {
            opacity = 'style="opacity: 0.5"'
            onclick = ''
        }

        eleo.insertAdjacentHTML("beforeend",`
            <li class="editbar-main-choice__item" name='${class_name}'>
                <div style='position: relative'>
                    <button class="editbar-main-choice__item_up" onclick="move_up('${class_name}')">▲</button>
                    <br>
                    <button class="editbar-main-choice__item_down" onclick="move_down('${class_name}')">▼</button>
                </div>
                <div class="editbar-main-choice__item_content" ${onclick}>
                    <p ${opacity} class="editbar-main-choice__item-name">${class_name}</p>
                </div>
                <div ${opacity} class="editbar-main-choice__item_svg" ${onclick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                </div>
            </li>
        `)
	}
}

function move_up (class_name) {
    let list = document.getElementsByClassName('editbar-main-choice__item')
    for (let i = 1; i < list.length; i++) {
        if (list[i].getAttribute('name') == class_name) {
            list[i-1].before(list[i])
            break
        }
    }
}

function move_down (class_name) {
    let list = document.getElementsByClassName('editbar-main-choice__item')
    for (let i = 0; i < list.length-1; i++) {
        if (list[i].getAttribute('name') == class_name) {
            list[i+1].after(list[i])
            break
        }
    }
}

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
    }

    let td = document.createElement('td')
    td.setAttribute('style', `position: relative`)

    let clr_input = document.createElement('input')
    clr_input.setAttribute('type'    , 'color')
    clr_input.setAttribute('value'   , attrib_colour)
    clr_input.setAttribute('id'      , id_str + '_input')
    clr_input.setAttribute('onchange', "set_attrib_from_editor('"+id_str+"_input')")
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
                checked = (attrib_colour !== 'transparent')
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
    let elfl = document.getElementById("Filters_List")
    elfl.innerHTML=''

    let table = document.createElement('table')
    table.setAttribute('style', 'margin: 5px')
    let collgroup = document.createElement('colgroup')
    collgroup.setAttribute('style', 'align: center; valign: center')
    collgroup.innerHTML = `
        <col span='1' style=''>
        <col span='1' style='width: 54px'>
        <col span='2' style='width: 64px'>
        <col span='1' style='width: 5px'>
        <col span='4' style='width: 20px'>`
    table.appendChild(collgroup)
    let tr = document.createElement('tr')
    tr.innerHTML = `<th>название</th>
                    <th>текст</th>
                    <th>фон</th>
                    <th>рамка</th>
                    <th></th>
                    <th style='font-style: italic'>К</th>
                    <th style='font-weight: bold'>Ж</th>
                    <th style='text-decoration: underline'>П</th>
                    <th style='text-decoration: line-through'>З</th>
    `
    table.appendChild(tr)

    for (subclass_name in used_class_names[class_name]) {
        let style_class = used_class_names[class_name][subclass_name];
        tr = document.createElement('tr')

        tr.innerHTML = `
                <td style='vertical-align: top'>
                    <p style='margin: 1px' class="filterbar-main-choice__item-name ${style_class}">
                        ${subclass_name}
                    </p>
                </td>`

        tr.appendChild(new_clr_input(54, style_class, 'color'                 ))
        tr.appendChild(new_clr_input(64, style_class, 'background-color', true))
        tr.appendChild(new_clr_input(64, style_class, 'border'          , true))
        tr.appendChild(document.createElement('td'))
        tr.appendChild(new_checkbox(style_class, 'font-style'  ))
        tr.appendChild(new_checkbox(style_class, 'font-weight' ))
        tr.appendChild(new_checkbox(style_class, 'underline'   ))
        tr.appendChild(new_checkbox(style_class, 'line-through'))

        table.appendChild(tr)
	}

    elfl.appendChild(table)
}

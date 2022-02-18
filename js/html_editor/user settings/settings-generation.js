function genEditOrder() {
    let eleo = document.getElementById("EditOrder");
    eleo.innerHTML='';
    for (class_name in used_class_names) {
		if (Object.keys(used_class_names[class_name]).length == 0) continue
        eleo.insertAdjacentHTML("beforeend",`
            <div class="editbar-main-choice__item" onclick="filterbarShow('${class_name}');">
                <p class="editbar-main-choice__item-name">
                    ${class_name}
                </p>
                <a calss="editbar-main-choice__item-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                </a>
            </div>
        `)
	}
}

function genFilterList(class_name) {
    let elfl = document.getElementById("Filters_List");
    elfl.innerHTML='';
    for (subclass_name in used_class_names[class_name]) {
        let style_class = used_class_names[class_name][subclass_name];

        let fstyle_value = get_css_attribute('font-style', style_class)
        if (fstyle_value && fstyle_value == 'italic') fstyle_value = 'checked'
        else fstyle_value = ''
        let weight_value = get_css_attribute('font-weight', style_class)
        if (weight_value && weight_value == 'bold') weight_value = 'checked'
        else weight_value = ''
        let underl_value = get_css_attribute('text-decoration', style_class)
        if (underl_value && underl_value.split(' ').indexOf('underline') !== -1) underl_value = 'checked'
        else underl_value = ''
        let linetr_value = get_css_attribute('text-decoration', style_class)
        if (linetr_value && linetr_value.split(' ').indexOf('line-through') !== -1) linetr_value = 'checked'
        else linetr_value = ''

        elfl.insertAdjacentHTML("beforeend",`
            <div class="filterbar-main-choice__item">
                <p class="filterbar-main-choice__item-name ${used_class_names[class_name][subclass_name]}">
                    ${subclass_name}
                </p>
                <input type='color' value='${get_css_attribute('color'           , style_class)}' id='colour_of_${style_class}' onchange='set_new_txt_colour("${style_class}", "colour_of_${style_class}")'>
                <input type='checkbox' ${    get_css_attribute('background-color', style_class) == 'transparent'? '' : 'checked'} id='backgr_of_${style_class}' onchange='set_background("${style_class}", "backgr_of_${style_class}", "bgrclr_of_${style_class}")'>
                <input type='color' value='${get_css_attribute('background-color', style_class)}' id='bgrclr_of_${style_class}' onchange='set_background("${style_class}", "backgr_of_${style_class}", "bgrclr_of_${style_class}")'>
                <input type='checkbox' ${    get_css_attribute('border'          , style_class).split(' ')[0] == '1px'? 'checked' : ''} id='border_of_${style_class}' onchange='set_border("${style_class}", "border_of_${style_class}", "brdclr_of_${style_class}")'>
                <input type='color' value='${get_css_attribute('border'          , style_class).split(' ')[2]}' id='brdclr_of_${style_class}' onchange='set_border("${style_class}", "border_of_${style_class}", "brdclr_of_${style_class}")'>
                <input type='checkbox' ${fstyle_value} id='fstyle_of_${style_class}' onchange='set_italic      ("${style_class}", "fstyle_of_${style_class}")'>
                <input type='checkbox' ${weight_value} id='weight_of_${style_class}' onchange='set_bold        ("${style_class}", "weight_of_${style_class}")'>
                <input type='checkbox' ${underl_value} id='underl_of_${style_class}' onchange='set_underline   ("${style_class}", "underl_of_${style_class}")'>
                <input type='checkbox' ${linetr_value} id='linetr_of_${style_class}' onchange='set_line_through("${style_class}", "linetr_of_${style_class}")'>
            </div>
        `)
	}
}

/* old inputs (Глеб, извини)
<input type='color' value='${get_css_attribute('color', style_class)}' id='colorOf${used_class_names[class_name][subclass_name]}' onchange='set_new_txt_colour("colorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
<input type="checkbox" ${'checked'} id='bgOf${used_class_names[class_name][subclass_name]}' onchange='set_background()'>
<input type='color' value='${get_css_attribute('background-color', style_class)}' id='bgColorOf${used_class_names[class_name][subclass_name]}' onchange='set_new_bgr_colour("bgColorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
<input type="checkbox" ${get_css_attribute('border', style_class).split(' ')[0] == '1px'? 'checked' : ''}  id='borderOf${used_class_names[class_name][subclass_name]}' onchange='set_border("borderOf${used_class_names[class_name][subclass_name]}","borderColorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
<input type='color' value='${get_css_attribute('border', style_class).split(' ')[2]}' id='borderColorOf${used_class_names[class_name][subclass_name]}' onchange='set_border("borderOf${used_class_names[class_name][subclass_name]}","borderColorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
<input type="checkbox" ${get_css_attribute('font-style', style_class) == 'italic'? 'checked' : ''}  id='italicOf${used_class_names[class_name][subclass_name]}' onchange='set_italic("italicOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
<input type="checkbox" ${get_css_attribute('font-weight', style_class) == 'bold'? 'checked' : ''}  id='boldOf${used_class_names[class_name][subclass_name]}' onchange='set_bold("boldOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
*/

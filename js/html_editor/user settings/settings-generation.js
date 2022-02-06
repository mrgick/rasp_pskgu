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
        elfl.insertAdjacentHTML("beforeend",`
            <div class="filterbar-main-choice__item">
                <p class="filterbar-main-choice__item-name ${used_class_names[class_name][subclass_name]}">
                    ${subclass_name}
                </p>
                <input type='color' value='${get_css_attribute('color', style_class)}' id='colorOf${used_class_names[class_name][subclass_name]}' onchange='set_new_txt_colour("colorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
                <input type="checkbox" ${'checked'} id='bgOf${used_class_names[class_name][subclass_name]}' onchange='set_background()'>
                <input type='color' value='${get_css_attribute('background-color', style_class)}' id='bgColorOf${used_class_names[class_name][subclass_name]}' onchange='set_new_bgr_colour("bgColorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
                <input type="checkbox" ${get_css_attribute('border', style_class).split(' ')[0] == '1px'? 'checked' : ''}  id='borderOf${used_class_names[class_name][subclass_name]}' onchange='set_border("borderOf${used_class_names[class_name][subclass_name]}","borderColorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
                <input type='color' value='${get_css_attribute('border', style_class).split(' ')[2]}' id='borderColorOf${used_class_names[class_name][subclass_name]}' onchange='set_border("borderOf${used_class_names[class_name][subclass_name]}","borderColorOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
                <input type="checkbox" ${get_css_attribute('font-style', style_class) == 'italic'? 'checked' : ''}  id='italicOf${used_class_names[class_name][subclass_name]}' onchange='set_italic("italicOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
                <input type="checkbox" ${get_css_attribute('font-weight', style_class) == 'bold'? 'checked' : ''}  id='boldOf${used_class_names[class_name][subclass_name]}' onchange='set_bold("boldOf${used_class_names[class_name][subclass_name]}","${style_class}")'>
            </div>
        `)
	}
}
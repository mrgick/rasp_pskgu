/*HTML code for editor and other*/

let selected = 'Тип занятия'
editor_closed = true

function change_editor_status () {
	div = document.getElementById('editor')
	if (editor_closed) {
		editor_closed = false
		div.innerHTML = `
	    <div>
	        <select id='class_selector' onchange='renew_subclass_list()'>
	        </select>
	    </div>
	    <div>
	        <select id='subclass_selector' onchange='renew_editor_part()'>
			</select>
			<br>
			<label>Background colour</label>
			<br>
			<input type='color' value='${base_styles[MODE]['background-color']}' id='bgr_clr_changer' onchange='set_new_bgr_colour()'/>
			<br>
			<label>Text colour</label>
			<br>
			<input type='color' value='${base_styles[MODE]['color'           ]}' id='txt_clr_changer' onchange='set_new_txt_colour()'/>
			<br>
			<label>Border colour</label>
			<br>
			<input type='color' value='${base_styles[MODE]['border'].split(' ')[2]}' id='brd_clr_changer' onchange='set_new_brd_colour()'/>
			<br>
			<label>Border</label>
			<input type="checkbox" ${base_styles[MODE]['border'].split(' ')[0] == '1px'? 'checked' : ''}  id='bw_checker' onchange='set_border()'>
			<br>
			<label><span style='font-style: italic'>Italic</span> text</label>
			<input type="checkbox" ${base_styles[MODE]['font-style'] == 'italic'? 'checked' : ''}  id='italic_checker' onchange='set_italic()'>
			<br>
			<label><span style='font-weight: bold'>Bold</span> text</label>
			<input type="checkbox" ${base_styles[MODE]['font-weight'] == 'bold'? 'checked' : ''}  id='bold_checker' onchange='set_bold()'>
			<br>
		</div>`
	    renew_class_list()
	}
	else {
		div.innerHTML = ''
		editor_closed = true
	}
}

function renew_editor_part () {
	bgr_clr_changer.value = get_css_attribute('background-color')
	txt_clr_changer.value = get_css_attribute('color'           )
	brd_clr_changer.value = get_css_attribute('border').split(' ')[2]

	bw_checker.checked     = (get_css_attribute('border'     ).split(' ')[0] == '1px'? true : false)
	italic_checker.checked = (get_css_attribute('font-style' ) == 'italic'? true : false)
	bold_checker.checked   = (get_css_attribute('font-weight') == 'bold'? true : false)
}

function renew_subclass_list () {
	subclass_selector.innerText = ''

	subclass_option = document.createElement('option')
	subclass_option.innerText = 'Выберите...'
	subclass_option.setAttribute('style', 'color: #AAAAAA')
	subclass_selector.appendChild(subclass_option)

	for (subclass_name in used_class_names[class_selector.value]) {
		subclass_option = document.createElement('option')
		subclass_option.innerText += subclass_name
		subclass_selector.appendChild(subclass_option)
	}
}

function renew_class_list () {
	class_selector.innerHTML = ''

	for (class_name in used_class_names) {
		option = document.createElement('option');
		option.innerText += class_name
		if (class_name == selected) option.setAttribute('selected', '')
		class_selector.appendChild(option)
		if (class_name == selected) renew_subclass_list()
	}
}

function get_current_css_class () {
	class_text = class_selector.value
	subclass_text = subclass_selector.value
	return document.getElementById(`style_${used_class_names[class_text][subclass_text]}`)
}
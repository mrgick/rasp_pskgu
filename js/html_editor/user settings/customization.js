/*Functions to edit css*/

function get_css_attribute (attrib, style_class) {
	if (typeof style_class == 'string') style_class = document.getElementById('style_'+style_class)
	if (style_class) {
		let matched = style_class.innerText.match(RegExp(` ${attrib}: [^;]*;`,'i'))
		if (matched) return matched[0].replace(' '+attrib+': ', '').replace(';', '')
		else return base_styles[MODE][attrib]
	}
	else return base_styles[MODE][attrib]
}

function set_css_attribute (attrib, value, style_class) {
	if (typeof style_class == 'string') style_class = document.getElementById('style_'+style_class)
	if (style_class) {
		let matched = style_class.innerText.match(RegExp(` ${attrib}: [^;]*;`,'i'))
		if (matched) { // if attrib exists
			let old_value = matched[0].replace(' '+attrib+': ', '').replace(';', '')
			style_class.innerText = style_class.innerText.replace(matched[0], matched[0].replace(old_value, value))
		}
		else { // if attrib not exists
			style_class.innerText = style_class.innerText.replace('}', attrib + ': ' + value + '; }')
		}
	}
}

function delete_css_attribute (attrib, style_class) {
	if (typeof style_class == 'string') style_class = document.getElementById('style_'+style_class)
	if (style_class) {
		let matched = style_class.innerText.match(RegExp(` ${attrib}: [^;]*;`,'i'))
		if (matched) {
			style_class.innerText = style_class.innerText.replace(matched[0], '')
		}
	}
}

function check_for_css_attribute (attrib, style_class) {
	if (typeof style_class == 'string') style_class = document.getElementById('style_'+style_class)
	if (style_class) {
		let matched = style_class.innerText.match(RegExp(` ${attrib}: [^;]*;`,'i'))
		if (matched) return true
		else return false
	}
	else return false
}

//=================================================================================================

function set_new_txt_colour (style_class, bgr_value_or_id, clr_value_or_id) {
	let colour = ''
	if (clr_value_or_id[0] == '#') colour = clr_value_or_id
	else {
		let elem = document.getElementById(clr_value_or_id)
		if (elem) colour = elem.value
	}

	if (bgr_value_or_id == 'true') set_css_attribute('color', colour, style_class)
	else if (bgr_value_or_id == 'false') delete_css_attribute('color', style_class)
	else {
		let elem = document.getElementById(bgr_value_or_id)
		if (elem.checked) set_css_attribute('color', colour, style_class)
		else delete_css_attribute('color', style_class)
	}
}
function set_background (style_class, bgr_value_or_id, clr_value_or_id) {
	let colour = ''
	if (clr_value_or_id[0] == '#') colour = clr_value_or_id
	else {
		let elem = document.getElementById(clr_value_or_id)
		if (elem) colour = elem.value
	}

	if (bgr_value_or_id == 'true') set_css_attribute('background-color', colour, style_class)
	else if (bgr_value_or_id == 'false') set_css_attribute('background-color', 'transparent', style_class)
	else {
		let elem = document.getElementById(bgr_value_or_id)
		if (elem.checked) set_css_attribute('background-color', colour, style_class)
		else set_css_attribute('background-color', 'transparent', style_class)
	}
}
function set_border (style_class, brd_value_or_id, clr_value_or_id) {
	let border = ''
	if      (brd_value_or_id == 'true' ) border = '1px'
	else if (brd_value_or_id == 'false') border = '0px'
	else {
		let elem = document.getElementById(brd_value_or_id)
		if (elem) border = elem.checked? '1px' : '0px'
	}

	let colour = ''
	if (clr_value_or_id[0] == '#') colour = clr_value_or_id
	else {
		let elem = document.getElementById(clr_value_or_id)
		if (elem) colour = elem.value
	}

	set_css_attribute('border', border + ' solid ' + colour, style_class)
}
function set_italic (style_class, value_or_id) {
	if (value_or_id == 'true') set_css_attribute('font-style', 'italic', style_class)
	else if (value_or_id == 'false') delete_css_attribute('font-style', style_class)
	else {
		let elem = document.getElementById(value_or_id)
		if (elem) {
			if (elem.checked) set_css_attribute('font-style', 'italic', style_class)
			else delete_css_attribute('font-style', style_class)
		}
	}
}
function set_bold (style_class, value_or_id) {
	if (value_or_id == 'true') set_css_attribute('font-weight', 'bold', style_class)
	else if (value_or_id == 'false') delete_css_attribute('font-weight', style_class)
	else {
		let elem = document.getElementById(value_or_id)
		if (elem) {
			if (elem.checked) set_css_attribute('font-weight', 'bold', style_class)
			else delete_css_attribute('font-weight', style_class)
		}
	}
}
function set_underline (style_class, value_or_id) {
	let old_value = get_css_attribute('text-decoration', style_class)
	if (old_value == 'none') {
		if (value_or_id == 'true') set_css_attribute('text-decoration', 'underline', style_class)
		else if (value_or_id == 'false') delete_css_attribute('text-decoration', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem) {
				if (elem.checked) set_css_attribute('text-decoration', 'underline', style_class)
				else delete_css_attribute('text-decoration', style_class)
			}
		}
	}
	else if (old_value == 'underline') {
		if (value_or_id == 'false') delete_css_attribute('text-decoration', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem && !elem.checked) delete_css_attribute('text-decoration', style_class)
		}
	}
	else if (old_value == 'line-through') {
		if (value_or_id == 'true') set_css_attribute('text-decoration', 'underline line-through', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem && elem.checked) set_css_attribute('text-decoration', 'underline line-through', style_class)
		}
	}
	else if (old_value.split(' ').length == 2) {
		if (value_or_id == 'false') set_css_attribute('text-decoration', 'line-through', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem && !elem.checked) set_css_attribute('text-decoration', 'line-through', style_class)
		}
	}
}
function set_line_through (style_class, value_or_id) {
	let old_value = get_css_attribute('text-decoration', style_class)
	if (old_value == 'none') {
		if (value_or_id == 'true') set_css_attribute('text-decoration', 'line-through', style_class)
		else if (value_or_id == 'false') delete_css_attribute('text-decoration', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem) {
				if (elem.checked) set_css_attribute('text-decoration', 'line-through', style_class)
				else delete_css_attribute('text-decoration', style_class)
			}
		}
	}
	else if (old_value == 'line-through') {
		if (value_or_id == 'false') delete_css_attribute('text-decoration', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem && !elem.checked) delete_css_attribute('text-decoration', style_class)
		}
	}
	else if (old_value == 'underline') {
		if (value_or_id == 'true') set_css_attribute('text-decoration', 'underline line-through', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem && elem.checked) set_css_attribute('text-decoration', 'underline line-through', style_class)
		}
	}
	else if (old_value.split(' ').length == 2) {
		if (value_or_id == 'false') set_css_attribute('text-decoration', 'underline', style_class)
		else {
			let elem = document.getElementById(value_or_id)
			if (elem && !elem.checked) set_css_attribute('text-decoration', 'underline', style_class)
		}
	}
}

function set_attrib_from_editor (call_id) {
	//console.log(call_id)
	let i = call_id.indexOf('_of_')
	let set_type = call_id.slice(0, i)
	call_id = call_id.replace(set_type+'_of_', '')
	i = call_id.lastIndexOf('_')
	let class_name = call_id.slice(0, i)
	let id_str = set_type + '_of_' + class_name

	switch (set_type) {
		case 'txtclr':
			set_new_txt_colour(class_name, id_str + '_checkbox', id_str + '_input')
			break

		case 'bgrclr':
			set_background(class_name, id_str + '_checkbox', id_str + '_input')
			break

		case 'brdclr':
			set_border(class_name, id_str + '_checkbox', id_str + '_input')
			break
		 
		case 'fstyle':
			set_italic(class_name, id_str + '_checkbox')
			break
		 
		case 'weight':
			set_bold(class_name, id_str + '_checkbox')
			break
		 
		case 'underl':
			set_underline(class_name, id_str + '_checkbox')
			break
		 
		case 'linetr':
			set_line_through(class_name, id_str + '_checkbox')
			break
	}
}

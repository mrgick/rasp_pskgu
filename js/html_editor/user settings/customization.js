/*Functions to edit css*/

function get_css_attribute (attrib, style_class = null) {
	if (!style_class) style_class = get_current_css_class()
	else if (typeof style_class == 'string') style_class = document.getElementById('style_'+style_class)
	if (style_class) {
		let matched = style_class.innerText.match(RegExp(` ${attrib}: [a-z0-9# -]*;`,'i'))
		if (matched) return matched[0].replace(' '+attrib+': ', '').replace(';', '')
		else return ''
	}
}

function set_css_attribute (attrib, value, style_class = null) {
	if (!style_class) style_class = get_current_css_class()
	else if (typeof style_class == 'string') style_class = document.getElementById('style_'+style_class)
	if (style_class) {
		let matched = style_class.innerText.match(RegExp(` ${attrib}: [a-z0-9# ]*;`,'i'))
		if (matched) {
			let old_value = matched[0].replace(' '+attrib+': ', '').replace(';', '')
			style_class.innerText = style_class.innerText.replace(matched[0], matched[0].replace(old_value, value))
		}
	}
}

function set_new_bgr_colour (id = bgr_clr_changer, style_class = null) {
	set_css_attribute('background-color', document.getElementById(id).value, style_class)
}
function set_new_txt_colour (id = txt_clr_changer, style_class = null) {
	set_css_attribute('color', document.getElementById(id).value, style_class)
}
function set_new_brd_colour (id1 = bw_checker, id2 = brd_clr_changer, style_class = null) {
	set_border(id1.checked, id2.value, style_class)
}
function set_border (id1 = bw_checker, id2 = brd_clr_changer, style_class = null) {
	set_css_attribute('border', `${document.getElementById(id1).checked ? '1' : '0'}px solid ${document.getElementById(id2).value}`, style_class)
}
function set_italic (id = italic_checker, style_class = null) {
	set_css_attribute('font-style', document.getElementById(id).checked ? 'italic' : 'normal', style_class)
}
function set_bold (id = bold_checker, style_class = null) {
	set_css_attribute('font-weight', document.getElementById(id).checked  ? 'bold' : 'normal', style_class)
}

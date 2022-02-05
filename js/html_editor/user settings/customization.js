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

function set_new_bgr_colour () {
	set_css_attribute('background-color', bgr_clr_changer.value)
}
function set_new_txt_colour () {
	set_css_attribute('color', txt_clr_changer.value)
}
function set_new_brd_colour () {
	set_border()
}
function set_border () {
	set_css_attribute('border', `${bw_checker.checked? '1' : '0'}px solid ${brd_clr_changer.value}`)
}
function set_italic () {
	set_css_attribute('font-style', italic_checker.checked? 'italic' : 'normal')
}
function set_bold () {
	set_css_attribute('font-weight', bold_checker.checked? 'bold' : 'normal')
}

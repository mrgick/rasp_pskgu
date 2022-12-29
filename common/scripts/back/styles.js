/*creating styles for classes and subclasses in table*/

function create_class (class_name, ...style_content) {
	let style = document.createElement('style')
	style.setAttribute('type', 'text/css')
	style.setAttribute('id', 'style_'+class_name)
	if (style_content.length > 0) {
		if (style_content[0][0] == '{') style.innerHTML = `.${class_name} ${style_content[0]}`
		else style.innerHTML = `.${class_name} { ${style_content.join('; ')}; }`
	}
	else style.innerHTML = `.${class_name} { }`
	document.getElementsByTagName('head')[0].appendChild(style)
}

function generate_css_classes () {
	let style_content = []
	for (attrib in base_styles[MODE]) style_content.push(attrib + ': ' + base_styles[MODE][attrib])
	create_class('base', ...style_content)

	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			create_class(used_class_names[class_text][subclass_text])
		}
	}

	load_settings()
	create_class('highlight')
}

let base_style_classes = {}
for (base_style in base_styles) {
	base_style_classes[base_style] = document.createElement('style')

	let style_content = []
	for (attrib in base_styles[base_style]) style_content.push(attrib+': '+base_styles[base_style][attrib])

	base_style_classes[base_style].innerText = `.base_style_class_${base_style} { ${style_content.join('; ')};}`
	base_style_classes[base_style].setAttribute('id', 'base_style_class_'+base_style)
}

function clear_current_styles () {
	let styles = document.getElementsByTagName('style')
	for (style of styles) {
		if (style.getAttribute('id') === null || !style.getAttribute('id').startsWith('style_')) continue
		if (ignored_styles.indexOf(style.getAttribute('id')) !== -1) continue
		style.innerHTML  = `.${style.getAttribute('id').replace('style_', '')} { }`
	}
}

function set_rec_style (rec_style) {
	clear_current_styles()

	for (cl_name in recomended_styles[rec_style]) {
		if (recomended_styles[rec_style][cl_name]['!all']) {
			let class_text = all_REs[cl_name][0]
			for (subclass_text in used_class_names[class_text]) {
				for (attrib in recomended_styles[rec_style][cl_name]['!all']) {
					set_css_attribute(attrib, recomended_styles[rec_style][cl_name]['!all'][attrib], used_class_names[class_text][subclass_text])
				}
			}
		}
		else for (scl_name in recomended_styles[rec_style][cl_name]) {
			if (!document.getElementById('style_' + cl_name+'-'+scl_name)) create_class(cl_name+'-'+scl_name)
			for (attrib in recomended_styles[rec_style][cl_name][scl_name]) {
				set_css_attribute(attrib, recomended_styles[rec_style][cl_name][scl_name][attrib], cl_name+'-'+scl_name)
			}
		}
	}

	used_class_names = create_used_class_names(base_global_placement)

	genEditOrder()
	if (current_filter_list) genFilterList(current_filter_list)
}

function check_is_base (style_tag, mode = null) {
	if (!mode) mode = MODE
	for (attrib in base_styles[mode]) {
		if (get_css_attribute(attrib, base_style_classes[mode]) != (get_css_attribute(attrib, style_tag))) return false
	}
	return true
}

function update_base_styles (style = MODE) {
	let style_tag = document.getElementById('style_base')

	set_css_attribute('background-color', base_styles[style]['background-color' ], style_tag)
	set_css_attribute('color'           , base_styles[style]['color'            ], style_tag)
	set_css_attribute('border'          , base_styles[style]['border'           ], style_tag)
	set_css_attribute('font-style'      , base_styles[style]['font-style'       ], style_tag)
	set_css_attribute('font-weight'     , base_styles[style]['font-weight'      ], style_tag)
	set_css_attribute('text-decoration' , base_styles[style]['text-decoration'  ], style_tag)
}

function generate_new_global_placement () {
	let list = document.getElementsByClassName('editbar-main-choice__item')

	let names = {}
	for (let i = 0; i < list.length; i++) {
		names[list[i].children[0].value] = list[i].getAttribute('name')
	}

	let pre_new_global_placement = []
	for (let i = 0; i < Object.values(names).length; i++) pre_new_global_placement.push(names[i+1])
	
	let i = 0
	let new_global_placement = []
	for (let cname of pre_new_global_placement) for (class_name in all_REs) {
		if (cname == all_REs[class_name][0]) {
			new_global_placement.push(class_name)
			break
		}
	}

	if (new_global_placement.length === 0) return
	
	let need_reload = false
	for (let i = 0; i < new_global_placement.length; i++) {
		if (new_global_placement[i] != global_placement[i]) {
			need_reload = true
			break
		}
	}
	if (need_reload) {
		createCookie('global_placement', JSON.stringify(new_global_placement), 180)
		location.reload()
	}
}

let clear_button_pressed = false
let alerted_this_session = false
function set_clear_styles () {
	if (!alerted_this_session) up_warning(	'Осторожно! При нажатии кнопки "применить", ' + 
						'Вы удалите все фильтры без возможности их вернуть. ' + 
						'У Вас всё ещё имеется возможность восстановить последние ' + 
						'сохранённые фильтры, если нажмёте "отменить".')
	alerted_this_session = true
	clear_button_pressed = true
	there_are_changes    = true

	clear_current_styles()
	
	genEditOrder()
	if (current_filter_list) genFilterList(current_filter_list)

	if (mobile_version) {
		let panel = document.getElementById('EditOrder')
		i = 1
		for (let type of base_global_placement) {
			panel.querySelector(`div[name="${all_REs[type][0]}"] > select`).value = i
			i++
		}
	}
}

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

const base_styles = {'light':{
							'background-color':'transparent',
							'color'           :'#000000',
							'border'          :'0px solid #000000',
							'font-style'      :'normal',   // normal | italic
							'font-weight'     :'normal',   // normal | bold
							'text-decoration' :'none'},    // none | line-through | underline
					  'pink':{
							'background-color':'transparent', // 333366 ?
							'color'           :'#440000',
							'border'          :'0px solid #440000',
							'font-style'      :'normal',   // normal | italic
							'font-weight'     :'normal',   // normal | bold
							'text-decoration' :'none'},    // none | line-through | underline
				   'darkest':{
							'background-color':'transparent', // 333366 ?
							'color'           :'#ffffff',
							'border'          :'0px solid #000000',
							'font-style'      :'normal',   // normal | italic
							'font-weight'     :'normal',   // normal | bold
							'text-decoration' :'none'},    // none | line-through | underline
					  'dark':{
							'background-color':'transparent', // 333366 ?
							'color'           :'#ffffff',
							'border'          :'0px solid #000000',
							'font-style'      :'normal',   // normal | italic
							'font-weight'     :'normal',   // normal | bold
							'text-decoration' :'none'},    // none | line-through | underline
					'custom':{
							'background-color':'transparent',
							'color'           :'var(--color-text)',
							'border'          :'0px solid var(--color-text)',
							'font-style'      :'normal',   // normal | italic
							'font-weight'     :'normal',   // normal | bold
							'text-decoration' :'none'},    // none | line-through | underline
					}

let base_style_classes = {}
for (base_style in base_styles) {
	base_style_classes[base_style] = document.createElement('style')

	let style_content = []
	for (attrib in base_styles[base_style]) style_content.push(attrib+': '+base_styles[base_style][attrib])

	base_style_classes[base_style].innerText = `.base_style_class_${base_style} { ${style_content.join('; ')};}`
	base_style_classes[base_style].setAttribute('id', 'base_style_class_'+base_style)
}

const recomended_styles = {
	'минималистичный светлый': {
		'lesson_type': {
			'test'      : {'background-color': '#FFCCFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'test_2'    : {'background-color': '#FFCCFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'cons'      : {'background-color': '#FFCC99', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'exam'      : {'background-color': '#FFCCCC', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'practice'  : {'background-color': '#CCCCFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'lab'       : {'background-color': '#CCFFFF', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'lecture'   : {'background-color': '#CCFFCC', 'border':'0px solid #CCCCCC', 'color': '#000000'},
			'volkswagen': {'background-color': '#99CC99', 'border':'0px solid #CCCCCC', 'color': '#000000'},
		}
	},

	'минималистичный тёмный': {
		'lesson_type': {
			'test'      : {'background-color': '#993300', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'test_2'    : {'background-color': '#993300', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'cons'      : {'background-color': '#333333', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'exam'      : {'background-color': '#660000', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'practice'  : {'background-color': '#669966', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'lab'       : {'background-color': '#336666', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'lecture'   : {'background-color': '#003366', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
			'volkswagen': {'background-color': '#006633', 'border':'0px solid #CCCCCC', 'color': '#FFFFFF'},
		}
	},

	'контрастный светлый': {
		'lesson_type': {
			'test'      : {'background-color': '#FFCCFF', 'border':'1px solid #000000', 'color': '#000000'},
			'test_2'    : {'background-color': '#FFCCFF', 'border':'1px solid #000000', 'color': '#000000'},
			'cons'      : {'background-color': '#FFCC99', 'border':'1px solid #000000', 'color': '#000000'},
			'exam'      : {'background-color': '#FFCCCC', 'border':'1px solid #000000', 'color': '#000000'},
			'practice'  : {'background-color': '#CCCCFF', 'border':'1px solid #000000', 'color': '#000000'},
			'lab'       : {'background-color': '#CCFFFF', 'border':'1px solid #000000', 'color': '#000000'},
			'lecture'   : {'background-color': '#CCFFCC', 'border':'1px solid #000000', 'color': '#000000'},
			'volkswagen': {'background-color': '#99CC99', 'border':'1px solid #000000', 'color': '#000000'},
		},
		'room': {
			'!all': {'color': '#006699', 'font-weight': 'bold'},
		},
		'subgroup': {
			'1': {'color': '#CC3333', 'font-weight': 'bold'},
			'2': {'color': '#339933', 'font-weight': 'bold'},
			'3': {'color': '#003366', 'font-weight': 'bold'},
			'4': {'color': '#FF66CC', 'font-weight': 'bold'},
		},
		'teacher': {
			'!all': {'color': '#666666'}
		},
		'group': {
			'!all': {'color': '#666666'}
		}
	},

	'контрастный тёмный': {
		'lesson_type': {
			'test'      : {'background-color': '#993300', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'test_2'    : {'background-color': '#993300', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'cons'      : {'background-color': '#333333', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'exam'      : {'background-color': '#660000', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'practice'  : {'background-color': '#669966', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'lab'       : {'background-color': '#336666', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'lecture'   : {'background-color': '#003366', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
			'volkswagen': {'background-color': '#006633', 'border':'1px solid #FFFFFF', 'color': '#FFFFFF'},
		},
		'room': {
			'!all': {'color': '#0099CC', 'font-weight': 'bold'},
		},
		'subgroup': {
			'1': {'color': '#CC6666', 'font-weight': 'bold'},
			'2': {'color': '#66CC66', 'font-weight': 'bold'},
			'3': {'color': '#66CCCC', 'font-weight': 'bold'},
			'4': {'color': '#CC66CC', 'font-weight': 'bold'},
		},
		'teacher': {
			'!all': {'color': '#999999'}
		},
		'group': {
			'!all': {'color': '#999999'}
		}
	},
}

const ignored_styles = ['style_base', 'style_svgs', 'style_highlight', 'style_cal_filters']
const ignored_style_tags = ['base', 'svgs', 'highlight', 'cal_filters']

function insert_recomended_styles () {
	let rec_list = document.getElementById('rec_list')
	if (rec_list) {
		for (rec_style in recomended_styles) {
			let div = document.createElement('div')
			div.setAttribute('class', 'editbar-main-menu__rec')
			div.setAttribute('onclick', `set_rec_style('${rec_style}')`)
			div.innerText = rec_style
			rec_list.appendChild(div)
		}
	}
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

	set_css_attribute('background-color', base_styles[style]['background-color' 	], style_tag)
	set_css_attribute('color'	    , base_styles[style]['color'		], style_tag)
	set_css_attribute('border'	    , base_styles[style]['border'		], style_tag)
	set_css_attribute('font-style'	    , base_styles[style]['font-style'		], style_tag)
	set_css_attribute('font-weight'	    , base_styles[style]['font-weight'		], style_tag)
	set_css_attribute('text-decoration' , base_styles[style]['text-decoration'	], style_tag)
}

function generate_new_global_placement () {
	let list = document.getElementsByClassName('editbar-main-choice__item')
	let names = []
	for (let i = 0; i < list.length; i++) names.push(list[i].getAttribute('name'))
	let new_global_placement = []
	let i = 0
	for (cname of names) for (class_name in all_REs) {
		if (cname == all_REs[class_name][0]) {
		new_global_placement.push(class_name)
		break
		}
	}
	//console.log(new_global_placement)
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
}

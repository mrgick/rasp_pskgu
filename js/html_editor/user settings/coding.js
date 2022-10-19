/* here are functions to encode end decode styles */

//============================================================ encoding

function compact_colour (hex_colour) {
	if (hex_colour[0] == '#') hex_colour = hex_colour.slice(1)
	else if (hex_colour.startsWith('var')) hex_colour = document.documentElement.style.getPropertyValue(hex_colour.slice(4, -1)).slice(1)
	hex_colour = hex_colour.toLowerCase()
	hex_colour = (Math.round(convert_sys_to_10(hex_colour.slice(0,2),16)/51)*36 +
				  Math.round(convert_sys_to_10(hex_colour.slice(2,4),16)/51)*6  +
				  Math.round(convert_sys_to_10(hex_colour.slice(4,6),16)/51)*1  + 1)
	return convert_10_to_sys(hex_colour, 256)
}

function encode_subclass_name (subclass_name) {
	let t = subclass_name
	const ch   = 'абвгдежзийклмнопрстуфхцчшщъыэюя_'
	const ench = 'abcdefghijklmnopqrstuvwxyz'
	const vowels = 'аоуыиеэюя'
 
	t = t.toLowerCase().replaceAll('ё','е').replaceAll('ь','ъ').replaceAll('.','')
	let matched = t.match(/\d/g)
	if (matched) for (let i = 0; i < matched.length; i++) t = t.replace(matched[i], ch[matched[i]])
	matched = t.match(/[a-z]/g)
	if (matched) for (let i = 0; i < matched.length; i++) {
		t = t.replace(matched[i], ch[ench.indexOf(matched[i])])
	}

	let cnt_of_vowels = -2
    for (let letter = 0; letter < t.length; letter++) {
        if (vowels.indexOf(t[letter]) !== -1) cnt_of_vowels += 1
	}
    if      (cnt_of_vowels > 7) cnt_of_vowels = 7
    else if (cnt_of_vowels < 0) cnt_of_vowels = 0
 
    let chars = [t[t.length-2], t[t.length-1]]
    t = t.split('_')[0]
    chars.push(t[0])
    chars.push(t[Math.floor(t.length/4)  ])
    chars.push(t[Math.floor(t.length/2)-1])
    chars.push(t[Math.floor(t.length/2)  ])
    chars.push(t[Math.floor(t.length/2)+1])
    chars.push(t[t.length-1])
 
    s1 = s2 = 0
    for (i in chars) if (chars[i]) {
		s1 += ch.indexOf(chars[i])*Math.pow(2, i)+1
		s2 += ch.indexOf(chars[i])+1
	}
 
	t = (bin(s1).padEnd(13,'0') + bin(s2).padEnd(8,'0') + bin(cnt_of_vowels).padEnd(3,'0'))
    return convert_from_to(t, 2, 256)
}

function encode_style (style_tag) {
	let value = result = ''
	value = get_css_attribute('background-color', style_tag)
	if (value == 'transparent') result += convert_10_to_sys(255)
	else result += compact_colour(value)
	value = get_css_attribute('color', style_tag)
	if (check_for_css_attribute('color', style_tag)) result += compact_colour(value)
	else result += convert_10_to_sys(255)
	result += compact_colour(get_css_attribute('border', style_tag).split(' ')[2])

	value = ''
	value += (get_css_attribute('font-style' , style_tag) == 'italic'? '1' : '0')
	value += (get_css_attribute('font-weight', style_tag) == 'bold'  ? '1' : '0')
	switch(get_css_attribute('text-decoration', style_tag)) {
		case '':
		case 'none':
			value += '00'
			break

		case 'line-through':
			value += '01'
			break

		case 'underline':
			value += '10'
			break

		case 'line-through underline':
		case 'underline line-through':
			value += '11'
			break
	}
	value += (get_css_attribute('border', style_tag).split(' ')[0] == '1px'? '1' : '0')
	result += convert_from_to(value, 2, 256) 

	return result
}

let there_are_changes = false
function save_settings () {
	if (clear_button_pressed) for (class_name in all_REs) createCookie(class_name, '', 180)
	clear_button_pressed = false
	there_are_changes = false

	let cookies = {}
	for (class_name in all_REs) cookies[class_name] = {'encoded_str': [], 'to_remove': []}

	let styles = document.getElementsByTagName('style')
	for (style_tag of styles) {
		if (style_tag.getAttribute('id') === null || !style_tag.getAttribute('id').startsWith('style_')) continue
		let full_class_name = style_tag.getAttribute('id').replace('style_', '')
		if (ignored_style_tags.indexOf(full_class_name) !== -1) continue
		let subclass_name = full_class_name.split('-')[1]
		let class_name = full_class_name.split('-')[0]

		if (!check_is_base(style_tag)) {
			cookies[class_name]['encoded_str'].push(encode_subclass_name(subclass_name) + encode_style(style_tag))
		}
		else cookies[class_name]['to_remove'].push(encode_subclass_name(subclass_name))
	}
	for (class_name in all_REs) {
		let loaded_cookie = readCookie(class_name)
		let result_cookie = [...cookies[class_name]['encoded_str']]

		if (loaded_cookie) {
			loaded_cookie = loaded_cookie.split('|')
			for (code of loaded_cookie) {
				if (code.length != 7) code = try_debug(code)
				if (cookies[class_name]['to_remove'].indexOf(code.slice(0, 3)) !== -1) continue
				else {
					let push_old = true
					for (str of cookies[class_name]['encoded_str']) if (str.slice(0, 3) == code.slice(0, 3)) {
						push_old = false
						break
					}
					if (push_old) result_cookie.push(code)
				}
			}
		}

		createCookie(class_name, result_cookie.join('|'), 180)
	}
  
	generate_new_global_placement()
	if (current_filter_list) genFilterList(current_filter_list)
}

//============================================================ decoding

const special_colour_code = {255: 'dont_use', 254: 'transparent', 253: 'inherit'}
function unpack_colour (symbol) {
	symbol = convert_sys_to_10(symbol)
	if (symbol > 216) return special_colour_code[symbol]
	symbol--
	symbol = ('#' + convert_10_to_sys((Math.floor(symbol/36)%6)*51, 16).padEnd(2, '0') + 
			        convert_10_to_sys((Math.floor(symbol/6 )%6)*51, 16).padEnd(2, '0') + 
			        convert_10_to_sys((Math.floor(symbol/1 )%6)*51, 16).padEnd(2, '0'))
	return symbol
}

function decode_style (str) {
	let style_content = []
	let value = ''

	value = unpack_colour(str[0])
	if (value != 'dont_use') style_content.push('background-color: '+unpack_colour(str[0]))
	value = unpack_colour(str[1])
	if (value != 'dont_use') style_content.push('color: '           +unpack_colour(str[1]))

	value = convert_10_to_sys(convert_sys_to_10(str[3]), 2).padStart(5, '0')

	if (value[4] == '1') style_content.push(`border: 1px solid ${unpack_colour(str[2])}`)

	if (value[0] == '1') style_content.push('font-style: italic')
	if (value[1] == '1') style_content.push('font-weight: bold')
	switch(value[2] + value[3]) {
		case '00':
			 break

		case '10':
			style_content.push('text-decoration: underline')
			break

		case '01':
			style_content.push('text-decoration: line-through')
			break

		case '11':
			style_content.push('text-decoration: underline line-through')
			break
	}

	//console.log(`{ ${style_content.join('; ')}; }`)
	return `{ ${style_content.join('; ')}; }`
}

function try_debug (code) {	
	if (code.length == 3) return code + encode_style(base_style_classes[MODE])
	else if (code.length == 6) return code + '0'
	else return '___0000'
}

function load_settings () {
	clear_button_pressed = false
	there_are_changes = false
	let head = document.getElementsByTagName('head')[0]

	encode_all_subclass_names()

	for (class_text in used_class_names) {
		if (Object.keys(used_class_names[class_text]).length == 0) continue
		let class_name = used_class_names[class_text][Object.keys(used_class_names[class_text])[0]].split('-')[0]
		let loaded_cookie = readCookie(class_name)
		if (loaded_cookie) {
			let decoded_styles = {}
			for (code of Object.values(loaded_cookie.split('|'))) {
				if (code.length != 7) code = try_debug(code)
				for (key in encoded_subclass_names) if (code.slice(0, 3) == key) {
					decoded_styles[encoded_subclass_names[key]] = decode_style(code.slice(3, 7))
					break
				}
			}

			for (subclass_text in used_class_names[class_text]) {
				let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
				if (decoded_styles[subclass_name]) {
					old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
					if (old_style_tag) head.removeChild(old_style_tag)
					create_class(class_name+'-'+subclass_name, decoded_styles[subclass_name])
				}
				else {
					old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
					if (old_style_tag) old_style_tag.innerHTML  = `.${class_name+'-'+subclass_name} { }`
				}
			}
		}
		else {
			for (subclass_text in used_class_names[class_text]) {
				let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
				old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
				if (old_style_tag) old_style_tag.innerHTML  = `.${class_name+'-'+subclass_name} { }`
			}
		}
	}
 
	used_class_names = create_used_class_names()
 
	genEditOrder()
	if (current_filter_list) genFilterList(current_filter_list)
}

let encoded_subclass_names = {}
function encode_all_subclass_names (force = false) {
	if (!force && Object.values(encoded_subclass_names).length != 0) return;
	encoded_subclass_names = {}

	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
			encoded_subclass_names[encode_subclass_name(subclass_name)] = subclass_name
		}
	}
}



//============================================================ import and export

function fill_export_panel () {
	let table = document.getElementById('export_panel-table')
	table.querySelector('tbody').remove()
	let tbody = document.createElement('tbody')
	table.appendChild(tbody)

	document.getElementById('export_textarea').classList.add('hidden')
	
	for (key in all_REs) {
		let tr = document.createElement('tr')
		tr.setAttribute('id', 'export_tr_' + key)

		tr.innerHTML += `
			<td>
				<input type='checkbox' checked name='export_key-${key}' onchange='export_switch_class("${key}")'>
				<label for='export_key-${key}'>${all_REs[key][0]}</label>
			</td>
			<td>
			</td>
		`

		let subclass_names = used_class_names[all_REs[key][0]]

		let loaded = readCookie(key)

		if (loaded) {
			let td = tr.children[1]
			let parsed = loaded.split('|')

			encode_all_subclass_names()
			
			for (parsed_style of parsed) {
				let subclass_name = ''
				if (parsed_style.length != 7) parsed_style = try_debug(parsed_style)

				for (skey in encoded_subclass_names) if (parsed_style.slice(0, 3) == skey) {
					let ans = encoded_subclass_names[skey]

					for (subclass_text in subclass_names) {
						if (subclass_names[subclass_text] == key + '-' + ans) {
							subclass_name = subclass_text
							break
						}
					}
					break
				}

				let div = document.createElement('div')
				div.classList.add('export_elem')
				div.classList.add('ee_selected')
				div.setAttribute('export_value', parsed_style)
				div.setAttribute('onclick', 'export_switch_elem(this)')
				div.innerText = subclass_name
				td.appendChild(div)
			}
		}

		tbody.appendChild(tr)
	}
}

function export_switch_class (key) {
	let tr = document.getElementById('export_panel-table').querySelector('tbody > tr#export_tr_' + key)
	tr.style.opacity = tr.children[0].children[0].checked? '1' : '.3'
}

function export_switch_elem (elem) {
	if (!elem.innerText) {
		for (div of elem.parentElement.children) {
			if (!div.innerText) div.classList.toggle('ee_selected')
		}
	}
	else elem.classList.toggle('ee_selected')
}

function export_filters () {
	let tbody = document.getElementById('export_panel-table').querySelector('tbody')

	let export_string = ''

	for (tr of tbody.children) {
		if (tr.querySelector('td:first-child > input').checked) {

			export_string += '!' + tr.id.replace('export_tr_', '') + ':'

			let td = tr.querySelector('td:last-child')
			let export_values = []
			for (div of td.children) {
				if (div.classList.contains('ee_selected')) {
					export_values.push(div.getAttribute('export_value'))
				}
			}
			export_string += export_values.join('|')
		}
	}

	let eta = document.getElementById('export_textarea')
	eta.value = export_string
	eta.classList.remove('hidden')

	send_action('Экспорт фильтров')

	return export_string
}

function safe_export () {
	let export_string = export_filters()
	let new_export_string = '666SAFE'

	let convert = true

	for (char of export_string) {
		switch (char) {
			case '!':
				new_export_string += '888'
				convert = false
				break

			case ':':
				new_export_string += '999'
				convert = true
				break

			case '|':
				new_export_string += '777'
				break

			case '_':
				new_export_string += '_'
				break

			default:
				if (convert) {
					new_export_string += convert_sys_to_10(char).toString().padStart(3, '0')
				}
				else new_export_string += char
				break
		}
	}

	let export_url = new URL(document.location)
	export_url.search = 'import=' + new_export_string

	let eta = document.getElementById('export_textarea')
	eta.value = export_url.toString()
	eta.classList.remove('hidden')

	return new_export_string
}

function import_filters (clear_before = false) {
	if (clear_before) {
		set_clear_styles()
		save_settings()
	}
	read_exported_filters(document.getElementById('import_textarea').value)
}

function read_exported_filters (code, to_base_page = false) {
	if (code.startsWith('http')) document.location = code
	if (code.startsWith('666SAFE')) code = safe_to_usual_decode (code)

	for (let cookie of code.split('!')) {
		if (!cookie) continue
		let parsed = cookie.split(':')
		createCookie(parsed[0], parsed[1], 180)
	}

	send_action('Импорт фильтров')
	if (to_base_page) document.location.search = ''
	else document.location.reload()
}

function safe_to_usual_decode (code) {
	code = code.replace('666SAFE', '')
			   .replaceAll('888', '!')
			   .replaceAll('999', ':')
			   .replaceAll('777', '|')

	for (let matched of code.matchAll(/\d\d\d/g)) {
		code = code.replace(matched[0], convert_10_to_sys(matched[0]))
	}

	return code
}
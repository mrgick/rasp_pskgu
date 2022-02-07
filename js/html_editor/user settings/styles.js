/*creating styles for classes and subclasses in table*/

function create_class (class_name, ...style_content) {
	let style = document.createElement('style')
	style.setAttribute('type', 'text/css')
	style.setAttribute('id', 'style_'+class_name)
	if (style_content[0][0] == '{') style.innerHTML = `.${class_name} ${style_content[0]}`
	else style.innerHTML = `.${class_name} { ${style_content.join('; ')}; }`
	document.getElementsByTagName('head')[0].appendChild(style)
}

function generate_css_classes () {
	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			let style_content = []
			for (attrib in base_styles[MODE]) style_content.push(attrib + ': ' + base_styles[MODE][attrib])
			create_class(used_class_names[class_text][subclass_text],
						 ...style_content)
		}
	}
	for (cl_name in base_text_styles) {
		for (scl_name in base_text_styles[cl_name]) {
			for (attrib in base_text_styles[cl_name][scl_name]) {
				set_css_attribute(attrib, base_text_styles[cl_name][scl_name][attrib], cl_name+'-'+scl_name)
			}
		}
	}
	load_settings()
}

const base_styles = {'light':{
							  'background-color':'#ffffff',
							  'color'           :'#000000',
							  'border'          :'0px solid #000000',
							  'font-style'      :'normal',   // normal | italic
					  		  'font-weight'     :'normal',   // normal | bold
							  'text-decoration' :'none'},    // none | line-through | underline
					 'dark': {
							  'background-color':'#000000', // 333366 ?
							  'color'           :'#ffffff',
							  'border'          :'0px solid #000000',
							  'font-style'      :'normal',   // normal | italic
							  'font-weight'     :'normal',   // normal | bold
							  'text-decoration' :'none'}     // none | line-through | underline
							  //'border-color'    :'#000000',
							  //'border-width'    :'0px',
					}

let base_style_classes = {}
for (base_style in base_styles) {
	base_style_classes[base_style] = document.createElement('style')

	let style_content = []
	for (attrib in base_styles[base_style]) style_content.push(attrib+': '+base_styles[base_style][attrib])

	base_style_classes[base_style].innerText = `.base_style_class_${base_style} { ${style_content.join('; ')};}`
	base_style_classes[base_style].setAttribute('id', 'base_style_class_'+base_style)
}

const base_text_styles = {'lesson_type': {
					'test'    : {'background-color': '#FFCCFF', 'border':'0px solid #CCCCCC'},
					'test_2'  : {'background-color': '#FFCCFF', 'border':'0px solid #CCCCCC'},
					'cons'    : {'background-color': '#FFCC99', 'border':'0px solid #CCCCCC'},
					'exam'    : {'background-color': '#FFCCCC', 'border':'0px solid #CCCCCC'},
					'practice': {'background-color': '#CCCCFF', 'border':'0px solid #CCCCCC'},
					'lab'     : {'background-color': '#CCFFFF', 'border':'0px solid #CCCCCC'},
					'lecture' : {'background-color': '#CCFFCC', 'border':'0px solid #CCCCCC'},
}}

function check_is_base (style_tag, mode = null) {
	if (!mode) mode = MODE
	for (attrib in base_styles[mode]) {
		if (get_css_attribute(attrib, base_style_classes[mode]) != (get_css_attribute(attrib, style_tag))) return false
	}
	return true
}

function update_base_styles (was, became) {
	for (class_text in used_class_names) {
		for (subclass_text in used_class_names[class_text]) {
			let full_class_name = used_class_names[class_text][subclass_text]
			let style_tag = document.getElementById('style_'+full_class_name)

			if (check_is_base(style_tag, was)) {
				set_css_attribute('background-color', base_styles[became]['background-color'], style_tag)
				set_css_attribute('color', base_styles[became]['color'], style_tag)
				set_css_attribute('border', base_styles[became]['border'], style_tag)
				set_css_attribute('font-style', base_styles[became]['font-style'], style_tag)
				set_css_attribute('font-weight', base_styles[became]['font-weight'], style_tag)
				set_css_attribute('text-decoration', base_styles[became]['text-decoration'], style_tag)
			}
		}
	}
}

/*
Format of storing in cookies 
'class-subclass'='text colour|bg colour|border colour|font styles and border'

JSON.stringify(a) - smth to str (with brackets and other)
eval(a) - from str to smth
*/

function compact_colour (hex_colour) {
	if (hex_colour[0] == '#') hex_colour = hex_colour.slice(1)
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
    for (i in chars) {
        s1 += ch.indexOf(chars[i])*Math.pow(2, i)
        s2 += ch.indexOf(chars[i])
	}
 
	t = (bin(s1).padEnd(13,'0') + bin(s2).padEnd(8,'0') + bin(cnt_of_vowels).padEnd(3,'0'))
    return convert_from_to(t, 2, 256)
}

function encode_style (style_tag) {
	let value = result = ''
	value = get_css_attribute('background-color', style_tag)
	result += compact_colour(value)
	value = get_css_attribute('color'           , style_tag)
	result += compact_colour(value)
	value = get_css_attribute('border-color'    , style_tag)
	result += compact_colour(value)

	value = ''
	value += get_css_attribute('font-style' , style_tag) == 'italic'? 'T' : 'F'
	value += get_css_attribute('font-weight', style_tag) == 'bold'? 'T' : 'F'
	switch(get_css_attribute('text-decoration', style_tag)) {
		case '':
		case 'none':
			value += 'FF'
			break

		case 'line-through':
			value += 'FT'
			break

		case 'underline':
			value += 'TF'
			break

		case 'line-through underline':
		case 'underline line-through':
			value += 'TT'
			break
	}
	value += (get_css_attribute('border-width', style_tag) == '1px'? 'T' : 'F')
	value = convert_sys_to_10(value.replaceAll('T', '1').replaceAll('F', '0'), 2)
	result += convert_10_to_sys(value+1)

	return result
}

function save_settings () {
	for (class_text in used_class_names) {
		if (Object.keys(used_class_names[class_text]).length == 0) continue
		let class_name = used_class_names[class_text][Object.keys(used_class_names[class_text])[0]].split('-')[0]
		let encoded_str = ''

		for (subclass_text in used_class_names[class_text]) {
			let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
			let style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)

			if (!check_is_base(style_tag)) {
				encoded_str += encode_subclass_name(subclass_name) + encode_style(style_tag)
			}
		}
		//console.log(class_name, encoded_str)
		if (encoded_str != '') {
			let loaded_cookie = readCookie(class_name)
			if (loaded_cookie) { // if already exists
				for (let i = 0; i < encoded_str.length; i += 7) { // for each encoded class
					let index = loaded_cookie.indexOf(encoded_str.slice(i, i+3))
					if (index !== -1) { // if setting already exists - replace
						loaded_cookie = loaded_cookie.replace(loaded_cookie.slice(index+3, index+7), encoded_str.slice(i+3, i+7))
					}
					else { // if new setting
						loaded_cookie += encoded_str.slice(i, i+7)
					}
				}
				createCookie(class_name, loaded_cookie, 180)
			}
			else createCookie(class_name, encoded_str, 180)
		}
	}
}

function unpack_colour (symbol) {
	symbol = convert_sys_to_10(symbol)-1
	symbol = ('#' + convert_10_to_sys((Math.floor(symbol/36)%6)*51, 16).padEnd(2, '0') + 
			        convert_10_to_sys((Math.floor(symbol/6 )%6)*51, 16).padEnd(2, '0') + 
			        convert_10_to_sys((Math.floor(symbol/1 )%6)*51, 16).padEnd(2, '0'))
	return symbol
}

function decode_style (str) {
	let style_content = []
	style_content.push('background-color: '+unpack_colour(str[0]))
	style_content.push('color: '           +unpack_colour(str[1]))

	let value = convert_10_to_sys(convert_sys_to_10(str[3])-1, 2)

	style_content.push(`border: ${value[4] == '1'? '1' : '0'}px solid ${unpack_colour(str[2])}`)

	style_content.push('font-style: '      + (value[0] == '1'? 'italic'      : 'normal'))
	style_content.push('font-weight: '     + (value[1] == '1'? 'bold'        : 'normal')) 
	style_content.push('text-decoration: ' + (value[2] == '1'? 'underline '  : ''      )
			                       + (value[3] == '1'? 'line-through': ''      ))

	if (style_content[style_content.length-1] == 'text-decoration: ') {
		style_content[style_content.length-1] += 'none'

	//console.log(`{ ${style_content.join('; ')}; }`)
	return `{ ${style_content.join('; ')}; }`
}

function load_settings () {
	let head = document.getElementsByTagName('head')[0]

	for (class_text in used_class_names) {
		if (Object.keys(used_class_names[class_text]).length == 0) continue
		let class_name = used_class_names[class_text][Object.keys(used_class_names[class_text])[0]].split('-')[0]
		let loaded_cookie = readCookie(class_name)
		if (loaded_cookie) {
			let encoded_subclass_names = {}
			
			for (subclass_text in used_class_names[class_text]) {
				let subclass_name = used_class_names[class_text][subclass_text].split('-')[1]
				encoded_subclass_names[encode_subclass_name(subclass_name)] = subclass_name
			}

			let decoded_styles = {}
			for (key in encoded_subclass_names) {
				let index = loaded_cookie.indexOf(key)
				if (index !== -1) {
					decoded_styles[encoded_subclass_names[key]] = decode_style(loaded_cookie.slice(index+3, index+7))
				}
			}

			for (subclass_name in decoded_styles) {
				old_style_tag = document.getElementById('style_'+class_name+'-'+subclass_name)
				if (old_style_tag) head.removeChild(old_style_tag)
				create_class(class_name+'-'+subclass_name, decoded_styles[subclass_name])
			}
		}
	}
}

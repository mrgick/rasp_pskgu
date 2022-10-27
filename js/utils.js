/* Дополнительные утилиты*/

function find_substr_in_array_of_str(arr, sub) {
    sub = sub.toLowerCase()
    found = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase().indexOf(sub) != -1) {
            found.push(arr[i])
        }
    }
    found.sort()
    return found
}

const sys_256 = '0123456789'+ // 10
                'abcdefghij'+ // 20
                'klmnopqrst'+ // 30
                'uvwxyzABCD'+ // 40
                'EFGHIJKLMN'+ // 50
                'OPQRSTUVWX'+ // 60
                'YZабвгдеёж'+ // 70
                'зийклмнопр'+ // 80
                'стуфхцчшщъ'+ // 90
                'ыьэюяАБВГД'+ // 100
                'ЕЁЖЗИЙКЛМН'+ // 110
                'ОПРСТУФХЦЧ'+ // 120
                'ШЩЪЫЬЭЮЯ' +  // 128
                'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß'+ // 160
                'àáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'+ // 192
                'ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğ'+ // 224   Ę - 216
                'ĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿ'  // 256

function convert_10_to_sys (num, system = 256) {
    if (num == 0) return '0'
    let result = ''
    while (num > 0) {
        result = sys_256[num%system] + result
        num = Math.floor(num/system)
    }
    return result 
}

function convert_sys_to_10 (num, system = 256) {
    let result = 0
    for (let i = 0; i < num.length; i++) result = result*system + sys_256.indexOf(num[i])

    return result 
}

function convert_from_to (value, from, to) {
    return convert_10_to_sys(convert_sys_to_10(value, from), to)
}

function bin (value) {return convert_10_to_sys(value, 2 )}
function hex (value) {return convert_10_to_sys(value, 16)}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function get_current_page () {
    let url = new URL(document.location.href)
    if      (url.searchParams.has('group_name')      ) return 'rasp'
    else if (url.searchParams.has('print_group_name')) return 'print'
    else if (url.searchParams.has('find_group_name') ) return 'search'
    else if (url.searchParams.has('list')            ) return 'list'
    else return 'main'
}

function get_rasp_element_from (day_or_lesson, id, elem, return_existence = false) {
    elem = adapt_for_html(elem)
    let result = {}

    switch (day_or_lesson) {
        case 'day':
            if (typeof id != 'string') id = id.children[0].getAttribute('id')
            for (let day = 1; day <= 7; day++) {
                let lesson = document.getElementById(id + '-' + day)

                for (let i = 0; i < lesson.childElementCount; i++) {
                    let block = lesson.children[i]
                    
                    for (let i2 = 0; i2 < block.childElementCount; i2++) {
                        let class_name = block.children[i2].getAttribute('class').split(' ')[1]
    
                        if (class_name.split('-')[0] == elem || 
                            class_name.split('-')[1] == elem || 
                            class_name == elem) {
                                if (!result[id + '-' + day]) result[id + '-' + day] = {}
                                if (!result[id + '-' + day]['block_' + i]) result[id + '-' + day]['block_' + i] = [class_name]
                                else result[id + '-' + day]['block_' + i].push(class_name)
                            }
                    }
                }
            }
            if (return_existence) return (Object.keys(result[id]).length > 0? true : false)
            else return result

        case 'lesson':
            if (typeof id != 'string') id = id.getAttribute('id')
            result[id] = {}
            let lesson = document.getElementById(id)

            for (let i = 0; i < lesson.childElementCount; i++) {
                let block = lesson.children[i]
                
                for (let i2 = 0; i2 < block.childElementCount; i2++) {
                    let class_name = block.children[i2].getAttribute('class').split(' ')[1]

                    if (class_name.split('-')[0] == elem || 
                        class_name.split('-')[1] == elem || 
                        class_name == elem) {
                            if (!result[id]['block_' + i]) result[id]['block_' + i] = [class_name]
                            else result[id]['block_' + i].push(class_name)
                        }
                }
            }
            if (return_existence) return (Object.keys(result[id]).length > 0? true : false)
            else return result
    }
}

function open_url (url, as_new_page = false, without_confirm = true) {
    if (as_new_page && (without_confirm || confirm('Открыть ' + url + ' в отдельной вкладке?'))) {
        window.open(url, '_blank');
    }
    else if (without_confirm || confirm('Открыть ' + url + ' в этой вкладке?')) {   
        document.location.href = url 
    }
}

function open_url_evented (url, event, without_confirm = true) {
    if (event.ctrlKey && (without_confirm || confirm('Открыть ' + url + ' в отдельной вкладке?'))) {
        window.open(url, '_blank');
    }
    else if (without_confirm || confirm('Открыть ' + url + ' в этой вкладке?')) {   
        document.location.href = url 
    }
}

function decode_win1251 (s) {
    var win1251 = new TextDecoder("windows-1251"),
    s = 
    s = s.replace(/(?:%[0-9A-F]{2})+/g,
    s => win1251.decode(new Uint8Array(
    s.replace(/%/g, ",0x").slice(1).split(",")
    )))
    return s
}

function componentToHex (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgb_to_hex (r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hex_to_rgb (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function merge_clrs (clr_1, clr_2, ratio = '1:1', to = 'hex') {
    if (typeof clr_1 == 'string') clr_1 = hex_to_rgb(clr_1)
    if (typeof clr_2 == 'string') clr_2 = hex_to_rgb(clr_2)

    try {
        ratio = ratio.split(':')
        ratio = [Number(ratio[0]), Number(ratio[1])]
    }
    catch { ratio = [1, 1] }

    let result = {'r': Math.floor((clr_1['r']*ratio[0] + clr_2['r']*ratio[1]) / (ratio[0] + ratio[1])),
                  'g': Math.floor((clr_1['g']*ratio[0] + clr_2['g']*ratio[1]) / (ratio[0] + ratio[1])),
                  'b': Math.floor((clr_1['b']*ratio[0] + clr_2['b']*ratio[1]) / (ratio[0] + ratio[1])),
    }

    switch (to) {
        case 'hex': return rgb_to_hex(result['r'], result['g'], result['b'])
        case 'rgb_arr': return [result['r'], result['g'], result['b']]
        
        case 'rgb': 
        default:
            return result
    }
}

function copy_to_CB (text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try { document.execCommand('copy')} catch {}

    document.body.removeChild(textArea);
}
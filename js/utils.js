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
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
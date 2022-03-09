let uid = 0;
let lastActive = [];
function genPossibilities(structLink, id, cid = 0)
{
    let struct = STRUCT;
    let structLinkText = '';
    let nid = id + "_";
    let length = 0;
    if (structLink != null)
    {
        structLink.forEach(element => {
            struct = struct[element];
            structLinkText += "'" + element + "',";
        });
        length = Object.keys(structLink).length;
        if (lastActive[length] && document.getElementById(`button${lastActive[length]}`)) document.getElementById(`button${lastActive[length]}`).classList.remove("possible_list__item--active");
        lastActive[length] = cid;
        document.getElementById(`button${cid}`).classList.add('possible_list__item--active');
    }
    let s = '';
    for (let i = 0; i < 5; i++)
    {
        if (document.getElementById(id+s)) document.getElementById(id+s).remove();
        s += '_';
    }
    document.getElementById('Lists').insertAdjacentHTML("beforeend",`
            <div class="possible_list" id="${id}"></div>
        `)
    if (length == 2 && Object.keys(struct)[0]=='факультет отсутствует')
    {
        struct = struct['факультет отсутствует'];
        for (var key of Object.keys(struct)) {
            document.getElementById(id).insertAdjacentHTML("beforeend",`
                <div class="possible_list__item" id="button${++uid}" onclick="genPossibilities([${structLinkText}'факультет отсутствует','${key}'], '${nid}', ${uid})">${key}</div>
            `)
        }
    }
    else
    {
        for (var key of Object.keys(struct)) {
            if (!structLink || structLink[0] != "Расписание преподавателей")
            {
                if (length == 3)
                {
                    document.getElementById(id).insertAdjacentHTML("beforeend",`
                        <a class="possible_list__item" href="?group_name=${struct[key]}">${struct[key].replace("_", " ")}</a>
                    `)
                }
                else
                {
                    let keyname = key;
                    if (length == 2) keyname = key + " курс";
                    document.getElementById(id).insertAdjacentHTML("beforeend",`
                        <div class="possible_list__item" id="button${++uid}" onclick="genPossibilities([${structLinkText}'${key}'], '${nid}', ${uid})">${keyname}</div>
                    `)
                }
            }
            else
            {
                if (length == 4)
                {
                    document.getElementById(id).insertAdjacentHTML("beforeend",`
                        <a class="possible_list__item" href="?group_name=${struct[key]}">${struct[key].replace("_", " ")}</a>
                    `)
                }
                else
                {
                    document.getElementById(id).insertAdjacentHTML("beforeend",`
                        <div class="possible_list__item" id="button${++uid}" onclick="genPossibilities([${structLinkText}'${key}'], '${nid}', ${uid})">${key}</div>
                    `)
                }
            }
        } 
    }
}

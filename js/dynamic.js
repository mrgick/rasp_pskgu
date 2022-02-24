function Switch(id)
{
    document.getElementById(`${id}`).classList.toggle(`${id.toLowerCase()}--hidden`);
    return false;
}

function editbarOpen()
{
    document.getElementById("Editbar").classList.remove("editbar--hidden");
    genEditOrder();
    return false;
}

function editbarClose()
{
    if (there_are_changes) {
        if (confirm('Вы не применили последние изменения и при следующей перезагрузке страницы они будут утеряны. Применить сейчас?')) {
            save_settings()
            there_are_changes = false
        }
    }
    document.getElementById("Editbar").classList.add("editbar--hidden");
    document.getElementById("Filterbar").classList.add("filterbar--hidden");
    return false;
}

function filterbarShow(listName)
{
    document.getElementById("Filterbar").classList.remove("filterbar--hidden");
    genFilterList(listName);
    return false;
}

function filterbarClose()
{
    document.getElementById("Filterbar").classList.add("filterbar--hidden");
    return false;
}

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
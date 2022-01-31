function generate_main_page()
{
    document.getElementById("MAIN").innerHTML=`
    <h1 class="title">Расписание<br>ПсковГУ</h1>
    <div class="search" id="Search_Group">
        <form class="search-form">
            <input class="search-form-input" name="find_group_name" type="search" placeholder="группа/преподаватель" />
            <button class="search-form-button" type="submit">Поиск</button>
        </form>
    </div>
    `
}

function generate_search_page()
{
    document.getElementById("MAIN").innerHTML=`
    <header class="header">
        <h1 class="title title--top">Расписание<br>ПсковГУ</h1>
        <div class="search search--top" id="Search_Group">
            <form class="search-form">
                <input class="search-form-input" name="find_group_name" type="search" placeholder="группа/преподаватель" />
                <button class="search-form-button" type="submit">Поиск</button>
            </form>
        </div>
    </header>
    <div class="groups" id="Groups_List">
    </div>
    `
}

function generate_rasp_page()
{
    document.getElementById("MAIN").innerHTML=`
    <header class="header">
        <h1 class="title title--top">Расписание<br>ПсковГУ</h1>
        <div class="header-main">
            <h2 class="group_name" id="Group_Name"></h2>
            <a class="header-main-back" href="#">Назад</a>
        </div>
    </header>
    <container>
        <div id="Group_Rasp">
        </div>
    </container>
    `
}
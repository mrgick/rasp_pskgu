/* File for filters, consts and other for table_data_constraction.js */

/* 
Here's a dict of classes that contains dicts of sub-classes 
that (finally) contains list of regexps to recognize that 
some part of text belongs to definite class and sub-class.

If sub-class name includes '!' at the begining, than
name will not be const like the others. So, it will
depend of result. 
See 'special_class_name' function for more information.

If there's an 'ignore' instead of list, checking will be 
skipped for current class. Should be used only for
'lesson' class type, because it also sets index for
uncuted part of text to be inserted in.
*/                                  //VVV type VVV
const all_REs =     {'lesson_type': ['Тип занятия', {//VVV subtype VVV
                                      'lecture'   :['Лекция'         , [/( |^)л\. /i,   ]],
                                      'practice'  :['Практика'       , [/пр\. /i        ]],
                                      'lab'       :['Лабораторная'   , [/лаб\.? /i      ]],
                                      'test'      :['Зачёт'          , [/зач\.? /i      ]],
                                      'cons'      :['Консультация'   , [/конс\.? /i     ]],
                                      'exam'      :['Экзамен'        , [/экз\. /i       ]],
                                      'volkswagen':['Физвоспитание'  , [/фв/i           ]],
                                      'test_2'    :['Зачёт с оценкой', [/Зач?О/i, /ЗчО/i]],
                                    }],
                        'subgroup': ['Подгруппа', {
                                      '!get_digit':['!convert', [/\(?\d* ?п\/г\S* ?\d*\)?/i]],
                                    }],
                            'room': ['Место проведения', {
                                      '!R|online'        :['!Slice2', [/о-?о?нлайн ?\([a-z0-9 ил]*\)/i                                ]],
                                      'online'           :['Онлайн' , [/о-?о?нлайн\d*/i                                               ]],
                                      '!result|< |S-1'   :['!Slice1', [/(^|[ ЛсС])[тКСПЗ12348]-\d\d*( ?[а-дА-Д]|"[а-дА-Д]"| ?\(\d\))?/]],
                                      '!R|online|1'      :['Онлайн' , [/\S\S?-?\S?нлайн( ?\(.*\)|\d*)/i                               ]], // debug
                                      'DLS'              :['СДО'    , [/СДО\d? ПсковГУ/i                                              ]],
                                      '!result|i1'       :['!result', [/event\d*@pskgu\.ru/i                                          ]],
                                      'Л2'               :['!Slice1', [/Л2-(СЗ|цифровой парк( \d уровень)?)/i                         ]],
                                      'С'                :['!Slice1', [/(С|К)-СЗ/i                                                    ]],
                                      '!result|i2'       :['!result', [/ПОКБ\d?/i                         , // debug
                                                                       /Я\.Фабрициуса,\s?\d-\d+/i         ,
                                                                       /О-BigBlueButton\d*/i              ,
                                                                       /О-Pruffme\d*/i                    ,
                                                                       /О-Яндекс\.Телемост\d*/i           ,
                                                                       /ПОИБ\d?/i                         ,
                                                                       /Сим\.центр\d?/i                   ,
                                                                       /лаборатория\d?/i                  ,
                                                                       /Мастерские\d?/i                   ,
                                                                       /СЦ/i                              ,
                                                                       /Школьная,\s?26/i                  ,
                                                                       /Кузнецкая,\s?23/i                 ,
                                                                       /Ленина,\d*/i                      ,
                                                                       /Риж\.(пр\.)?16,ауд\.\d*/i         ,
                                                                       /ПГБ\(КДО\) Коммунальная ул\., 23/i,
                                                                       /ПГБ($| )/i                        ,
                                                                       /Псковская Городская Больница/i    ,
                                                                       /ЦЛП,Бастионная,\d/i               ,
                                                                       /Балтийская,\d/i                   ,
                                                                       /Райниса,58/i                      ,
                                                                       /Экскурсия в архив/i               ,
                                                                       /Экскурсия/i                       ,
                                                                       /Корр ОУ/i                         ,
                                                                       /Некр\.\d*/i                       ,
                                                                       /Ф-\d*-\d*(a|а)?/i                 ,
                                                                       /LMS Moodle/i                      ,
                                                                       /Медико-реабилитационный центр ПсковГУ, ул. Розы Люксембург, д.6б/i]],
                                    }],
                           'group': ['Группа', {
                                      '!result|C':['!result', [/\d{4}-\d{2}(\(|\)|[а-яА-Я0-9])*(\s|,|$)/]],
                                      '!result'  :['!result', [/Иностр\.студенты\([А-Я, ]*\)/i, // debug
                                                               /Начальный 1 к\./i             ,
                                                               /Начальный к\./i               ]],
                                    }],
                         'teacher': ['Преподаватель', {
                                      '!result|< 32':['!result', [/(\(тёзка\) )?[А-Я]\.\s?[А-Я]\.?/i    ]],
                                      '!result|< 33':['!result', [/[А-Я][А-Я]?\..?[А-Я][А-Я]?\./i       ]], // debug
                                      '!result'     :['!result', [/0001_преподаватель/i                 , // debug
                                                                  /Вакансия\d? \d\.\d\. \(каф\. ?\d*\)/i,  
                                                                  /Сетевая\s?(\d\.)+/i                  ,
                                                                  /Работадатель\s?(\d\.)+/i             ]],
                                    }],
                          'lesson': ['Предмет', {'ignore':['ignore', 'ignore']}],
}
/*
Fantastic cases and where to find them:
===================== subgroups =====================
п/г 3, п/г 4       - Дроздов_С.В.
1 п/гр [in lesson] - Михайлова_И.М.
======================= rooms =======================
л2-СЗ                         - 0273-03
Л2-Цифровой парк 2 уровень    - 0411-06
С-СЗ                          - Рубенкова_Л.А.
2-20'Б'                       - Павлова_Е.В.
Л8-204(3)                     - Перминов_А.Л.
Л8-204 (3)                    - Хитров_А.А.
4 корпус                      - Ворожцов_О.В.
Корр ОУ                       - Виноградова_Е.А.
Сим.центр, СЦ                 - Иванова_Н.В.
ПГБ                           - Корнилов_А.В.
ПГБ(КДО) Коммунальная ул., 23 - Соловьев_С.В.
СДО1 ПСКОВГУ                  - Логунов_Г.В.
Ленина,3                      - Каленчук_Г.Ю.
Райниса,58                    - Сукманов_В.В.
Балтийская,5                  - Светенко_Т.В.
ЦЛП,Бастионная,6              - Науменко_Е.В.
Риж.пр.16,ауд.220             - Колпаков_В.Ю.
Экскурсия                     - Германова_О.Е.
Экскурсия в архив             - Исакова_Н.И.
Медико-реабилитационный центр ПсковГУ, ул. Розы Люксембург, д.6б - Рагозина_Н.П.
*/

// Orders of placement of divs
let base_global_placement = ['lesson_type', 'lesson', 'teacher', 'group', 'subgroup', 'room']
let group_excepts   = ['group'  ]
let teacher_excepts = ['teacher']

// What must to be deleted from final lesson text
const delete_from_lesson = [/п\/гр? ?[1-4]/ig]

// If text contains several lessons, it will be divided by these regexps
const group_block_seps = [/лайн\d* /ig, 
                          /(^|[ ЛсС])[тКСПЗ12348]-\d\d*( ?[а-дА-Д]|"[а-дА-Д]"| ?\(\d\))?/ig, 
                          /event\d*@pskgu\.ru/ig, 
                          /СДО\d? ПсковГУ/ig,
                          /ПОКБ\d?/ig,
                          /Корр ОУ/ig,
                          /лаборатория\d?/ig,
                          /Мастерские\d?/ig,
                          /О-BigBlueButton\d*/ig,
                          /О-Pruffme\d*/ig,
                          /О-Яндекс\.Телемост\d*/ig,
                          /Сим\.центр\d?/ig ]

// final text will be converted according to this dict
// regexps must be in quotes as string ('cause REs can't be a key of dict)
// see 'try_convert' function
const convert_result = {'|О-?нлайн\\d\\d*|i': 'Онлайн',
                        '!get_digit|\\(?\\d* ?п\\/г\\S* ?\\d*\\)?|i':'п/г D',
                        }

// see 'nearest_word_sep' function
const word_seps = [' ', '.', ',', '_']

// Symbols to be deleted at the sides of text (see 'cut_off_excess' function)
const base_excesses = [' ', '.', ',', '_']

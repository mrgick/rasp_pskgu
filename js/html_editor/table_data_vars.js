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
                                      'lecture'   :['Лекция'         , [/л\./,     ]],
                                      'practice'  :['Практика'       , [/пр\. /i   ]],
                                      'lab'       :['Лабораторная'   , [/лаб\./i   ]],
                                      'test'      :['Зачёт'          , [/зач\./i   ]],
                                      'cons'      :['Консультация'   , [/конс\./i  ]],
                                      'exam'      :['Экзамен'        , [/экз\./i   ]],
                                      'volkswagen':['Физвоспитание'  , [/фв/i      ]],
                                      'test_2'    :['Зачёт с оценкой', [/ЗаО/i     ]],
                                      '!R|lecture':['Лекция'         , [/( |^)Л\. /]],
                                    }],
                        'subgroup': ['Подгруппа', {
                                      '!pre_last':['!convert', [/\(п\/г ?[1-4]\)/]],
                                    }],
                            'room': ['Место проведения', {
                                      '!R|online'        :['!Slice2', [/о-?нлайн ?\([a-z0-9 ил]*\)/i                  ]],
                                      'online'           :['Онлайн' , [/о-?нлайн\d*/i                                 ]],
                                      '!result|< |S-1'   :['!Slice1', [/(^|[ ЛсС])[тКСПЗ12348]-\d\d*[а-в]?( ?\(\d\))?/]],
                                      '!R|online|1'      :['Онлайн' , [/\S\S?-?\S?нлайн( ?\(.*\)|\d*)/i               ]], // debug
                                      'DLS'              :['СДО'    , [/СДО\d? ПсковГУ/i                              ]],
                                      '!result|i1'       :['!result', [/event\d*@pskgu\.ru/i                          ]],
                                      'Л2'               :['!Slice1', [/Л2-(СЗ|цифровой парк( \d уровень)?)/i                       ]],
                                      'С'                :['!Slice1', [/С-СЗ/i                                        ]],
                                      '!result|< |S-1|i1':['!Slice1', [/(^|[ ЛсС])[тКСПЗ12348]-(\d\d*(["']?[а-в]?["']?| ?\(\d\)))/i]], // debug
                                      '!result|i2'       :['!result', [/ПОКБ\d?/i                     , // debug
                                                                       /Сим\.центр\d?/i               ,
                                                                       /лаборатория\d?/i              ,
                                                                       /Мастерские\d?/i               ,
                                                                       /СЦ/i                          ,
                                                                       /Ленина,\d*/i                  ,
                                                                       /Риж\.(пр\.)?16,ауд\.\d*/i     ,
                                                                       /ПГБ/i                         ,
                                                                       /Псковская Городская Больница/i,
                                                                       /ЦЛП,Бастионная,\d/i           ,
                                                                       /Балтийская,\d/i               ,
                                                                       /Райниса,58/i                  ,
                                                                       /Корр ОУ/i                     ]],
                                    }],
                           'group': ['Группа', {
                                      '!result|C':['!result', [/\d{4}-\d{2}\S*(\s|,|$)/]],
                                      '!result'  :['!result', [/Иностр\.студенты\([А-Я, ]*\)/i, // debug
                                                               /Начальный 1 к\./i             ,
                                                               /Начальный к\./i               ]],
                                    }],
                         'teacher': ['Преподаватель', {
                                      '!result|< 32':['!result', [/[А-Я]\.\s?[А-Я]\./i           ]],
                                      '!result|< 33':['!result', [/[А-Я][А-Я]?\..?[А-Я][А-Я]?\./i]], // debug
                                      '!result'     :['!result', [/0001_преподаватель/i          ]], // debug
                                    }],
                          'lesson': ['Предмет', {'ignore':['ignore', 'ignore']}],
}
/*
Fantastic cases and where to find them:
л2-СЗ - 0273-03
4 корпус - Ворожцов_О.В.
Корр ОУ - Виноградова_Е.А.
Сим.центр, СЦ - Иванова_Н.В.
Ленина,3 - Каленчук_Г.Ю.
Риж.пр.16,ауд.220 - Колпаков_В.Ю.
ПГБ - Корнилов_А.В.
СДО1 ПСКОВГУ - Логунов_Г.В.
ЦЛП,Бастионная,6 - Науменко_Е.В.
2-20'Б' - Павлова_Е.В.
Л8-204(3) - Перминов_А.Л.
Л8-204 (3) - Хитров_А.А.
Балтийская,5 - Светенко_Т.В.
С-СЗ - Рубенкова_Л.А.
Райниса,58 - Сукманов_В.В.
Л2-Цифровой парк 2 уровень - 0411-06
*/

// Orders of placement of divs
let group_sequence   = ['lesson_type', 'lesson', 'teacher', 'subgroup', 'room']
let teacher_sequence = ['lesson_type', 'lesson', 'group'  , 'subgroup', 'room']

// What must to be deleted from final lesson text
const delete_from_lesson = [/п\/гр? ?[1-4]/ig]

// If text contains several lessons, it will be divided by these regexps
const group_block_seps = [/лайн\d*/ig, /(^|[ ЛсС])[тКСПЗ12348]-(СЗ|\d\d*[а-в]?)/g, /event\d*@pskgu\.ru/ig]

// final text will be converted according to this dict
// regexps must be in quotes as string ('cause REs can't be a key of dict)
// see 'try_convert' function
const convert_result = {'/О-?нлайн\d\d*/i': 'Онлайн',
                        '(п/г 1)':'п/г 1',
                        '(п/г 2)':'п/г 2',
                        }

// see 'nearest_word_sep' function
const word_seps = [' ', '.', ',', '_']

// Symbols to be deleted at the sides of text (see 'cut_off_excess' function)
const base_excesses = [' ', '.', ',', '_']

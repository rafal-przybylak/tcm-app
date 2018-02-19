export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id': 'offer',
                'title': 'Oferta szkoleniowa',
                'type': 'group',
                'role':['everyone'],
                'children': [
                    {
                        'id': 'course',
                        'title': 'Szkolenia',
                        'type': 'item',
                        'icon': 'today',
                        'url': '/courses',
                        // 'badge': {
                        //     'title': 25,
                        //     'bg': '#F44336',
                        //     'fg': '#FFFFFF'
                        // }
                    }
                ]
            }, {
                'id': 'offer',
                'title': 'Szkolenia użytkownika',
                'type': 'group',
                'role':['authenticated'],
                'children': [
                    {
                        'id': 'userCourse',
                        'title': 'Szkolenia użytkownika',
                        'type': 'item',
                        'icon': 'today',
                        'url': '/user-courses',
                    }
                    // ,
                    // {
                    //     'id': 'userExam',
                    //     'title': 'Testy',
                    //     'type': 'item',
                    //     'icon': 'assignment_turned_in',
                    //     'url': '/user-exams'
                       

                    // }
                    // {
                    //     'id': 'courseData',
                    //     'title': 'Materiały',
                    //     'type': 'item',
                    //     'icon': 'email',
                    //     'url': '/files',
                    //     'badge': {
                    //         'title': 2,
                    //         'bg': '#F44336',
                    //         'fg': '#FFFFFF'
                    //     }
                    // },
                    ]
            }, {
                'id': 'courseSettings',
                'title': 'Obsługa szkoleń',
                'type': 'group',
                'role':['administrator','trainer'],
                'children': [
                    {
                        'id': 'exam',
                        'title': 'Definicje testów',
                        'type': 'item',
                        'icon': 'assignment_turned_in',
                        'role':['administrator'],
                        'url': '/exams'
                       

                    }
                    ,
                    {
                        'id': 'courseExam',
                        'title': 'Testy szkoleń',
                        'type': 'item',
                        'icon': 'assignment_turned_in',
                        'url': '/course-exams'

                    }
                ]
            },{
                'id': 'settings',
                'title': 'Ustawienia',
                'type': 'group',
                'role':['administrator'],
                'children': [
                    
                    {
                        'id': 'user',
                        'title': 'Użytkownicy',
                        'type': 'item',
                        'icon': 'user',
                        'url': '/user'

                    }
                ]
            },{
                'id': 'import',
                'title': 'Import',
                'type': 'item',
                'role':['administrator'],
                'url': '/import'
            }
        ];
    }
}

export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id': 'offer',
                'title': 'Oferta szkoleniowa',
                'type': 'group',
                'role':'everyone',
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
                'role':'authenticated',
                'children': [
                    {
                        'id': 'userCourse',
                        'title': 'Szkolenia użytkownika',
                        'type': 'item',
                        'icon': 'today',
                        'url': '/user-courses',
                    },
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
                    {
                        'id': 'exam',
                        'title': 'Testy',
                        'type': 'item',
                        'icon': 'email',
                        'url': '/exams'
                       

                    }]
            }, {
                'id': 'settings',
                'title': 'Ustawienia',
                'type': 'group',
                'role':'administrator',
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
                'role':'administrator',
                'url': '/import'
            }
        ];
    }
}

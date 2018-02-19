export class ExamConfig {
    public static ControlOptions = [
        {
            value: "string",
            label: "Wartość tekstowa"
        }, {
            value: "string[]",
            label: "Lista wartości tekstowych"
        },
        {
            value: "text",
            label: "Pole tekstowe - wieloliniowe"
        },
        {
            value: "number",
            label: "Numer"
        },
        {
            value: "date",
            label: "Data"
        },
        {
            value: "checkboxGroup",
            label: "Opcje wielokrotnego wyboru"
        },
        {
            value: "radioGroup",
            label: "Opcje jednokrontego wyboru"
        },
        {
            value: "select",
            label: "Lista rozwijana z jednym wyborem"
        },
        {
            value: "select-multi",
            label: "Lista rozwijana z wielowyborem"
        }
    ];

    public static QuestionCategory = [
        {
            value: "Audyt",
            label: "Audyt"
        }, {
            value: "Etyka",
            label: "Etyka"
        }, {
            value: "Zarządzanie aparaturą",
            label: "Zarządzanie aparaturą"
        }
    ];
}
export enum ControlType {
    string = "string",
    string_array = "string[]",
    text = "text",
    number = "number",
    date = "date",
    checkboxGroup = "checkboxGroup",
    radioGroup = "radioGroup",
    select = "select",
    select_multi = "select-multi",
}

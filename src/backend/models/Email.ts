/* tslint:disable */

declare var Object: any;
export interface EmailInterface {
  "to": string;
  "from": string;
  "subject": string;
  "text"?: string;
  "html"?: string;
  "id"?: number;
}

export class Email implements EmailInterface {
  "to": string;
  "from": string;
  "subject": string;
  "text": string;
  "html": string;
  "id": number;
  constructor(data?: EmailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Email`.
   */
  public static getModelName() {
    return "Email";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Email for dynamic purposes.
  **/
  public static factory(data: EmailInterface): Email{
    return new Email(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Email',
      title:'',
      plural: 'Emails',
      path: 'Emails',
      idName: 'id',
      properties: {
        "to": {
          name: 'to',
          type: 'string',
          title:''
          
        },
        "from": {
          name: 'from',
          type: 'string',
          title:''
          
        },
        "subject": {
          name: 'subject',
          type: 'string',
          title:''
          
        },
        "text": {
          name: 'text',
          type: 'string',
          title:''
          
        },
        "html": {
          name: 'html',
          type: 'string',
          title:''
          
        },
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
        },
      },
      relations: {
      }
    }
  }
}

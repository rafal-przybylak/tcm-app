export class CoreConfig {
    private static adminRoles: string[] = [
        'administrator'
    ];

    private static nodePublishedOptions: any[] = [
        { title: "Publish", status: 1 },
        { title: "Unpublished", status: 0 }
    ];
    private static fileServer: string = '//31.179.176.62:3000/media/public';
    private static defaultMediaUploadPath: string = '//31.179.176.62:3000/api/media/upload';
    private static defaultMediaUploadMaxFilesize: number = 50; //50MB
    public static adminRole: string="administrator";
    public static userRole: string="user";
    public static everyoneRole: string="everyone";
    public static authenticatedRole: string="authenticated";
    public static getNodePublishedOptions(): any[] {

        return CoreConfig.nodePublishedOptions;
    }
    public static getAdminRoles(): string[] {

        return CoreConfig.adminRoles;
    }

    public static getMediaUploadPath(): string {
        return CoreConfig.defaultMediaUploadPath;
    }

    public static getDefaultMediaUploadMaxFilesize(): number {

        return CoreConfig.defaultMediaUploadMaxFilesize;
    }
    public static getFileServer(): string {
        return CoreConfig.fileServer;
    }
}
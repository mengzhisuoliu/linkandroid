declare interface Window {
    $mapi: {
        app: {
            resourcePathResolve: (filePath: string) => Promise<string>,
            extraPathResolve: (filePath: string) => Promise<string>,
            platform: () => string,
            isPlatform: (platform: 'win' | 'mac' | 'linux') => boolean,
            quit: () => Promise<void>,
            windowMin: () => Promise<void>,
            windowMax: () => Promise<void>,
            windowSetSize: (width: number, height: number) => Promise<void>,
            windowClose: (name: string) => Promise<void>,
            openExternalWeb: (url: string) => Promise<void>,
            appEnv: () => Promise<any>
        },
        config: {
            get: (key: string, defaultValue: any = null) => Promise<any>,
            set: (key: string, value: any) => Promise<void>,
            all: () => Promise<any>,
        },
        log: {
            info: (msg: string, data: any = null) => Promise<void>,
            error: (msg: string, data: any = null) => Promise<void>,
        },
        storage: {
            all: () => Promise<any>,
            get: (group: string, key: string, defaultValue: any) => Promise<any>,
            set: (group: string, key: string, value: any) => Promise<void>,
        },
        file: {
            absolutePath: (path: string) => string,
            exists: (path: string) => Promise<boolean>,
            isDirectory: (path: string) => Promise<boolean>,
            mkdir: (path: string) => Promise<void>,
            list: (path: string) => Promise<any[]>,
            listAll: (path: string) => Promise<any[]>,
            write: (path: string, data: any) => Promise<void>,
            read: (path: string) => Promise<any>,
            deletes: (path: string) => Promise<void>,
            rename: (pathOld: string, pathNew: string) => Promise<void>,
            openFile: (options: {} = {}) => Promise<any>,
            openDirectory: (options: {} = {}) => Promise<any>,
        },
        updater: {
            checkForUpdate: () => Promise<ApiResult<any>>,
        },
        statistics: {
            tick: (name: string, data: any = null) => Promise<void>,
        },
        lang: {
            writeSourceKey: (key: string) => Promise<void>,
            writeSourceKeyUse: (key: string) => Promise<void>,
        },
        event: {
            send: (name: string, type: string, data: any) => void,
            callCustom: (name: string, customType: string, data: any, option?: any) => Promise<ApiResult<any>>,
        },
        page: {
            open: (name: string, option?: any) => Promise<void>,
        },
        adb: {
            getBinPath: () => Promise<string>,
            setBinPath: (binPath: string) => Promise<boolean>,
            devices: () => Promise<any>,
            screencap: (serial: string) => Promise<string>,
            watch: (callback: (type: string, data: any) => void) => Promise<void>,
            fileList: (serial: string, filePath: string) => Promise<any>,
            filePush: (serial: string, localPath: string, devicePath: string, options?: {
                progress: Function | null
            }) => Promise<void>,
            filePull: (serial: string, devicePath: string, localPath: string, options?: {
                progress: Function | null
            }) => Promise<void>,
            fileDelete: (serial: string, devicePath: string) => Promise<void>,
            install: (serial: string, localPath: string) => Promise<void>,
            uninstall: (serial: string, packageName: string) => Promise<void>,
            listApps: (serial: string) => Promise<any[]>,
        },
        scrcpy: {
            getBinPath: () => Promise<string>,
            setBinPath: (binPath: string) => Promise<boolean>,
            mirror: (serial: string, options: {
                title: string,
                args: string,
                exec: boolean,
                option: { stdout: Function, stderr: Function }
            }) => Promise<void>,
        }
    }
}



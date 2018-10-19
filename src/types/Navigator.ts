

interface INavigator {
    go(path: string): void;

}

export default class DirectoryNavigator implements INavigator {

    private directory: Array<string>;

    public constructor(base: string) {
        this.directory = new Array<string>();
        this.directory.push(base);
    }

    public getCurrentDirectory(): string {
        return this.directory.join("/").substr(1);
    }

    jump(directoryIndex: number): Promise<string> {
        if (this.directory.length != 1) {
            this.directory.splice(directoryIndex + 1, this.directory.length - 1);
        }

        return new Promise((resolve, rejects) => {
            resolve(this.getCurrentDirectory());
        })
    }

    go(directoryName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.directory.push(directoryName);
            resolve(this.getCurrentDirectory());
        });
    }

}
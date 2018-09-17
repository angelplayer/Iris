


class RandomStyle {
    private styles: Array<string>;

    constructor() {
        this.styles = ['primary', 'info', 'danger', 'warning', 'success', 'dark', 'light']
    }


    random(): string {
        return this.styles[Math.floor(Math.random() * 6)]
    }

}
export default new RandomStyle();
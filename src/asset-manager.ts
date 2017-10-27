export class AssetManager {
    private static instance: AssetManager = undefined;

    private readonly PATH = 'assets/';
    private sources: string[] = [
        'bg.jpg',
        'enemyBlack1.png',
        'enemyBlack2.png',
        'enemyBlack3.png',
        'player_ship.png',
        'laserBlue01.png',
        'buttonRed.png',
        'cursor.png',
        'laserRed01.png',
        'shield3.png',
        'shield_bronze.png',
        'boss.png',
        'laserRed08.png',
    ];
    private map: Map<string, HTMLImageElement> = new Map();

    private isInitialized = false;

    private constructor() { }

    static getInstance(): AssetManager {
        if (AssetManager.instance === undefined) {
            AssetManager.instance = new AssetManager();
        }

        return AssetManager.instance;
    }

    preload(): void {
        if (this.isInitialized) {
            throw new Error('AssetManager has already been initialized');
        }

        this.isInitialized = true;

        this.sources.forEach(src => {
            const img = new Image();
            img.onload = () => this.map.set(src, img);
            img.onerror = () => { throw new Error(`Failed to load ${this.PATH + src}`); };
            img.src = this.PATH + src;
        });
    }

    isPreloadingDone(): boolean {
        return this.map.size === this.sources.length;
    }

    getPreloadingProgress(): number {
        return this.map.size / this.sources.length;
    }

    getAsset(src: string): HTMLImageElement {
        if (!this.isInitialized || !this.isPreloadingDone() || !this.map.has(src)) {
            throw new Error(`${src} is not loaded`);
        }

        return this.map.get(src);
    }
}
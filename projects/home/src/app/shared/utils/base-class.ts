import { Subject } from "rxjs";

//mixin function to make the base component extendable.
type Constructor<T = {}> = new (...args: any[]) => T;
export function WithDestroy<TBase extends Constructor<BaseClass>>(Base: TBase) {
    return class extends Base {
        private unsubscribe$ = new Subject<void>();
        ngOnDestroy(): void {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        }
    };
}

export class BaseClass {
    title = 'Job Application Tracker';
    constructor() { }
}



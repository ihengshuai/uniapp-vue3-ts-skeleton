/// <reference types='@dcloudio/types' />
import "vue";

declare module "@vue/runtime-core" {
  type Hooks = App.AppInstance & Page.PageInstance;

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
  interface Uni {
    $u: {
      setConfig(opts: any): void;
    };
  }
}

export {};

declare module "vue" {
  type Hooks = App.AppInstance & Page.PageInstance;
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-unused-vars
  interface ComponentCustomOptions extends Hooks {
    $u: any;
  }
}

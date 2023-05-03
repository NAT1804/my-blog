---
title: Angular version 15
description: New changes of Angular version 15
pubDate: 2023-02-23T02:34:45.498Z
heroImage:
  {
    src: "/what-s-new-in-angular-15-peerlist-cover.png",
    alt: "Banner Angular v15",
  }
tags: ["Frontend", "Reference docs"]
isDraft: false
language: 'en'
sortOrder: 2
author: Tuanna184-dev
---

Angular, the most in-demand, open-source front-end framework, finally drops in yet another version update – Angular 15. Previously, [Angular 14](https://www.mindinventory.com/blog/whats-new-in-angular-14/) introduced many new exciting experimental features and arrayed code best practices but it seems like this new roll-out Angular version 15, is all about gaining stability.

Finally, a new stable update, which we all tech enthusiasts and the Angular community were waiting for. This new update has brought massive thrilling changes. So, let’s dive into the new world of Angular 15.

## What New Features That Angular 15 Has Introduced?

In reference to other previous updates and the removal of Angular’s legacy compiler, the Angular 15 update brings many new refinements – stability and extended supportability, that definitely promises to unlock elevated developer experience and performance.

### 1. Stable Standalone Components API

The standalone components API was introduced in Angular 14 to build Angular applications without defining the`NgModules`. In Angular 15, the standalone components API finally achieves their degree of stability after thorough performance observation and amendments.

The Angular developer community has made sure that with this newly achieved stability, standalone components can work in sync with `HttpClient`, Angular Elements, and many others.

Use this standalone API to bootstrap an application in a single component. Here’s how it is done:

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { ImageGridComponent } from "./image-grid";

@Component({
  standalone: true,
  selector: "photo-gallery",
  imports: [ImageGridComponent],
  template: ` … <image-grid [images]="imageList"></image-grid> `,
})
export class PhotoGalleryComponent {
  // component logic
}

bootstrapApplication(PhotoGalleryComponent);
```

Using the `imports` function, you can even reference standalone directives and pipes.

You can now mark components, directives, and pipes as “`standalone: true`” – now, no need to declare them into NgModule, else the Angular compiler will throw an error. Additionally, you can now import NgModule directly inside the standalone component by writing `import: [module_name]`.

### 2. Enablement to Develop Multi-Route Application

Angular 15 comes with a router standalone API to build the multi-route application. Here’s how you can declare the root route:

```typescript
export const appRoutes: Routes = [
  {
    path: "lazy",
    loadChildren: () =>
      import("./lazy/lazy.routes").then((routes) => routes.lazyRoutes),
  },
];
```

Here, lazyRoutes are declared in the following way:

```typescript
import { Routes } from "@angular/router";

import { LazyComponent } from "./lazy.component";

export const lazyRoutes: Routes = [{ path: "", component: LazyComponent }];
```

You can register the `appRoutes` in the `bootstrapApplication` method and call it using the `ProvideRouter` API, which is tree-shakable!

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],
});
```

Additionally, Angular Bundlers can now remove the unused features at the build time, which can result in an 11% reduction in the code file size.

### 3. Introduction to the Directive Composition API

All developers love when their favorite framework offers top-notch reusability of directives. In the GitHub community, many [Angular developers](https://www.mindinventory.com/hire-angularjs-developers.php) were asking for this API and finally, the team heard it and made it possible.

So, Angular v15 is finally infused with that inspiration from the [feature request](https://github.com/angular/angular/issues/8785) made on GitHub. It has introduced Directive Composition API, which elevates the code usability and takes it to another level. It allows developers to boost host elements with directives and make the most of Angular with the help of the ultimate code reuse strategy. Additionally, all of this can be made possible with the help of an Angular compiler.

**NOTE:** You can only make use of the Directive Composition API with standalone directives.

```typescript
@Component({
  selector: "mat-menu",
  hostDirectives: [
    HasColor,
    {
      directive: CdkMenu,
      inputs: ["cdkMenuDisabled: disabled"],
      outputs: ["cdkMenuClosed: closed"],
    },
  ],
})
class MatMenu {}
```

As you can see above, the `MatMenu` is made effective with the help of two hostDirectives: `HasColor` and `CdkMenu`.

Because of this enhancement, `MatMenu` can reutilize all the properties from these two directives. MatMenu can be inherited with the inputs, outputs, and logic associated with the HasColor directive and only logic and input from `CdkMenu`.

It may give you a feeling like Deja Vu for the multiple inheritance concept. The difference Angular has from other programming languages is the resolution of name conflicts, and it only applies to user interface primitives.

### 4. Stable “NgOptimizedImage” Image Directive

The `NgOptimizedImage` directive was introduced in the previous version to easily adopt best practices for loading image performance. Finally, after a lengthy observation of developers, this directive has achieved a stable form.\
The latest experiment done by [Land’s End](https://www.landsend.com/) with this feature for one application has observed a 75% improvement in the LCP (Largest Contentful Paint) image loading.

![Image Directive](https://www.mindinventory.com/blog/wp-content/uploads/2022/11/image-directive-1024x500-1.webp)

Previously, this `NgOptimizedImage` was also offering many features and functionalities, but Angular v15 updates add more new exciting features in the image directive, which are as follows:

1. **Automatic `srcset` Generation:** It automatically generates srcset, which ensures to upload an appropriately sized image when requested – resulting in a reduction in the image download time.
2. **Fill Mode \[experimental]:** It eliminates the need for declaring image dimensions and fills an image to its parent container. This mode is pretty effective when the image dimensions are unknown to you or you need to migrate the CSS background image to make use of the image directive.

But the question is, “how to use this standalone NgOptimizedImage directive?”

It can be directly used in your Angular component or `NgModule`.

```typescript
import { NgOptimizedImage } from '@angular/common';

// Include it into the necessary NgModule
@NgModule({
 imports: [NgOptimizedImage],
})
class AppModule {}

// ... or a standalone Component
@Component({
 standalone: true
 imports: [NgOptimizedImage],
})
class MyStandaloneComponent {}
```

When using this Angular image directive within a component, all you need to do is replace the image `src` attribute with `ngSrc`, while ensuring to specify the priority attribute to optimize the speed for the LCP images.

### 5. Now You Can Reduce Boilerplate in Guards

Let’s understand this concept in a better way with one example of defining guards, verifying details – whether the user has logged in or not:

```typescript
@Injectable({ providedIn: "root" })
export class MyGuardWithDependency implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate() {
    return this.loginService.isLoggedIn();
  }
}

const route = {
  path: "somePath",
  canActivate: [MyGuardWithDependency],
};
```

Here, in this program, `LoginService` contains the main logic, wherein the guard – only one trigger is invoked, which is  `isLoggedIn ()`. Although having such a clear structure, this code segment has many boilerplates, which must be reduced.

Thanks to Functional Router Guards, this code can be refactored into the given-below code with the necessary boilerplates.

```typescript
const route = {
  path: "admin",
  canActivate: [() => inject(LoginService).isLoggedIn()],
};
```

The best thing about Functional Guards is that they are compostable. With its help, you can build factor-like functions, accepting a given configuration and returning a guard or function that resolves a matter.

### 6. Cleaner, Better Stack Traces

With the Angular v15 update, debugging Angular applications has been simplified and made cleaner and straightforward with stack traces. The Angular developers’ team ensured to achieve a standard to trace more of a development code than showing libraries it calls. This achievement has made it possible for the error messages to use some improvements.

Before working with the previous Angular versions, when discovering a code, developers used to get one-liner error messages, leading them to a lengthy process to solve that bug.

Below is the snippet for previous error indications:

```typescript
ERROR Error: Uncaught (in promise): Error
Error
   at app.component.ts:18:11
   at Generator.next (<anonymous>)
   at asyncGeneratorStep (asyncToGenerator.js:3:1)
   at _next (asyncToGenerator.js:25:1)
   at _ZoneDelegate.invoke (zone.js:372:26)
   at Object.onInvoke (core.mjs:26378:33)
   at _ZoneDelegate.invoke (zone.js:371:52)
   at Zone.run (zone.js:134:43)
   at zone.js:1275:36
   at _ZoneDelegate.invokeTask (zone.js:406:31)
   at resolvePromise (zone.js:1211:31)
   at zone.js:1118:17
   at zone.js:1134:33
```

The difficulty in understanding these ERROR snippets was:

1. The error message inputs were coming from third-party dependencies (Angular framework, zone.js, and RxJS)
2. No information about which user interaction encountered this bug.

After a long collaboration with the Angular and Chrome DevTool team, the community was able to integrate those third-party dependencies (with the help of node_modules, zone.js, etc.); and thus, could achieve linked stack traces.

The improvement in the stack traces are mentioned below:

```typescript
ERROR Error: Uncaught (in promise): Error
Error
   at app.component.ts:18:11
   at fetch (async)
   at (anonymous) (app.component.ts:4)
   at request (app.component.ts:4)
   at (anonymous) (app.component.ts:17)
   at submit (app.component.ts:15)
   at AppComponent_click_3_listener (app.component.html:4)
```

Now, these error messages provide information from where the error has been encountered, so developers can directly go to that code part and fix it immediately.

### 7. Stable MDC-based Components

As the stability is concerned for the Angular materials, the Angular developer team worked hard to refactor its component based on the Angular Material Design Components for the web applications. Furthermore, these components are enhanced to offer better accessibility and abidance to the Angular Material Design Specifications.

Here, most of the refactoring work has been done in the DOM and CSS parts. Following the new update on responsiveness, there will be some styles in the old Angular applications that need adjustments, especially in the case of CSS overriding internal elements of the migrated components.

In the latest Angular v15, many components’ old implementations have been deprecated. So, to recover them, developers still have the option to go for the “_legacy_” import.

For instance, you can retrieve the old `mat-button` implementation by importing its legacy button module.

```typescript
import { MatLegacyButtonModule } from "@angular/material/legacy-button";
```

### 8. CDK Listbox

CDK stands for Component Dev Kit that offers different behavior primitives, helping in building UI components. In the Angular v15, it gets a new primitive called CDK Listbox, enabling developers to customize Listbox interactions drawn up by the WAI-ARIA Listbox pattern based on requirements.

![CDK Listbox](https://www.mindinventory.com/blog/wp-content/uploads/2022/11/CDK-listbox.gif)

Here, the behavioral interactions include keyboard interactions, bidi layout support, and focus management. No matter which one of them you use, each directive comes up with associated ARIA roles with respective host elements.

### 9. Extended esbuild support

In the Angular 14 update, there was enablement to an experimental support esbuild – a faster javascript bundler, enabling quick build done with simplifying the pipeline.

The Angular 15 comes up with new experimental support for the `ng build --watch` support, Sass, SVG template, and file replacement. The command for upgrading the` angular.json` builder is:

```typescript
"builder": "@angular-devkit/build-angular:browser-esbuild"
```

### 10. Other Enhancement in Angular 15 Features

Below is the list of new enhancements and enablements made in the Angular 15, which may look small but have a heavy impact.

- **Router Now Auto-Unwarps Default Exports For Lazy Loading:** It simplifies the router functions by adding more enablement to reduce even more boilerplates. Here, for lazy loading, the router will look for the default export, and if it gets successful, it directly imports its lazy-file into the code.
- **Automatic Imports In-Language Support Service – Quick Fix:** Now, write your Angular code more confidently by making the most out of the language service. You can use this feature to automatically import components and their fixes in the template, which components are not used in a standalone component or in a NgModule.
- **Improved Angular Components:** The Angular components’ v15 covers a range of accessibility enhancements, including effective contrast ratios, expanded touch target sizes, and refined ARIA semantics. Furthermore, Angular components can have their APIs to customize their density for a better theme customization experience.

It is all about the new amendments and achievements enabled in the Angular v15, but the question is, “How will you unlock these Angular 15 capabilities?”

## How to Upgrade to Angular 15?

Before upgrading to Angular v15, you must know the support extension, cancellation, and deprecations – breaking changes, to review and refactor your existing Angular build.

- Angular v15 has extended its support for the node.js version 14.20.x, 16.13.x, and 18.10.x and terminated its support from versions including 14.\[15-19].x and 16\[10-12].x.
- Angular 15 now only supports TypeScript version 4.8 or older than that.
- In the app project directory, run the command: `ng update @angular/core@15 @angular/cli@15` to make your application fortified with Angular v15 support.
- @keyframes name format has been changed into “`@keyframes host-my-cmp_foo { ... }`“

  - To comply with this breaking change:

    - Change the component’s encapsulation view to None or ShadowDom.
    - Define this rule in the global stylesheets
    - Define this rule in your own code.

- Adding an explicit constructor to the class could trigger an error.
- From the tsconfig.json file, the `enableIvy` call has been removed as in this update, Ivy is only a rendering engine.
- The `canParse` method has been removed, so it is now compulsory to use `analyze` and `hint` parameters in the parse methods.
- `RouterOutlet` will only instantiate the component after the completion of change detection.
- The `DATE_PIPE_DEFAULT_TIMEZONE` function has been removed, so from now on, you need to use its replacement `DATE_PIPE_DEFAULT_OPTIONS` to define the time zone.
- The `routerLinkWithHref` directive has been removed, so from now on, you need to use the `RouterLink` directive to handle elements with `href` attributes.

Well, there are other methods and directives that have been removed and updated with a new simplified syntax structure. So, it’s better to go with the [Angular v14 to v15 migration guide](https://update.angular.io/?v=14.0-15.0) to ensure a smoother application migration.

Use the following command to update Angular 14 to Angular 15:

```
ng update @angular/cli @angular/core
```

Write up the below-mentioned command in CLI to update your global Angular:

```
npm i -g @angular/cli
```

## **Wrapping Up**

The decision for launching Ivy in 2020 was the best one as it has enabled a lot of improvements – NgModules was one of them. This improvement is helping to make the learning curve easier and more simplified.

The team Angular is working on making more improvements to the server-side rendering pipeline, and enhancement in the code reusability is next in line to make Angular more effective.

So, let’s upgrade to Angular v15 and wait for the new exciting update to get acquainted with.

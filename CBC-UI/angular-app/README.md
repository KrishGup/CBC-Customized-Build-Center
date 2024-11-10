# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
---

---

## Team Information

* Team name: CBC-Customized-Build-Center
* Team members
  * Braden Kirkpatrick
  * Krish Gupta
  * Nathaniel Busedu

## Executive Summary

Our project is a web-based platform that enables users to easily create and modify 3D models using OpenSCAD, a parametric CAD software. The platform is designed for accessibility, targeting both beginners looking to learn 3D modeling and experienced users needing a simple interface for custom designs. Once a model is complete, users can seamlessly send it to a connected 3D printing service (like Slant3D) for affordable, high-quality prints.

## Architecture and Design

This project leverages OpenSCAD to render, download, and upload STL files. The web-based platform allows users to interact with 3D models, making modifications as needed. Once a model is finalized, users can pull from Slant3D to select the color and size of the filament. The platform then calculates the total cost of printing the STL file, providing an end-to-end solution from design to print. It also happens to be quite secure for the shopper as their info is largely protected through the use of shopify which takes the steps to maintain a safe transaction can take place and ensure no information is mishandled or obtained.

### Summary

This project is a web-based platform that integrates OpenSCAD for 3D model rendering and modification. Users can upload, download, and customize STL files, and then select filament options from Slant3D. The platform calculates the total printing cost and ensures secure transactions through Shopify.

### Overview of User Interface

The user interface for this platform is designed in such a manner to make it largely straightforward. It contains a home page which allows for a return to the main central hub of the website which includes the interfaces to render, download SCAD, and download the STL files when entering the OpenSCAD code required. The about section contains all the information abou the various features on the website which can be informative for those who are unsure of the functionality or methods used for certain features. It is possible to check the status of ones order through the Order Status page which allows for tracking information to be accessed by the user. The 3d Print page offers the ability to both upload the STL/SCAD files and then select from a list of filaments and provide an estimated price for the printout. Finally the tutorials page provides a comprehensive guide to how to go through the various steps on the platform so that any user can easily be guided through each step to have the optimal experience.


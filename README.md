# custom-font-controls
Reusable font-loader module and PCF controls for custom fonts in PowerApps

PowerApps has a built-in limitation that allows you to only choose from the included 14 fonts, or fonts installed on your computer.  Both of these choices are limiting because:
- The 14 included fonts limit your creative expression
- The 14 included fonts do not let you use existing company brand-identity
- Using fonts installed on your computer, those fonts may not be available on a different operating system or platform

If you try to include other fonts by creating a PCF control (professional code), the PowerApps build/packaging tools (pac pcf...) won't include them due to those tools using a customized version of Webpack that intentionally does not bundle those fonts.

If you try to override the behavior of the custom Webpack to force it to include your fonts, the package will include your fonts, but PowerApps intentionally won't put those fonts into it's "blob storage" when you import the package, so the fonts aren't used.

To overcome these limitations, it becomes necessary to NOT include the fonts in your PCF control and load your fonts dynamically (from Google Fonts or another CDN) AT RUNTIME. That is, your PCF control can "fetch" the necessary fonts when the control is loaded in your app.

NOTE:  See the separate README files for each of the options below in their respective directories for more information.

Installing the demo only:

From the Downloads directory, download "demo_1_1_managed.zip".  Once you have the file, import it into "Solutions" in your PowerApps environment.

![Solution1](https://github.com/user-attachments/assets/8c906fcc-7b0d-4e35-8add-842de65cca18)

![Solution2](https://github.com/user-attachments/assets/43a75b19-b841-401b-be5d-34a67716ce15)

During the import, browse to the file you downloaded from your file system

![Solution4](https://github.com/user-attachments/assets/8e83da11-d4f0-4648-87e5-5a06b4762e8d)

![Solution5](https://github.com/user-attachments/assets/527c801c-dbca-4065-a52a-f9f93e05b508)

Once you have installed the solution, open it and play the app contained in the solution.

----------------------------------------

Installing the control that you can use in your own apps:

From the Downloads directory, download "external_font_control_1_1_managed.zip" (or the unmanaged version if you design PCF controls and want to extend/modify this control).  Once you hae the file, import it into "Solutions" in your PowerApps environment.

![Solution1](https://github.com/user-attachments/assets/8c906fcc-7b0d-4e35-8add-842de65cca18)

![Solution2](https://github.com/user-attachments/assets/43a75b19-b841-401b-be5d-34a67716ce15)

During the import, browse to the file you downloaded from your file system

![Solution4](https://github.com/user-attachments/assets/8e83da11-d4f0-4648-87e5-5a06b4762e8d)

![Solution5](https://github.com/user-attachments/assets/527c801c-dbca-4065-a52a-f9f93e05b508)

Once you have installed the solution, create a new app and import the control from "code components"

![Import](https://github.com/user-attachments/assets/8c011391-7c01-414f-a9be-e09285dda1cd)

![ImportControl](https://github.com/user-attachments/assets/bf93345d-93fc-416a-a597-fb15b07529a5)

You will then find the component listed under "Code components" in your menu. Simply drag it onto the canvas, select it, and fill-in your parameters just like you would for any other component.

----------------------------------------

Installing the module separately from any demo or plug-and-play PCF components:

If you are making your own PCF, and want to use this font-loader module, simply download "font-loader.ts" from the font-loader directory and put it in a location accessible to your component.  See the README in that directory for more information on placement and use.

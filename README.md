# custom-font-controls
Reusable font-loader module and PCF controls for custom fonts in PowerApps

PowerApps has a built-in limitation that allows you to only choose from the included 14 fonts, or fonts installed on your computer. Both of these choices are limiting because:

-The 14 included fonts limit your creative expression
-The 14 included fonts do not let you use existing company brand-identity
-Using fonts installed on your computer, those fonts may not be available on a different operating system or platform
-If you try to include other fonts by creating a PCF control (professional code), the PowerApps build/packaging tools (pac pcf...) won't include them due to those tools using a customized version of Webpack that intentionally does not bundle those fonts.

If you try to override the behavior of the custom Webpack to force it to include your fonts, the package will include your fonts, but PowerApps intentionally won't put those fonts into it's "blob storage" when you import the package, so the fonts aren't used.

To overcome these limitations, it becomes necessary to NOT include the fonts in your PCF control and load your fonts dynamically (from Google Fonts or another CDN) AT RUNTIME. That is, your PCF control can "fetch" the necessary fonts when the control is loaded in your app.

# Custom Font Control
Reusable font-loader module and PCF control to demonstrate using custom fonts in PowerApps

(NOTE:  This is the "clean" control.  It uses the font-loader module (integrated in the provided package) and is intended to replace the text/label control in PowerApps wherever you need text with a custom (external) font.  As such, the parameters for configuring it appear only in the maker portal during DESIGNTIME.  Only the chosen text will appear at RUNTIME.  If you want a "demo" of showing custom fonts that you can configure during RUNTIME, see the "FontDemoControl" directory in this repository.)

PowerApps has a built-in limitation that allows you to only choose from the included 14 fonts, or fonts installed on your computer.  Both of these choices are limiting because:
- The 14 included fonts limit your creative expression
- The 14 included fonts do not let you use existing company brand-identity
- Using fonts installed on your computer, those fonts may not be available on a different operating system or platform

If you try to include other fonts by creating a PCF control (professional code), the PowerApps build/packaging tools (pac pcf...) won't include them due to those tools using a customized version of Webpack that intentionally does not bundle those fonts.

If you try to override the behavior of the custom Webpack to force it to include your fonts, the package will include your fonts, but PowerApps intentionally won't put those fonts into it's "blob storage" when you import the package, so the fonts aren't used.

To overcome these limitations, it becomes necessary to NOT include the fonts in your PCF control and load your fonts dynamically (from Google Fonts or another CDN) AT RUNTIME.  That is, your PCF control can "fetch" the necessary fonts when the control is loaded in your app.

This control uses the font-loader module (integrated in the PCF control) that fetches the chosen external font (configured in the maker portal) while the app is running.  During your app design, select the "font name" (also known as the font family), the "font provider" (such as google or other CDN), the CDN address (if using a CDN other than google), the font size and weight, the color of the text, the text position/justification, and the actual text you want to show.  Some combinations (depending on your selections) may not work, or may not update, due to the order you have supplied the parameters.  If you are sure you have used a valid combination (the font family name and weight are correct), but the font doesn't render, try switching the font family name to something else and then switch the font family name back to what you wanted.

To get the correct font family name and a valid font weight, go to Google Fonts (https://font.google.com) and browse the available fonts.  When you see something you like, click on it. Then click on "Get Font" and click on "Get Embed Code".  All fonts you have previously selected will be shown on this screen, so find the one you want in the list on this page.  Once you find it, look for the line in that font that says, "font-family:".  After that, you will see the correct font family name in quotes.  Take just that name (without the quotes) and plug it into the Font Demo Control app, along with a supported weight.  If you don't know the supported weights, check the font page (but "400" is often a safe bet).

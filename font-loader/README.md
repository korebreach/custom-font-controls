# font-loader
Reusable font-loader module for your PCF controls, allowing you to use external fonts in PowerApps

This file (font-loader.ts) is a module that you can use in your own PCF projects.  As such, it's best to place it in a folder one level above the subdirectories for your projects.  For example, if you have a directory called "Projects", and a subdirectory for each project, it's best to place this file in the "Projects" directory.  Then, simply reference the file with an include statement in your index.ts using a relative path to the file.  For my work, I put the file in a "Shared" directory under "Projects" (i.e. That "Shared" directory is at the same level as the subdirectories for each project).  I then reference the font-loader with "import { loadFont, FontConfig } from "../../Shared/font-loader";".

The font-loader exports a class called "CustomFontControl" and expects the parameters:

⦁	Text (the text you want to display)
⦁	FontFamily (the name of the font family from google fonts or CDN)
⦁	FontProvider ("google" or "CDN")
⦁	CDNUrl (the URL to your CDN if you are using this option)
⦁	FontSize
⦁	FontWeight
⦁	TextAlign
⦁	TextColor (expressed as a hex code, such as #000000, or as a standard color name)

See FontDemoControl for an example of using the font-loader module at RUNTIME, supplying parameters inside the running app.

See CustomFontControl for an example of using the font-loader module at DESIGNTIME, supplying parameters in the maker portal.

If you want a plug-and-play PCF control that you can use to replace the TEXT or LABEL controls whenever you need text with a custom font, import the "external_font_control_1_1_managed.zip" file into PowerApps.  If you want to customize it further, use the unmanaged version.

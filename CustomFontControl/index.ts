import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { loadFont, FontConfig } from "../../Shared/font-loader";

export class CustomFontControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private textElement: HTMLParagraphElement;
    private notifyOutputChanged: () => void;

    private currentFontFamily: string = "";

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.container = container;

        // Create and style the text element
        this.textElement = document.createElement("p");
        this.textElement.style.margin = "0";
        this.textElement.style.padding = "0";

        this.container.appendChild(this.textElement);
        this.updateView(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const text = context.parameters.Text?.raw ?? "Sample text";
        const fontFamily = context.parameters.FontFamily?.raw ?? "Roboto";
        const fontProvider = context.parameters.FontProvider?.raw?.toLowerCase() ?? "google";
        const cdnUrl = context.parameters.CDNUrl?.raw ?? "";
        const fontSize = context.parameters.FontSize?.raw ?? 16;
        const fontWeight = context.parameters.FontWeight?.raw ?? "400";
        const textAlign = context.parameters.TextAlign?.raw ?? "left";
        const textColor = context.parameters.TextColor?.raw ?? "#000000";

        // Load font only if fontFamily changes
        if (fontFamily !== this.currentFontFamily) {
            const config: FontConfig = {
                name: fontFamily,
                source: fontProvider as "google" | "cdn",
                cdnUrl,
                weights: [fontWeight],
                fontWeight
            };
            loadFont(config);
            this.currentFontFamily = fontFamily;
        }

        // Apply styles and content
        this.textElement.textContent = text;
        this.textElement.style.fontFamily = `"${fontFamily}", sans-serif`;
        this.textElement.style.fontSize = `${fontSize}px`;
        this.textElement.style.fontWeight = fontWeight;
        this.textElement.style.textAlign = textAlign;
        this.textElement.style.color = textColor;
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        this.container.innerHTML = "";
    }
}

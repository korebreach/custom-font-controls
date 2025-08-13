import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { loadFont, FontConfig } from "../../Shared/font-loader";


// Define the shape of our internal state
interface FontState {
  fontFamily: string;
  provider: string;
  cdnUrl: string;
  exampleText: string;
  fontSize: number;
  fontWeight: string;
  textAlign: string;
  textcolor: string;
}

export class FontDemoControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private paragraph: HTMLParagraphElement;
  private state: FontState;
  private notifyOutputChanged: () => void;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;

    // Initialize default state
    this.state = {
      fontFamily: "",
      provider: "Google",
      cdnUrl: "",
      exampleText: "The quick brown fox jumps over the lazy dog.",
      fontSize: 16,
      fontWeight: "normal",
      textAlign: "left",
      textcolor: "#000000",
    };

    // Create input fields
    const fontInput = this.createTextInput("Font name (e.g., Roboto)", val => {
      this.state.fontFamily = val;
      this.validate(applyButton);
    });

    const providerSelect = this.createSelect(["Google", "CDN"], val => {
      this.state.provider = val;
      this.validate(applyButton);
    });

    const cdnInput = this.createTextInput("CDN URL (if using CDN)", val => {
      this.state.cdnUrl = val;
      this.validate(applyButton);
    });

    const textInput = this.createTextInput("Example text", val => {
      this.state.exampleText = val;
      this.renderFont();
    });

    const sizeInput = this.createNumberInput("Font size (e.g., 16)", val => {
      const parsed = parseInt(val, 10);
      this.state.fontSize = isNaN(parsed) ? 16 : parsed;
      this.validate(applyButton);
    });

    const weightInput = this.createTextInput("Font weight (e.g., normal, bold, 400)", val => {
      this.state.fontWeight = val;
      this.validate(applyButton);
    });

    const alignInput = this.createSelect(["left", "center", "right"], val => {
      this.state.textAlign = val;
      this.validate(applyButton);
    });

    const textcolorInput = this.createTextInput("Text color (e.g., #000000 or red)", val => {
      this.state.textcolor = val;
      this.validate(applyButton);
    });


    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply Font";
    applyButton.disabled = true;
    applyButton.onclick = () => this.renderFont();

    // Paragraph to display the rendered font
    this.paragraph = document.createElement("p");
    this.paragraph.textContent = this.state.exampleText;
    this.paragraph.style.marginTop = "1rem";

    // Append inputs to container, each wrapped for vertical layout
    this.container.appendChild(this.wrapField(fontInput));
    this.container.appendChild(this.wrapField(providerSelect));
    this.container.appendChild(this.wrapField(cdnInput));
    this.container.appendChild(this.wrapField(textInput));
    this.container.appendChild(this.wrapField(sizeInput));
    this.container.appendChild(this.wrapField(weightInput));
    this.container.appendChild(this.wrapField(alignInput));
    this.container.appendChild(this.wrapField(textcolorInput));
    this.container.appendChild(this.wrapField(applyButton));
    this.container.appendChild(this.paragraph);
  }

  // Wrap each input in a div to ensure vertical stacking
  private wrapField(field: HTMLElement): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "0.5rem";
    wrapper.appendChild(field);
    return wrapper;
  }

  // Create a generic text input
  private createTextInput(placeholder: string, onChange: (val: string) => void): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.style.width = "100%";
    input.oninput = () => onChange(input.value.trim());
    return input;
  }

  // Create a number input for font size
  private createNumberInput(placeholder: string, onChange: (val: string) => void): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = placeholder;
    input.style.width = "100px";
    input.oninput = () => onChange(input.value.trim());
    return input;
  }

  // Create a dropdown for provider selection
  private createSelect(options: string[], onChange: (val: string) => void): HTMLSelectElement {
    const select = document.createElement("select");
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    select.onchange = () => onChange(select.value);
    return select;
  }

  // Validate inputs before enabling the Apply button
  private validate(button: HTMLButtonElement): void {
    const validFont = this.state.fontFamily.length > 0;
    const validSize = this.state.fontSize > 0;
    button.disabled = !(validFont && validSize);
  }

  // Inject font and apply styles to the paragraph
  private renderFont(): void {
    const config: FontConfig = {
      name: this.state.fontFamily,
      source: this.state.provider.toLowerCase() as "google" | "cdn",
      weights: [this.state.fontWeight],
      cdnUrl: this.state.provider === "CDN" ? this.state.cdnUrl : undefined,
      fontWeight: this.state.fontWeight,
    };

    loadFont(config); // ✅ Use shared module

    // Apply font and size to paragraph
    this.paragraph.style.fontFamily = `"${this.state.fontFamily}", sans-serif`;
    this.paragraph.style.fontSize = `${this.state.fontSize}px`;
    this.paragraph.style.fontWeight = this.state.fontWeight;
    this.paragraph.style.textAlign = this.state.textAlign;
    this.paragraph.style.color = this.state.textcolor;
    this.paragraph.textContent = this.state.exampleText;
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // No dynamic updates needed for this demo
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {
    // Clean up if needed
  }
}

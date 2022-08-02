import React, { Ref, MutableRefObject } from "react";
import axios from "axios";
import bind from "bind-decorator";

enum KeyDownEvents {
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
  ENTER = "Enter",
  TAB = "Tab",
  SHIFT = "Shift",
}

interface KeyBoardEvents {
  arrowDown: () => void;
  arrowUp: () => void;
  enter: () => void;
  TabShift: () => void;
}

const { ARROW_DOWN, ARROW_UP, ENTER, TAB, SHIFT } = KeyDownEvents;

class AutoCopmleteInput implements KeyBoardEvents {
  public childrenLength: number = -1;

  constructor(
    private $ref: Ref<HTMLDivElement>,
    private $listRef: Ref<HTMLDivElement>,

    private value: string,
    private setValue: React.Dispatch<React.SetStateAction<string>>,

    private isMenuOpen: boolean,
    private setMenuToOpen: React.Dispatch<React.SetStateAction<boolean>>,

    private select: number,
    private setSelect: React.Dispatch<React.SetStateAction<number>>,

    private options: string[],
    private setOptions: React.Dispatch<React.SetStateAction<string[]>>,

    private setAirport: React.Dispatch<React.SetStateAction<string>>
  ) {}

  public arrowDown(): void {
    const select = +this.select;
    if (this.childrenLength === select) {
      this.setSelect(0);
      return;
    }
    this.setSelect(select + 1);
  }

  public arrowUp(): void {
    const select = +this.select;
    if (+select <= 0) {
      this.setSelect(this.childrenLength);
      return;
    }
  }

  public enter(): void {
    const { current } = this.$listRef as MutableRefObject<HTMLDivElement>;
    (current.childNodes[this.select] as HTMLDivElement).click();
    this.setOptions([]);
  }

  public TabShift(): void {
    this.setMenuToOpen(false);
    this.setOptions([]);
  }

  private isEmptyString(text: string): boolean {
    return typeof text === "string" && text.trim().length == 0;
  }

  @bind
  public requestAirports(): void {
    if (!this.value) return;

    (async () => {
      const airports = await axios.get(`api/airports/${this.value}`);
      const { name, code } = airports.data;
      if (name) {
        this.setOptions([`${code} - ${name}`]);
        return false;
      }
      this.setOptions(["No results found"]);
    })();
  }

  @bind
  public setClickedOutsideOfBounds(event: MouseEvent): void {
    const ref = this.$ref as MutableRefObject<HTMLDivElement>;
    if (
      this.isMenuOpen &&
      ref.current &&
      !ref.current.contains(event.target as HTMLDivElement)
    ) {
      this.setMenuToOpen(false);
      this.setSelect(-1);
    }
  }

  @bind
  public handleOutsideOfBounds(): () => void {
    document.addEventListener("mousedown", this.setClickedOutsideOfBounds);
    return () => {
      document.removeEventListener("mousedown", this.setClickedOutsideOfBounds);
    };
  }

  @bind
  public handleOnChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    this.setValue(value);
    if (this.isEmptyString(value)) {
      this.setMenuToOpen(false);
      return;
    }
    this.setMenuToOpen(true);
  }

  @bind
  public handleMenuItemSelected(event: React.MouseEvent<HTMLDivElement>): void {
    const { textContent } = event.target as HTMLDivElement;
    const trimmedTextContent = textContent!.trim();
    this.setValue(trimmedTextContent);
    this.setAirport(trimmedTextContent);
    this.setMenuToOpen(false);
  }

  @bind
  public handleOnKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (!this.isMenuOpen) return;
    const { current } = this.$listRef as MutableRefObject<HTMLDivElement>;
    this.childrenLength = current.childNodes.length;
    switch (event.key) {
      case ARROW_DOWN:
        if (this.isMenuOpen) this.arrowDown();
        break;
      case ARROW_UP:
        this.arrowUp();
        break;
      case ENTER:
        this.enter();
        break;
      case TAB || SHIFT:
        this.TabShift();
        break;
      default:
        this.setSelect(-1);
    }
  }
}

export default AutoCopmleteInput;

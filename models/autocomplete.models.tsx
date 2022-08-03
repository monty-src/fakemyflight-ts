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
  public numberOfMenuSuggessions: number = -1;

  constructor(
    private $ref: Ref<HTMLDivElement>,
    private $listRef: Ref<HTMLDivElement>,

    private autoCompleteInputValue: string,
    private setAutoCompleteInputValue: React.Dispatch<
      React.SetStateAction<string>
    >,

    private isAutoCompleteSuggessionMenuOpen: boolean,
    private setAutoCompleteSuggessionMenuOpen: React.Dispatch<
      React.SetStateAction<boolean>
    >,

    private indexOfSelectedMenuSuggestion: number,
    private setSelectedMenuSuggestion: React.Dispatch<
      React.SetStateAction<number>
    >,

    private menuSuggessions: string[],
    private setMenuSuggessions: React.Dispatch<React.SetStateAction<string[]>>,

    private setAirport: React.Dispatch<React.SetStateAction<string>>
  ) {}

  public arrowDown(): void {
    if (this.numberOfMenuSuggessions === +this.indexOfSelectedMenuSuggestion) {
      this.setSelectedMenuSuggestion(0);
      return;
    }
    this.setSelectedMenuSuggestion(+this.indexOfSelectedMenuSuggestion + 1);
  }

  public arrowUp(): void {
    if (+this.indexOfSelectedMenuSuggestion <= 0) {
      this.setSelectedMenuSuggestion(this.numberOfMenuSuggessions);
      return;
    }
  }

  public enter(): void {
    const { current } = this.$listRef as MutableRefObject<HTMLDivElement>;
    (
      current.childNodes[this.indexOfSelectedMenuSuggestion] as HTMLDivElement
    ).click();
    this.setMenuSuggessions([]);
  }

  public TabShift(): void {
    this.setAutoCompleteSuggessionMenuOpen(false);
    this.setMenuSuggessions([]);
  }

  private isEmptyString(text: string): boolean {
    return typeof text === "string" && text.trim().length == 0;
  }

  @bind
  public requestAirports(): void {
    if (!this.autoCompleteInputValue) return;

    (async () => {
      const airports = await axios.get(
        `api/airports/${this.autoCompleteInputValue}`
      );
      const { name, code } = airports.data;
      if (name) {
        this.setMenuSuggessions([`${code} - ${name}`]);
        return false;
      }
      this.setMenuSuggessions(["No results found"]);
    })();
  }

  @bind
  public setClickedOutsideOfBounds(event: MouseEvent): void {
    const ref = this.$ref as MutableRefObject<HTMLDivElement>;
    if (
      this.isAutoCompleteSuggessionMenuOpen &&
      ref.current &&
      !ref.current.contains(event.target as HTMLDivElement)
    ) {
      this.setAutoCompleteSuggessionMenuOpen(false);
      this.setSelectedMenuSuggestion(-1);
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
    this.setAutoCompleteInputValue(value);
    if (this.isEmptyString(value)) {
      this.setAutoCompleteSuggessionMenuOpen(false);
      return;
    }
    this.setAutoCompleteSuggessionMenuOpen(true);
  }

  @bind
  public handleMenuItemSelected(event: React.MouseEvent<HTMLDivElement>): void {
    const { textContent } = event.target as HTMLDivElement;
    const trimmedTextContent = textContent!.trim();
    this.setAutoCompleteInputValue(trimmedTextContent);
    this.setAirport(trimmedTextContent);
    this.setAutoCompleteSuggessionMenuOpen(false);
  }

  @bind
  public handleOnKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (!this.isAutoCompleteSuggessionMenuOpen) return;
    const { current } = this.$listRef as MutableRefObject<HTMLDivElement>;
    this.numberOfMenuSuggessions = current.childNodes.length;
    switch (event.key) {
      case ARROW_DOWN:
        if (this.isAutoCompleteSuggessionMenuOpen) this.arrowDown();
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
        this.setSelectedMenuSuggestion(-1);
    }
  }
}

export default AutoCopmleteInput;

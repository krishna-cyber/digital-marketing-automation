import { Field } from "@/components/ui/field"

import { Fragment } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../ui/combobox"
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"

const fonts = [
  { value: "sans", label: "Inter", className: "font-sans" },
  { value: "mono", label: "Mono", className: "font-mono" },
  { value: "serif", label: "Serif", className: "font-serif" },
]

export function FontSelect() {
  const anchor = useComboboxAnchor()
  return (
    <Field className="max-w-xs">
      <Combobox
        multiple
        items={fonts}
        itemToStringValue={(font: (typeof fonts)[number]) => font.label}
        defaultValue={[fonts[0], fonts[1]]}
      >
        <ComboboxChips
          ref={anchor}
          className="has-data-[slot=combobox-chip]:pl-1"
        >
          <ComboboxValue>
            {(selectedFonts: (typeof fonts)[number][]) => (
              <Fragment>
                {selectedFonts.map((font) => (
                  <ComboboxChip
                    key={font.value}
                    showRemove={true}
                    className="gap-1.5 rounded-full"
                  >
                    {font.label}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Add fonts..." />
              </Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent
          anchor={anchor}
          className="max-w-(--anchor-width) min-w-(--anchor-width)"
        >
          <ComboboxEmpty>No fonts found.</ComboboxEmpty>
          <ComboboxList>
            {(font) => (
              <ComboboxItem key={font.value} value={font}>
                <Item size="xs" className="p-0">
                  <ItemContent>
                    <ItemTitle className="whitespace-nowrap">
                      {font.label}
                    </ItemTitle>
                    <ItemDescription>{font.description}</ItemDescription>
                  </ItemContent>
                </Item>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}

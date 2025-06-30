import { cn } from "@/lib/utils"
import {
  Select as RadixSelect,
  SelectContent as RadixSelectContent,
  SelectGroup as RadixSelectGroup,
  SelectItem as RadixSelectItem,
  SelectLabel as RadixSelectLabel,
  SelectTrigger as RadixSelectTrigger,
  SelectValue as RadixSelectValue,
  SelectViewport as RadixSelectViewport,
} from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

const Select = RadixSelect
const SelectGroup = RadixSelectGroup
const SelectValue = RadixSelectValue

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelectTrigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelectTrigger>
>(({ className, children, ...props }, ref) => (
  <RadixSelectTrigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
  </RadixSelectTrigger>
))
SelectTrigger.displayName = RadixSelectTrigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelectContent>,
  React.ComponentPropsWithoutRef<typeof RadixSelectContent>
>(({ className, children, ...props }, ref) => (
  <RadixSelectContent
    ref={ref}
    className={cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
      className
    )}
    {...props}
  >
    <RadixSelectViewport className="p-1">{children}</RadixSelectViewport>
  </RadixSelectContent>
))
SelectContent.displayName = RadixSelectContent.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof RadixSelectLabel>,
  React.ComponentPropsWithoutRef<typeof RadixSelectLabel>
>(({ className, ...props }, ref) => (
  <RadixSelectLabel
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = RadixSelectLabel.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelectItem>,
  React.ComponentPropsWithoutRef<typeof RadixSelectItem>
>(({ className, children, ...props }, ref) => (
  <RadixSelectItem
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </span>
    {children}
  </RadixSelectItem>
))
SelectItem.displayName = RadixSelectItem.displayName

export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
}

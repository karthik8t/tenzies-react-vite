import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/60",
          destructive:
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          lockup: "bg-[#88F8E5] rounded-none w-[234] text-secondary-foreground border-2"
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
          agent:"h-[100px] w-[100px] bg-[#09384310] border-2 rounded-none",
          attack: "w-[300px] h-[600px] bg-0 hover"
        },
        tile: {
          default: "border-secondary", locked:"border-primary"
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default",
        tile: "default"
      },
    }
)

export interface Agent {
  agent: 'astra' | 'breach' | 'brim' | 'jett' | 'phoenix' | 'sage' | 'sova'
}
interface AgentRef {
  agent?: never
}

export type ButtonIconProps = Agent | AgentRef;

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & ButtonIconProps>(
    ({ className, variant, size, asChild = false, agent: agent = 'sage', tile, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      const bgClass = size === 'agent' ? `agent-bg-${agent} agent-bg-common` : '';
      return (
          <Comp
              className={cn(buttonVariants({ variant, size, className, tile }), bgClass)}
              ref={ref}
              {...props}
          />
      )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

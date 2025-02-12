import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

type Props = {
  text: string | React.ReactNode;
  content: string | React.ReactNode;
}

const TextTooltip: React.FC<Props> = ({ text, content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {text}
        </TooltipTrigger>
        <TooltipContent className="max-w-lg">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TextTooltip;

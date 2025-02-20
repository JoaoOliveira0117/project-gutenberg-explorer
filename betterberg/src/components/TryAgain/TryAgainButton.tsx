'use client'

import { CgSpinner } from "react-icons/cg";
import { Button } from "../ui/button";

type Props = {
  onTryAgain: () => void;
  isLoading: boolean;
}

const TryAgainButton: React.FC<Props> = ({ onTryAgain, isLoading }) => {
  return (
    <Button variant="outline" className="block transition-all duration-300 h-fit" onClick={onTryAgain} disabled={isLoading}>
      { isLoading ? <CgSpinner size={78} className="animate-spin min-h-8 min-w-8 block" />: "Try Again" }
    </Button>
  )
}

export default TryAgainButton;
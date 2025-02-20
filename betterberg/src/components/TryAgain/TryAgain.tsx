'use client'

import TryAgainButton from "./TryAgainButton";

type Props = {
  onTryAgain: () => void;
  isLoading: boolean;
}

const TryAgain: React.FC<Props> = ({ onTryAgain, isLoading }) => {
  return (
    <div className="max-w-6xl mx-auto mt-12 flex flex-col items-center gap-4">
      <h1 className="text-md text-gray-400">An error occurred while fetching books</h1>
      <h2 className="text-xl text-gray-400">☹️</h2>
      <TryAgainButton onTryAgain={onTryAgain} isLoading={isLoading} />
    </div>
  )
}

export default TryAgain;
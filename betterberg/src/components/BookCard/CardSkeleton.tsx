import { Card, CardContent } from "../ui/card";

const BookCardSkeleton: React.FC = () => {
  return (
    <Card className="w-full max-w-xs flex flex-col items-center p-2 rounded-lg">
      <div className="h-56 overflow-hidden flex justify-center items-center rounded-lg my-6">
        <div className="w-48 h-56 bg-slate-300 animate-pulse"/>
      </div>
      
      <CardContent className="flex flex-col gap-2 text-center items-center">
        <div className="w-48 h-5 bg-slate-300 rounded-xl animate-pulse"/>
        <div className="w-36 h-4 bg-slate-300 rounded-xl animate-pulse"/>
        <span>
          <div className="w-16 h-4 bg-slate-300 rounded-xl inline-block mx-1 animate-pulse"/>
          <div className="w-16 h-4 bg-slate-300 rounded-xl inline-block mx-1 animate-pulse"/>
        </span>
      </CardContent>
  
      <CardContent className="flex flex-col gap-2 mt-auto p-[0] w-full">
        <div className="flex flex-wrap justify-center gap-1">
          <div className="w-48 h-4 bg-slate-300 rounded-xl animate-pulse"/>
        </div>
        <div className="flex flex-wrap justify-end gap-2 mt-2">
          <div className="w-12 h-12 bg-slate-300 rounded-xl animate-pulse"/>
          <div className="w-20 h-12 bg-slate-300 rounded-lg animate-pulse"/>
        </div>
      </CardContent>
    </Card>

  );
}

export default BookCardSkeleton;
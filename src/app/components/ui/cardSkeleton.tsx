import { Skeleton } from "./skeleton";

function CardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
        <div key={id} className="w-[380px] max-md:w-11/12">
          <div className="overflow-hidden">
            <Skeleton className="space-y-1.5 p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="bg-background/50 rounded-full w-14 h-14" />
                <Skeleton className="bg-background/50 rounded-lg w-32 h-6 "></Skeleton>
              </div>
              <Skeleton className="bg-background/50 rounded-lg w-full h-6 "></Skeleton>
              <div className="flex justify-between items-center">
                <Skeleton className="bg-background/50 rounded-lg w-16 h-6"></Skeleton>
                <Skeleton className="bg-background/50 rounded-lg w-32 h-6 pr-1"></Skeleton>
              </div>
              <Skeleton className="bg-background/50 relative object-contain aspect-square border-2"></Skeleton>
            </Skeleton>
          </div>
        </div>
      ))}
    </>
  );
}

export default CardSkeleton;

export default function ProductSkeleton() {
    return(
        <article className="flex flex-col gap-4 animate-pulse">            
            <div className="w-full aspect-4/3 md:aspect-square bg-rose-100 rounded-xl relative">
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-40 h-11 bg-rose-300 rounded-full border-2 border-white"></div>
            </div>
            <div className="mt-4 space-y-3">
                <div className="h-3 bg-rose-100 rounded w-1/3"></div>
                <div className="h-4 bg-rose-300 rounded w-3/4"></div>
                <div className="h-4 bg-red opacity-50 rounded w-1/4"></div>
            </div>
        </article>

    );
}
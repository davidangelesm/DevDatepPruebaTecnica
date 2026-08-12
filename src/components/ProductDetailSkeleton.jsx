export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 animate-pulse">
      <div className="h-5 w-40 bg-rose-100 rounded mb-8"></div>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 aspect-4/3 md:aspect-square bg-rose-100 rounded-xl"></div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="h-3 bg-rose-100 rounded w-1/3"></div>
          <div className="h-8 bg-rose-200 rounded w-3/4"></div>
          <div className="h-7 bg-red opacity-40 rounded w-1/4 mt-2"></div>
          <div className="h-12 bg-rose-200 rounded-full w-40 mt-6"></div>
        </div>
      </div>
    </div>
  );
}

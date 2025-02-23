export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
      <p className="text-white text-xl font-bold animate-pulse">Loading...</p>
    </div>
  );
}

export function MainWorkspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6 w-full max-w-7xl mx-auto h-[calc(100vh-100px)] overflow-hidden min-h-0 *:w-full *:md:w-[calc(50%-12px)]">
      {children}
    </div>
  );
}

export function MainWorkspace({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch md:items-center gap-6 mx-auto min-h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] w-full max-w-full overflow-x-hidden px-4">
      {children}
    </div>
  );
}

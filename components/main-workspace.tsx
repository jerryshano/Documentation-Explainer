export function MainWorkspace({ children }: { children: React.ReactNode }) {
  return (
    <div
      className=" 
      grid
      grid-cols-1
      gap-6
      lg:grid-cols-2
      w-full
      max-w-7xl
      mx-auto
      h-full
      items-stretch
      overflow-hidden
      min-h-0
      "
    >
      {children}
    </div>
  );
}

type MobileFrameProps = {
  children: React.ReactNode;
};

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <main className="relative mx-auto h-[844px] w-[390px] bg-white">
      {children}
    </main>
  );
}
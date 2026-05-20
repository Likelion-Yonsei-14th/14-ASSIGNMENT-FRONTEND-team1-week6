type MobileFrameProps = {
  children: React.ReactNode;
};

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <main className="mx-auto min-h-screen w-[390px] bg-white px-[24px] pt-[48px]">
      {children}
    </main>
  );
}
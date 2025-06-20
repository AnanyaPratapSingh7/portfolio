export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{[
    <div className="absolute inset-0 bg-[url('../public/explorer_green_day.jpg')] bg-cover bg-center filter  z-0" />,
    children
  ]}</div>;
}
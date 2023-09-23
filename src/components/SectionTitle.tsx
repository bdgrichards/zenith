interface props {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: props) {
  return (
    <div>
      <p className="text-3xl font-semibold text-gray-700">{title}</p>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  );
}

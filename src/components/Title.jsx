const Title = ({ title, subtitle}) => {
  return (
    <div className="py-10 text-center">
      <h2 className="text-4xl font-bold title">{title}</h2>
      <p className="text-shadow-gray-600 text-lg">{subtitle}</p>
    </div>
  );
};

export default Title;

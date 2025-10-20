const Title = ({ title, subtitle}) => {
  return (
    <div className="py-10 text-center">
      <h2 className="text-4xl font-bold title">{title}</h2>
      <p className="text-gray-600 text-lg p-5 md:w-2/5 mx-auto">{subtitle}</p>
    </div>
  );
};

export default Title;

// components/EmptyState.tsx

const EmptyState: React.FC = () => {
  return (
    <section
      className="flex items-center justify-center bg-gray-100 px-2 py-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          No Data Available
        </h2>
        <h4>
          It looks like there is nothing here. 
        </h4>
      </div>
    </section>
  );
};

export default EmptyState;

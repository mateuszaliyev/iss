import { Space } from "@/components/space";

import { useFocus } from "@/hooks/focus";

const Home = () => {
  const { focus, toggleFocus } = useFocus();

  return (
    <div className="relative h-screen">
      <Space />
      <button
        className="absolute top-0 left-0 bg-gray-900 px-4 py-2 transition-colors hover:bg-gray-800"
        onClick={() => toggleFocus()}
      >
        Focused on {focus}
      </button>
    </div>
  );
};

export default Home;

import { HistoryItem } from "@/components/historyitem";
import { Navbar } from "@/components/navbar";

const Marioooo = () => {
  return (
    <div className="bg-white">
      <Navbar>
        <h1 className="flexselect-none items-center text-2xl font-semibold">
          500 ISS
        </h1>
      </Navbar>
      <header className="my-10 text-center text-6xl font-semibold text-black">
        ISS History
      </header>
      <main className="flex h-screen flex-wrap bg-white">
        <HistoryItem title="dupsko">
          dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </HistoryItem>
        <HistoryItem title="dupsko">
          dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </HistoryItem>
        <HistoryItem src="/assets/images/iss1998.gif" />
      </main>
    </div>
  );
};

export default Marioooo;

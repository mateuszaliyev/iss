import { HistoryItem } from "@/components/historyitem";
import { Navbar } from "@/components/navbar";

const HistoryPage = () => {
  return (
    <div className="bg-white">
      <Navbar>
        <h1 className="flexselect-none font-semib old items-center text-2xl">
          500 ISS
        </h1>
      </Navbar>
      <header className="my-10 text-center text-6xl font-semibold text-black">
        ISS History
      </header>
      <main className="flex h-screen flex-wrap bg-white">
        <HistoryItem>
          The International Space Station was launched into space on November
          20, 1998. Its first launch was the <strong>Zarya</strong> module.
        </HistoryItem>
        <HistoryItem src="/assets/images/iss1998.gif" />
        <HistoryItem src="/assets/images/node.jpg" />
        <HistoryItem>
          On December 4, 1998, it was decided to launch the first US-built
          module called <strong>Unity Node 1</strong> to the ISS.
        </HistoryItem>
        <HistoryItem>
          2008 was a landmark year for the Eurasian Space Agency, with the{" "}
          <strong>Columbus</strong> science laboratory attached to the
          International Space Station on February 7, 2008.
        </HistoryItem>
        <HistoryItem src="/assets/images/columbus.gif" />
        <HistoryItem src="/assets/images/kibo.gif" />
        <HistoryItem>
          11 Marca 2008 roku japoński moduł ekperymentalny współpracujący z ISS
          wprowadził na orbite opracowany przez JAXA moduł o nazwie{" "}
          <strong>Kibō</strong>.
        </HistoryItem>
      </main>
    </div>
  );
};

export default HistoryPage;

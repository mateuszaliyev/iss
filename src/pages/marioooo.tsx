import { HistoryItem } from "@/components/historyitem";
import { Navbar } from "@/components/navbar";

const Marioooo = () => {
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
          Międzynarodowa Stacja Kosmiczna została wprowadzona do przestrzeni
          kosmicznej 20 listopada 1998. Jej pierwszym wystrzelonym elementem był
          moduł
          <strong> Zarya</strong>.
        </HistoryItem>
        <HistoryItem src="/assets/images/iss1998.gif" />
        <HistoryItem src="/assets/images/node.jpg" />
        <HistoryItem>
          4 grudnia 1998 zdecydowano na wypuszczenie do ISS pierwszego modułu
          zbudowanego przez Stany Zjednoczone o nazwie
          <strong> Unity Node 1</strong>.
        </HistoryItem>
        <HistoryItem>
          Rok 2008 był przełomowy dla Europeskiej Agencji Kosmicznej, z tego
          względu, że 7 lutego 2008 roku dołączono do Międzynarodowej Stacji
          Kosmicznej laboratorium naukowe <strong> Columbus</strong>.
        </HistoryItem>
        <HistoryItem src="/assets/images/columbus.gif" />
        <HistoryItem src="/assets/images/kibo.gif" />
        <HistoryItem>
          11 Marca 2008 roku japoński moduł ekperymentalny współpracujący z ISS
          wprowadził na orbite opracowany przez JAXA moduł o nazwie
          <strong> Kibō</strong>.
        </HistoryItem>
      </main>
    </div>
  );
};

export default Marioooo;

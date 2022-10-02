import { Navbar } from "@/components/navbar";
import { PartItem } from "@/components/PartItem";
const PartSite = () => {
  return (
    <div className="bg-white">
      <Navbar>
        <h1 className="flexselect-none font-semib old items-center text-2xl">
          500 ISS
        </h1>
      </Navbar>
      <header className="my-10 text-center text-6xl font-semibold text-black">
        Parts of ISS
      </header>
      <main className="flex h-screen flex-wrap bg-white">
        <PartItem
          image={{ alt: "", src: "/assets/images/iss1998.gif" }}
          title="Duza dupa"
        >
          Dupa Dupa Dupa Dupa Dupa Dupa Dupa Dupa Dupa
        </PartItem>
      </main>
    </div>
  );
};

export default PartSite;
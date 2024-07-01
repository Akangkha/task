import Data from "@/data/tableData.json";
import Filters from "@/component/Filters";
const page = () => {
  return (
    <>
      <section className="p-4 flex w-full justify-between">
        <Filters />
      </section>
    </>
  );
};

export default page;

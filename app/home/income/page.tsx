const Income: React.FC = () => {
  return (
    <>
      <div className="flex justify-around mt-10">
        <div className="flex ">
          <form>
            <div className="">
              <label htmlFor="income" className="text-gray-200 text-xl ">
                Add money to your savings
              </label>
              <input
                type="text"
                id="income"
                className="rounded-full outline-none w-full h-8 px-3 mt-2"
              />
              <div className="flex justify-end">
                <button className="rounded-full mt-2 border-2 text-gray-100 border-gray-200 px-3 py-1 ">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="rounded-full aspect-square border-white border-2 flex justify-center items-center">
          <p className="text-gray-200 text-2xl text-center  p-2">
            Your Savings <span className="block">100000000000000000</span>
          </p>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Added Money</td>
              <td>Source</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>28/10/2002</td>
              <td>500</td>
              <td>Uncle gave me</td>
            </tr>
            <tr>
              <td>10/2/2024</td>
              <td>100</td>
              <td>Mom gave to me</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Income;

import Image from "next/image";

const Profile: React.FC = async () => {
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/users`); // Using absolute URL from the env variable
    console.log("hii");

    const data = await response.json();
    console.log(data);
    return data;
  };
  const data = await fetchUsers();
  return (
    <>
      <div>
        <div className="text-4xl text-gray-200 mt-7 ml-8">
          <p>WELCOME KRISHNAPRASAD!</p>
        </div>
        <div className="flex justify-between mx-48 mt-20">
          <div>
            <div className="border border-gray-200 rounded-full w-80 h-80">
              <img src="/images/signinimage.png" alt="images" />
            </div>
            <div className="text-gray-200 flex text-xl mt-16">
              <div>
                <p>krishnaprasad</p>
                <p>Email:somthing@gmail.com</p>
                <p>phone no:264587451</p>
                <p>created:02-02-24</p>
              </div>
              <div className="ml-10">
                <p>Gender:Male</p>
                <p>Age:31</p>
                <p>Address:Murikumpuzha pala</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-500 opacity-45 rounded-2xl p-12 ">
            <table className="">
              <thead className="text-white">
                <tr className="">
                  <th className="text-xl pb-10">Expenses:</th>
                </tr>
              </thead>
              <tbody className="text-white text-xl font-bold  ">
                <tr className="border-b-2   border-white  ">
                  <td className="tablemargins">1.Milk</td>
                  <td className="tablemargins">Rs.600</td>
                  <td className="tablethirdcol">9/1/2023</td>
                </tr>
                <tr className="border-b-2   border-white ">
                  <td className="tablemargins">1.Wifi</td>
                  <td className="tablemargins">Rs.1000</td>
                  <td className="tablethirdcol">9/1/2023</td>
                </tr>
                <tr className="border-b-2   border-white ">
                  <td className="tablemargins">1.Wifi</td>
                  <td className="tablemargins">Rs.1000</td>
                  <td className="tablethirdcol">9/1/2023</td>
                </tr>
                <tr className="border-b-2   border-white ">
                  <td className="tablemargins">1.Wifi</td>
                  <td className="tablemargins">Rs.1000</td>
                  <td className="tablethirdcol">9/1/2023</td>
                </tr>
                <tr className="border-b-2   border-white ">
                  <td className="tablemargins">1.Wifi</td>
                  <td className="tablemargins">Rs.1000</td>
                  <td className="tablethirdcol">9/1/2023</td>
                </tr>
                <tr className="border-b-2   border-white ">
                  <td className="tablemargins">1.Wifi</td>
                  <td className="tablemargins">Rs.1000</td>
                  <td className="tablethirdcol">9/1/2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;

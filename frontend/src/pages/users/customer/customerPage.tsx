import Header from "./components/header";
import solanCover from "../../../assets/solanCover.jpg";

export default function CustomerPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />

      <main className="flex flex-col md:flex-row p-8 min-h-screen">
  <div className="md:w-1/2 flex flex-col justify-start h-full relative">
    <div className="relative top-16 left-8 md:top-24 md:left-16">
      <h1 className="text-4xl md:text-6xl text-amber-700 leading-tight">
        Get The <br />
        Smooth Look <br />
        You Want
      </h1>
      <p className="mt-6 text-lg text-amber-700 leading-relaxed max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </div>

    <div className="md:w-1/2 flex items-start justify-center mt-6 md:mt-14">
    <img
        src={solanCover}
        alt="Smooth Look"
        className="w-11/12 max-w-lg h-[600px] object-cover rounded-t-[50%] shadow-lg"
    />
    </div>
</main>


    </div>
  );
}

import Header from "./components/header";

export default function CustomerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Customer!</h2>
        <p className="text-gray-700">
          cus page hi
        </p>
      </main>
    </div>
  );
}

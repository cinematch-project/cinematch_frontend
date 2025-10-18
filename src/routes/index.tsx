import { createFileRoute } from "@tanstack/react-router";
import { Searchbar } from "@/components";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col gap-y-12 pt-16">
      <header>
        <h1 className="text-center text-7xl font-bold">CineMatch</h1>
        <p className="text-muted text-center text-lg font-medium">
          Search your favorite movies and get personalized recommendations
        </p>
      </header>
      <Searchbar />
      <section className="grid flex-1 place-content-center">
        <p className="text-muted text-center">No favorites yet. Search and add some!</p>
      </section>
    </div>
  );
}

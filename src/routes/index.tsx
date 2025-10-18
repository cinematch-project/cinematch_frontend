import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="space-y-8 pt-16">
      <h1 className="text-center text-7xl font-bold">CineMatch</h1>
      <Input
        IconLeft={Search}
        containerClassName="max-w-3xl mx-auto"
        type="next"
        name="search"
        label="Search"
      />
    </div>
  );
}

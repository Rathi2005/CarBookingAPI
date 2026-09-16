import { Inbox } from "lucide-react";

function EmptyState({ message }) {
  return (
    <div
      className="
bg-white
rounded-2xl
border
p-10
text-center
"
    >
      <div
        className="
mx-auto
w-16
h-16
rounded-full
bg-gray-100
flex
items-center
justify-center
mb-4
"
      >
        <Inbox className="text-gray-400" />
      </div>

      <h3
        className="
font-semibold
text-lg
"
      >
        Nothing here yet
      </h3>

      <p
        className="
text-gray-500
mt-2
"
      >
        {message}
      </p>
    </div>
  );
}

export default EmptyState;

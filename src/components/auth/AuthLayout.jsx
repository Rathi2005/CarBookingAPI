import BrandPanel from "./BrandPanel";

function AuthLayout({ children }) {
  return (
    <div
      className="
min-h-screen
bg-[#f6f8fc]
flex
items-center
justify-center
p-4
"
    >
      <div
        className="
w-full
max-w-6xl
grid
lg:grid-cols-2
gap-8
items-center
"
      >
        <BrandPanel />

        <div>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;

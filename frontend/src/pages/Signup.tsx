import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
  return (
    <>
      <div className="grid md:grid-cols-2">
        <div>
          <Auth type={""} />
        </div>
        <div className="hidden md:block">
          <Quote />
        </div>
      </div>
    </>
  );
};

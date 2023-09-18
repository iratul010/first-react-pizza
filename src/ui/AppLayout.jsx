import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import IsLoader from "./IsLoader";

function AppLayout() {
  // loading identify
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  console.log(navigation);
  return (
    <div className="layout">
      {isLoading && <IsLoader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

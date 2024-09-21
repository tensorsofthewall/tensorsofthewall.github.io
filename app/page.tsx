import Home from "../pages/home";
import NavLayout from "../app/components/navlayout";
import Footer from '../app/components/footer';

const Page = () => {
  return(
    <main>
    <div>
      <NavLayout>
        <Home />
      </NavLayout>
    </div>
    <Footer />
    </main>
  )
}

export default Page;
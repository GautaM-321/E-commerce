import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "../Components/navabar";

describe("ComponentName", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
  });
  it("whole navbar is rendered", () => {
    const fullnav = screen.getByTestId("navbarr");
    expect(fullnav).toBeInTheDocument();
  });

  test("search input field is rendered", () => {
    const searchbarnav = screen.getByTestId("search-field");
    expect(searchbarnav).toBeInTheDocument();
  });

  test("navigate to product page only", async () => {
    const productlink = screen.getByTestId("productlink");
    await fireEvent.click(productlink);

    expect(window.location.pathname).toBe("/products");
  });
  test("navigate to home page", async () => {
    const homelink = screen.getByTestId("homelink");
    await fireEvent.click(homelink);

    expect(window.location.pathname).toBe("/");
  });
  test("hovering over the user displays the div", () => {
    localStorage.setItem(
      "curruser",
      JSON.stringify({ name: "Gautam", email: "gautam12@gmail.com" })
    );
    expect(localStorage.getItem("curruser")).toEqual(
      '{"name":"Gautam","email":"gautam12@gmail.com"}'
    );
    const span = screen.getByTestId("user-div");
    fireEvent.mouseOver(span);
    const hoveredDiv = screen.getByTestId("hover-div");
    expect(hoveredDiv).toBeInTheDocument();
  });

  test("navigate to cart page", async () => {
    const cartlink = screen.getByTestId("cartlink");
    await fireEvent.click(cartlink);
    expect(window.location.pathname).toBe("/cart");
  });

  // test("navigate to wishlist page from hover div",async()=>{
  //   const wishlink=screen.getByTestId('hover-wishlist');
  //     await fireEvent.click(wishlink);
  //    expect(window.location.pathname).toBe('/wishlist')

  // })

  test("navigate to wish page", async () => {
    const wishlink = screen.getByTestId("wishlink");
    await fireEvent.click(wishlink);
    expect(window.location.pathname).toBe("/wishlist");
  });

  test("hover div when no user", async () => {
    const nouserdiv = screen.getByTestId("nouserhover");
    expect(nouserdiv).toBeInTheDocument();
  });
  test("hover div- login button when no user", async () => {
    const nouserbutton = screen.getByTestId("nouserhover1");
    expect(nouserbutton).toBeInTheDocument();
  });

  test("navigate to login page from hover div", async () => {
    const loginbutton = screen.getByTestId("nouserhover1");
    await fireEvent.click(loginbutton);
    expect(window.location.pathname).toBe("/login");
  });
});

import { render,screen,fireEvent,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Add_cart from "../view/cart";

describe('ComponentName', () => {
   beforeEach(()=>{
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
        <Provider store={store}>
        <BrowserRouter>
        <Add_cart/>
        </BrowserRouter>    
        </Provider>
    )
   })
   test("renders  logout cart page",()=>{
    const nouserdiv=screen.getByTestId("nousercart");
    expect(nouserdiv).toBeInTheDocument();
   })
    
  

  });

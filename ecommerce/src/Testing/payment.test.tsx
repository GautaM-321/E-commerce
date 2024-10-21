import { render,screen,fireEvent,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Paymentpage from "../view/orderpage";

describe('ComponentName', () => {
   beforeEach(()=>{
    render(
        <Provider store={store}>
        <BrowserRouter>
        <Paymentpage/>
        </BrowserRouter>    
        </Provider>
    )
   })
 
   
   test("renders continue shopping button",()=>{
    const shoppingbtn=screen.getByTestId("shoppingbtn");
    expect(shoppingbtn).toBeInTheDocument();
   })

   test("renders transaction gif",()=>{
    const shoppinggif=screen.getByTestId("paygif");
    expect(shoppinggif).toBeInTheDocument();
   })

   test("navigate to product page from payment page",async()=>{
    const shoppingbutton=screen.getByTestId('shoppingbtn');
      await fireEvent.click(shoppingbutton);
  
    expect(window.location.pathname).toBe('/products')
      
  })
  
    
  

  });
